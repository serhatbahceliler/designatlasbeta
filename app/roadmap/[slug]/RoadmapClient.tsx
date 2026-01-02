"use client";

import { useState } from "react";

interface Topic {
  title: string;
  description?: string;
  resources?: { title: string; url: string }[];
  keyPoints?: string[];
}

interface Section {
  title: string;
  description: string;
  topics: Topic[];
}

interface RoadmapClientProps {
  sections: Section[];
}

export default function RoadmapClient({ sections }: RoadmapClientProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openTopicDrawer = (topic: Topic) => {
    setSelectedTopic(topic);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedTopic(null), 300);
  };

  return (
    <>
      {/* Roadmap Content */}
      <section className="py-12 px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#DEFF37] via-[#DEFF37]/50 to-transparent rounded-full hidden md:block"></div>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="relative animate-slide-up"
                  style={{ animationDelay: `${sectionIndex * 0.05}s` }}
                >
                  {/* Section marker */}
                  <div className="absolute left-0 w-16 h-16 bg-[#DEFF37] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(222,255,55,0.3)] hidden md:flex">
                    <span className="text-black font-bold text-xl">{sectionIndex + 1}</span>
                  </div>

                  {/* Section content */}
                  <div className="md:ml-24">
                    <h2 className="text-3xl font-bold mb-3 text-white">
                      {section.title}
                    </h2>
                    <p className="text-gray-400 mb-6 text-sm italic">
                      {section.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.topics.map((topic, topicIndex) => (
                        <button
                          key={topicIndex}
                          onClick={() => openTopicDrawer(topic)}
                          className="group flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-[#DEFF37]/50 hover:bg-zinc-900 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm text-left"
                        >
                          <span className="font-medium text-white group-hover:text-[#DEFF37] transition-colors">
                            {topic.title}
                          </span>
                          <svg className="w-5 h-5 text-gray-600 group-hover:text-[#DEFF37] group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Topic Detail Drawer */}
      {isDrawerOpen && selectedTopic && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={closeDrawer}
          ></div>

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-zinc-900 shadow-2xl border-l border-[#DEFF37]/20 overflow-y-auto animate-slide-in-right">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white pr-8">
                  {selectedTopic.title}
                </h2>
                <button
                  onClick={closeDrawer}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors flex-shrink-0"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content - Şimdilik placeholder */}
              <div className="space-y-6">
                <div className="p-6 bg-zinc-800/50 border border-zinc-700 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#DEFF37]/10 border border-[#DEFF37]/30 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#DEFF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">İçerik Yakında</h3>
                  </div>
                  <p className="text-gray-400">
                    Bu konu için detaylı içerik, kaynaklar ve örnekler hazırlanıyor.
                    <br />
                    Beta sürecinde içerikler adım adım eklenecek.
                  </p>
                </div>

                <div className="p-6 bg-zinc-800/30 border border-zinc-700/50 rounded-xl">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Ne Bekleyebilirsin?</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-[#DEFF37] mt-1">•</span>
                      <span>Konunun detaylı açıklaması</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#DEFF37] mt-1">•</span>
                      <span>Öğrenme kaynakları ve linkler</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#DEFF37] mt-1">•</span>
                      <span>Pratik örnekler ve ipuçları</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#DEFF37] mt-1">•</span>
                      <span>İlgili araçlar ve metodlar</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
