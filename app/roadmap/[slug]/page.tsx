import Link from "next/link";
import { notFound } from "next/navigation";

interface Topic {
  title: string;
  link?: string;
}

interface Section {
  title: string;
  topics: Topic[];
}

interface Roadmap {
  id: string;
  title: string;
  description: string;
  gradient: string;
  sections: Section[];
}

const roadmaps: Record<string, Roadmap> = {
  "ux-designer": {
    id: "ux-designer",
    title: "UX Designer",
    description: "Master user research, wireframing, and user-centered design principles to create meaningful user experiences.",
    gradient: "from-purple-500 to-pink-500",
    sections: [
      {
        title: "Foundations",
        topics: [
          { title: "What is UX Design?", link: "https://www.interaction-design.org/literature/topics/ux-design" },
          { title: "User-Centered Design", link: "https://www.nngroup.com/articles/user-centered-design/" },
          { title: "Design Thinking Process", link: "https://www.interaction-design.org/literature/article/5-stages-in-the-design-thinking-process" },
          { title: "UX vs UI vs Product Design" },
          { title: "The Role of a UX Designer" },
        ],
      },
      {
        title: "Research",
        topics: [
          { title: "User Interviews", link: "https://www.nngroup.com/articles/user-interviews/" },
          { title: "Surveys & Questionnaires" },
          { title: "Usability Testing", link: "https://www.nngroup.com/articles/usability-testing-101/" },
          { title: "A/B Testing" },
          { title: "Card Sorting" },
          { title: "Personas & User Journey Maps" },
          { title: "Competitive Analysis" },
        ],
      },
      {
        title: "Information Architecture",
        topics: [
          { title: "Site Maps & User Flows" },
          { title: "Navigation Design" },
          { title: "Content Strategy" },
          { title: "Taxonomy & Labeling" },
        ],
      },
      {
        title: "Wireframing & Prototyping",
        topics: [
          { title: "Low-Fidelity Wireframes" },
          { title: "High-Fidelity Mockups" },
          { title: "Interactive Prototypes" },
          { title: "Figma Basics", link: "https://www.figma.com/resources/learn-design/" },
          { title: "Sketch / Adobe XD" },
        ],
      },
      {
        title: "Interaction Design",
        topics: [
          { title: "Microinteractions" },
          { title: "Animation Principles" },
          { title: "Gestures & Touch Patterns" },
          { title: "Feedback & Affordances" },
        ],
      },
      {
        title: "Usability & Heuristics",
        topics: [
          { title: "Nielsen's 10 Usability Heuristics", link: "https://www.nngroup.com/articles/ten-usability-heuristics/" },
          { title: "Accessibility (WCAG)", link: "https://www.w3.org/WAI/standards-guidelines/wcag/" },
          { title: "Inclusive Design" },
          { title: "Error Prevention" },
        ],
      },
      {
        title: "Metrics & Validation",
        topics: [
          { title: "UX Metrics (NPS, SUS, CSAT)" },
          { title: "Analytics & Heatmaps" },
          { title: "Iterative Design" },
          { title: "Presenting & Communicating Research" },
        ],
      },
    ],
  },
  "ui-designer": {
    id: "ui-designer",
    title: "UI Designer",
    description: "Learn visual design principles, typography, color theory, and interface aesthetics to create beautiful user interfaces.",
    gradient: "from-blue-500 to-cyan-500",
    sections: [
      {
        title: "Foundations",
        topics: [
          { title: "What is UI Design?" },
          { title: "Visual Hierarchy" },
          { title: "Grid Systems & Layout" },
          { title: "Spacing & Alignment" },
          { title: "The Role of a UI Designer" },
        ],
      },
      {
        title: "Color Theory",
        topics: [
          { title: "Color Psychology" },
          { title: "Color Models (RGB, HSL, CMYK)" },
          { title: "Color Palettes & Schemes" },
          { title: "Contrast & Accessibility", link: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html" },
          { title: "Dark Mode Design" },
        ],
      },
      {
        title: "Typography",
        topics: [
          { title: "Type Anatomy & Classification" },
          { title: "Font Pairing", link: "https://fonts.google.com/" },
          { title: "Hierarchy & Scale" },
          { title: "Line Height & Letter Spacing" },
          { title: "Responsive Typography" },
        ],
      },
      {
        title: "Visual Design",
        topics: [
          { title: "Icons & Iconography" },
          { title: "Imagery & Photography" },
          { title: "Illustrations" },
          { title: "Shadows & Depth" },
          { title: "Borders & Dividers" },
        ],
      },
      {
        title: "Components & Patterns",
        topics: [
          { title: "Buttons & CTAs" },
          { title: "Forms & Input Fields" },
          { title: "Navigation Patterns" },
          { title: "Cards & Lists" },
          { title: "Modals & Overlays" },
          { title: "Tables & Data Display" },
        ],
      },
      {
        title: "Design Tools",
        topics: [
          { title: "Figma Advanced", link: "https://www.figma.com/resources/learn-design/" },
          { title: "Auto Layout & Constraints" },
          { title: "Components & Variants" },
          { title: "Plugins & Workflows" },
        ],
      },
      {
        title: "Handoff & Collaboration",
        topics: [
          { title: "Design Specs & Redlines" },
          { title: "Design Tokens" },
          { title: "Working with Developers" },
          { title: "Version Control for Designers" },
        ],
      },
    ],
  },
  "product-designer": {
    id: "product-designer",
    title: "Product Designer",
    description: "Combine UX research, UI design, and product strategy to create holistic product experiences.",
    gradient: "from-orange-500 to-red-500",
    sections: [
      {
        title: "Product Fundamentals",
        topics: [
          { title: "What is Product Design?" },
          { title: "Product Thinking" },
          { title: "Product Lifecycle" },
          { title: "The Role of a Product Designer" },
        ],
      },
      {
        title: "UX & UI Skills",
        topics: [
          { title: "User Research Methods" },
          { title: "Wireframing & Prototyping" },
          { title: "Visual Design Principles" },
          { title: "Interaction Design" },
        ],
      },
      {
        title: "Product Strategy",
        topics: [
          { title: "Business Goals & KPIs" },
          { title: "Value Propositions" },
          { title: "Competitive Analysis" },
          { title: "Market Research" },
        ],
      },
      {
        title: "User & Problem Discovery",
        topics: [
          { title: "Jobs to be Done (JTBD)", link: "https://jtbd.info/" },
          { title: "Problem Framing" },
          { title: "Opportunity Mapping" },
          { title: "User Needs vs Business Needs" },
        ],
      },
      {
        title: "Collaboration & Communication",
        topics: [
          { title: "Working with Product Managers" },
          { title: "Collaborating with Engineers" },
          { title: "Stakeholder Management" },
          { title: "Design Critiques" },
          { title: "Presenting Your Work" },
        ],
      },
      {
        title: "Metrics & Iteration",
        topics: [
          { title: "Product Analytics" },
          { title: "Feature Adoption" },
          { title: "Conversion Funnels" },
          { title: "Iterative Design & A/B Testing" },
        ],
      },
      {
        title: "Advanced Topics",
        topics: [
          { title: "Growth Design" },
          { title: "Monetization & Pricing UI" },
          { title: "Onboarding Flows" },
          { title: "Empty States & Error Handling" },
        ],
      },
    ],
  },
  "design-system": {
    id: "design-system",
    title: "Design System",
    description: "Build and maintain scalable design systems, component libraries, and design governance.",
    gradient: "from-green-500 to-teal-500",
    sections: [
      {
        title: "Foundations",
        topics: [
          { title: "What is a Design System?" },
          { title: "Design System vs Component Library" },
          { title: "Benefits & Use Cases" },
          { title: "When to Build a Design System" },
        ],
      },
      {
        title: "Design Tokens",
        topics: [
          { title: "What are Design Tokens?", link: "https://designtokens.org/" },
          { title: "Color Tokens" },
          { title: "Typography Tokens" },
          { title: "Spacing & Sizing Tokens" },
          { title: "Token Management" },
        ],
      },
      {
        title: "Component Design",
        topics: [
          { title: "Atomic Design Methodology", link: "https://bradfrost.com/blog/post/atomic-web-design/" },
          { title: "Component API Design" },
          { title: "Variants & States" },
          { title: "Composition Patterns" },
        ],
      },
      {
        title: "Documentation",
        topics: [
          { title: "Component Documentation" },
          { title: "Usage Guidelines" },
          { title: "Do's and Don'ts" },
          { title: "Code Examples" },
          { title: "Storybook", link: "https://storybook.js.org/" },
        ],
      },
      {
        title: "Governance & Contribution",
        topics: [
          { title: "Design System Team Structure" },
          { title: "Contribution Models" },
          { title: "Version Control" },
          { title: "Deprecation Strategy" },
        ],
      },
      {
        title: "Implementation",
        topics: [
          { title: "Design-to-Code Workflow" },
          { title: "Component Libraries (React, Vue, etc.)" },
          { title: "CSS Architecture" },
          { title: "Theming & Customization" },
        ],
      },
      {
        title: "Adoption & Scale",
        topics: [
          { title: "Measuring Adoption" },
          { title: "Training & Onboarding" },
          { title: "Multi-Brand Support" },
          { title: "Accessibility in Design Systems" },
        ],
      },
    ],
  },
  "design-thinking": {
    id: "design-thinking",
    title: "Design Thinking",
    description: "Apply design thinking methodology and frameworks to solve complex problems creatively.",
    gradient: "from-indigo-500 to-purple-500",
    sections: [
      {
        title: "Introduction",
        topics: [
          { title: "What is Design Thinking?", link: "https://www.interaction-design.org/literature/article/what-is-design-thinking-and-why-is-it-so-popular" },
          { title: "History & Origins" },
          { title: "Mindsets of a Design Thinker" },
          { title: "When to Use Design Thinking" },
        ],
      },
      {
        title: "The 5 Stages",
        topics: [
          { title: "1. Empathize", link: "https://www.interaction-design.org/literature/article/stage-1-in-the-design-thinking-process-empathise-with-your-users" },
          { title: "2. Define" },
          { title: "3. Ideate" },
          { title: "4. Prototype" },
          { title: "5. Test" },
        ],
      },
      {
        title: "Empathy & Research",
        topics: [
          { title: "Empathy Mapping" },
          { title: "User Interviews" },
          { title: "Observation & Ethnography" },
          { title: "Stakeholder Interviews" },
        ],
      },
      {
        title: "Problem Definition",
        topics: [
          { title: "Point of View (POV) Statements" },
          { title: "How Might We (HMW) Questions", link: "https://www.designkit.org/methods/how-might-we" },
          { title: "Problem Framing" },
          { title: "Insights Synthesis" },
        ],
      },
      {
        title: "Ideation Techniques",
        topics: [
          { title: "Brainstorming" },
          { title: "Crazy 8's" },
          { title: "SCAMPER" },
          { title: "Mind Mapping" },
          { title: "Worst Possible Idea" },
        ],
      },
      {
        title: "Prototyping",
        topics: [
          { title: "Paper Prototyping" },
          { title: "Digital Prototyping" },
          { title: "Role Playing" },
          { title: "Storyboarding" },
        ],
      },
      {
        title: "Testing & Iteration",
        topics: [
          { title: "Usability Testing" },
          { title: "Feedback Loops" },
          { title: "Iteration Cycles" },
          { title: "Pivoting vs Persevering" },
        ],
      },
      {
        title: "Facilitation",
        topics: [
          { title: "Running Design Sprints", link: "https://www.gv.com/sprint/" },
          { title: "Workshop Facilitation" },
          { title: "Remote Design Thinking" },
          { title: "Stakeholder Buy-in" },
        ],
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(roadmaps).map((slug) => ({
    slug: slug,
  }));
}

export default async function RoadmapPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const roadmap = roadmaps[slug];

  if (!roadmap) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
            DesignAtlas
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
            ← Back to Roadmaps
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br opacity-30" style={{
          backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
        }}></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className={`inline-block px-6 py-3 mb-6 rounded-full bg-gradient-to-r ${roadmap.gradient} text-white font-semibold animate-scale-in`}>
            Roadmap
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 animate-fade-in">
            {roadmap.title}
          </h1>

          <p className="text-xl text-gray-700 animate-slide-up">
            {roadmap.description}
          </p>
        </div>
      </section>

      {/* Roadmap Content */}
      <section className="py-12 px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 rounded-full hidden md:block"></div>

            {/* Sections */}
            <div className="space-y-12">
              {roadmap.sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="relative animate-slide-up"
                  style={{ animationDelay: `${sectionIndex * 0.1}s` }}
                >
                  {/* Section marker */}
                  <div className="absolute left-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg hidden md:flex">
                    <span className="text-white font-bold text-xl">{sectionIndex + 1}</span>
                  </div>

                  {/* Section content */}
                  <div className="md:ml-24">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">
                      {section.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.topics.map((topic, topicIndex) => (
                        <div
                          key={topicIndex}
                          className="group"
                        >
                          {topic.link ? (
                            <a
                              href={topic.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 glass"
                            >
                              <span className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                                {topic.title}
                              </span>
                              <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          ) : (
                            <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm glass">
                              <span className="font-medium text-gray-700">
                                {topic.title}
                              </span>
                              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center p-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to explore more?
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Check out other roadmaps to expand your design knowledge and skills.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              View All Roadmaps
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-gray-400 text-center">
        <p>DesignAtlas BETA &copy; 2024 - Learn Design. Step by Step.</p>
      </footer>
    </main>
  );
}
