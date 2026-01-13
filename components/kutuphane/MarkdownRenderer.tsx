import React from "react";
import ReactMarkdown from "react-markdown";
import {
  CalloutBox,
  ComparisonBlock,
  StepList,
  InfoCard,
  TipBox,
  WarningBox,
  ContentTable,
  QuoteBlock,
  Checklist,
  ExerciseBox,
  SummaryBox,
} from "./ContentComponents";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Parse special blocks and convert to React components
  const parseContent = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    // Regex patterns for special blocks
    const patterns = [
      {
        regex: /\[CALLOUT\](.*?)\[\/CALLOUT\]/gs,
        component: (match: string, content: string) => (
          <CalloutBox key={`callout-${lastIndex}`}>
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-0">{children}</p>,
                strong: ({ children }) => <strong>{children}</strong>,
              }}
            >
              {content.trim()}
            </ReactMarkdown>
          </CalloutBox>
        ),
      },
      {
        regex: /\[COMPARISON\](.*?)\[\/COMPARISON\]/gs,
        component: (match: string, content: string) => {
          const lines = content.trim().split("\n").filter((l) => l.trim());
          let bad = "";
          let good = "";
          
          lines.forEach((line) => {
            if (line.includes("Kötü") || line.includes("Hata:")) {
              bad = line.replace(/^(Kötü|Hata):\s*/, "").trim();
            } else if (line.includes("İyi") || line.includes("Doğrusu:")) {
              good = line.replace(/^(İyi|Doğrusu):\s*/, "").trim();
            }
          });

          if (bad && good) {
            return (
              <ComparisonBlock
                key={`comparison-${lastIndex}`}
                bad={<span>{bad}</span>}
                good={<span>{good}</span>}
              />
            );
          }
          return null;
        },
      },
      {
        regex: /\[TIP\](.*?)\[\/TIP\]/gs,
        component: (match: string, content: string) => (
          <TipBox key={`tip-${lastIndex}`}>
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside space-y-1">{children}</ul>,
                li: ({ children }) => <li>{children}</li>,
                strong: ({ children }) => <strong>{children}</strong>,
              }}
            >
              {content.trim()}
            </ReactMarkdown>
          </TipBox>
        ),
      },
      {
        regex: /\[WARNING\](.*?)\[\/WARNING\]/gs,
        component: (match: string, content: string) => (
          <WarningBox key={`warning-${lastIndex}`}>
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-0">{children}</p>,
              }}
            >
              {content.trim()}
            </ReactMarkdown>
          </WarningBox>
        ),
      },
      {
        regex: /\[INFO\](.*?)\[\/INFO\]/gs,
        component: (match: string, content: string) => {
          const lines = content.trim().split("\n").filter((l) => l.trim());
          const number = lines[0] || "";
          const label = lines.slice(1).join(" ").trim();
          return (
            <InfoCard
              key={`info-${lastIndex}`}
              number={number}
              label={label}
            />
          );
        },
      },
      {
        regex: /\[QUOTE\](.*?)\[\/QUOTE\]/gs,
        component: (match: string, content: string) => (
          <QuoteBlock key={`quote-${lastIndex}`}>
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-0">{children}</p>,
              }}
            >
              {content.trim()}
            </ReactMarkdown>
          </QuoteBlock>
        ),
      },
      {
        regex: /\[EXERCISE\](.*?)\[\/EXERCISE\]/gs,
        component: (match: string, content: string) => {
          const titleMatch = content.match(/##\s*(.+)/);
          const title = titleMatch ? titleMatch[1] : "Şimdi Sen Dene";
          const durationMatch = content.match(/\*\*(\d+\s*dakika)\*\*/);
          const duration = durationMatch ? durationMatch[1] : undefined;
          const body = content.replace(/##\s*.+/, "").trim();
          return (
            <ExerciseBox key={`exercise-${lastIndex}`} title={title} duration={duration}>
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-3">{children}</p>,
                  strong: ({ children }) => <strong className="text-white">{children}</strong>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-2">{children}</ul>,
                  li: ({ children }) => <li>{children}</li>,
                }}
              >
                {body}
              </ReactMarkdown>
            </ExerciseBox>
          );
        },
      },
      {
        regex: /\[SUMMARY\](.*?)\[\/SUMMARY\]/gs,
        component: (match: string, content: string) => {
          const lines = content.split("\n").filter((l) => l.trim() && !l.startsWith("##"));
          return (
            <SummaryBox key={`summary-${lastIndex}`}>
              <ul className="list-disc list-inside space-y-2">
                {lines.map((line, idx) => (
                  <li key={idx}>{line.replace(/^-\s*/, "").trim()}</li>
                ))}
              </ul>
            </SummaryBox>
          );
        },
      },
      {
        regex: /\[CHECKLIST\](.*?)\[\/CHECKLIST\]/gs,
        component: (match: string, content: string) => {
          const doItems: string[] = [];
          const dontItems: string[] = [];
          const lines = content.trim().split("\n");
          let currentList: string[] | null = null;

          lines.forEach((line) => {
            if (line.includes("Yap:")) {
              currentList = doItems;
            } else if (line.includes("Yapma:")) {
              currentList = dontItems;
            } else if (line.trim() && currentList) {
              const item = line.replace(/^[-*]\s*/, "").trim();
              if (item) currentList.push(item);
            }
          });

          return (
            <Checklist
              key={`checklist-${lastIndex}`}
              doItems={doItems}
              dontItems={dontItems}
            />
          );
        },
      },
      {
        regex: /\[STEPS\](.*?)\[\/STEPS\]/gs,
        component: (match: string, content: string) => {
          const steps: Array<{ number: number; title: string; content: string }> = [];
          const lines = content.trim().split("\n");
          let currentStep: any = null;

          lines.forEach((line) => {
            const stepMatch = line.match(/^(\d+)\.\s*(.+)/);
            if (stepMatch) {
              if (currentStep) steps.push(currentStep);
              currentStep = {
                number: parseInt(stepMatch[1]),
                title: stepMatch[2],
                content: "",
              };
            } else if (currentStep && line.trim()) {
              currentStep.content += line.trim() + "\n";
            }
          });
          if (currentStep) steps.push(currentStep);

          return (
            <StepList
              key={`steps-${lastIndex}`}
              steps={steps.map((step) => ({
                ...step,
                content: (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-2">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc list-inside space-y-1">{children}</ul>,
                      li: ({ children }) => <li>{children}</li>,
                    }}
                  >
                    {step.content}
                  </ReactMarkdown>
                ),
              }))}
            />
          );
        },
      },
      {
        regex: /\[TABLE\](.*?)\[\/TABLE\]/gs,
        component: (match: string, content: string) => {
          const lines = content.trim().split("\n").filter((l) => l.trim());
          const headers = lines[0]
            .split("|")
            .map((h) => h.trim())
            .filter((h) => h);
          const rows = lines.slice(2).map((line) =>
            line
              .split("|")
              .map((c) => c.trim())
              .filter((c) => c)
          );
          return (
            <ContentTable
              key={`table-${lastIndex}`}
              headers={headers}
              rows={rows}
            />
          );
        },
      },
    ];

    // Find all matches
    const matches: Array<{
      index: number;
      length: number;
      component: React.ReactNode;
    }> = [];

    patterns.forEach((pattern) => {
      let match;
      const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
      while ((match = regex.exec(text)) !== null) {
        const component = pattern.component(match[0], match[1]);
        if (component) {
          matches.push({
            index: match.index,
            length: match[0].length,
            component,
          });
        }
      }
    });

    // Sort matches by index
    matches.sort((a, b) => a.index - b.index);

    // Build result array
    matches.forEach((match) => {
      // Add text before match
      if (match.index > lastIndex) {
        const textBefore = text.substring(lastIndex, match.index);
        if (textBefore.trim()) {
          parts.push(
            <ReactMarkdown
              key={`text-${lastIndex}`}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-8">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2
                    className="text-3xl md:text-4xl font-bold text-white mb-4 mt-8"
                    id={String(children).toLowerCase().replace(/\s+/g, "-")}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 mt-6">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-2 mt-4">{children}</h4>
                ),
                p: ({ children }) => (
                  <p className="text-gray-300 mb-6 leading-relaxed text-base md:text-lg">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-6 text-gray-300 space-y-2 ml-4">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-6 text-gray-300 space-y-2 ml-4">{children}</ol>
                ),
                li: ({ children }) => <li className="ml-2">{children}</li>,
                strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                em: ({ children }) => <em className="text-gray-400">{children}</em>,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-[#DEFF37] hover:underline"
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {children}
                  </a>
                ),
                hr: () => <hr className="my-8 border-zinc-800" />,
              }}
            >
              {textBefore}
            </ReactMarkdown>
          );
        }
      }

      // Add component
      parts.push(match.component);
      lastIndex = match.index + match.length;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      if (remainingText.trim()) {
        parts.push(
          <ReactMarkdown
            key={`text-final`}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-8">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2
                  className="text-3xl md:text-4xl font-bold text-white mb-4 mt-8"
                  id={String(children).toLowerCase().replace(/\s+/g, "-")}
                >
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 mt-6">{children}</h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-xl md:text-2xl font-bold text-white mb-2 mt-4">{children}</h4>
              ),
              p: ({ children }) => (
                <p className="text-gray-300 mb-6 leading-relaxed text-base md:text-lg">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-6 text-gray-300 space-y-2 ml-4">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-6 text-gray-300 space-y-2 ml-4">{children}</ol>
              ),
              li: ({ children }) => <li className="ml-2">{children}</li>,
              strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
              em: ({ children }) => <em className="text-gray-400">{children}</em>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-[#DEFF37] hover:underline"
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {children}
                </a>
              ),
              hr: () => <hr className="my-8 border-zinc-800" />,
            }}
          >
            {remainingText}
          </ReactMarkdown>
        );
      }
    }

    return parts.length > 0 ? parts : [<div key="empty">No content</div>];
  };

  return <div className="markdown-content">{parseContent(content)}</div>;
}
