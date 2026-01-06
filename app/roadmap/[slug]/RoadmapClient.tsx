"use client";

import { useState } from "react";

interface Resource {
  category: string;
  items: { title: string; url: string }[];
}

interface Topic {
  title: string;
  description?: string;
  resources?: Resource[];
  practice?: {
    title: string;
    tasks: string[];
  };
}

interface Section {
  title: string;
  description: string;
  topics: Topic[];
}

interface Credits {
  name: string;
  role: string;
  company: string;
  photo: string;
  linkedin?: string;
}

interface RoadmapClientProps {
  sections: Section[];
  credits?: Credits[];
}

export default function RoadmapClient({ sections, credits }: RoadmapClientProps) {
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

      {/* Credits Section */}
      {credits && credits.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Section Title */}
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Onaylayan Uzmanlar
            </h2>

            {/* Credits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {credits.map((credit, index) => (
                <div key={index} className="p-6 bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-[#DEFF37]/20 rounded-xl hover:border-[#DEFF37]/40 transition-all duration-300">
                  <div className="flex items-center gap-6">
                    {/* Photo - Left */}
                    <div className="flex-shrink-0">
                      <img
                        src={credit.photo}
                        alt={credit.name}
                        className="w-32 h-32 rounded-xl border-2 border-[#DEFF37]/30 object-cover"
                      />
                    </div>

                    {/* Info - Right */}
                    <div className="flex-1 flex flex-col justify-between h-32">
                      <div>
                        {/* Name with Verified */}
                        <h3 className="text-xl font-bold text-white inline">
                          {credit.name}
                        </h3>
                        <img
                          src="https://r.resimlink.com/d62aV.png"
                          alt="Verified"
                          className="w-5 h-5 inline ml-2 mb-1"
                        />

                        {/* Role & Company */}
                        <p className="text-gray-400 text-sm mt-2">
                          {credit.role} at {credit.company}
                        </p>
                      </div>

                      {/* LinkedIn Button */}
                      {credit.linkedin && (
                        <a
                          href={credit.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white text-sm font-semibold rounded-lg transition-colors duration-300 w-fit"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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

              {/* Content */}
              <div className="space-y-6">
                {/* Description */}
                {selectedTopic.description && (
                  <div className="p-6 bg-zinc-800/50 border border-zinc-700 rounded-xl">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#DEFF37]/10 border border-[#DEFF37]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#DEFF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Konu Hakkında</h3>
                        <p className="text-gray-300 leading-relaxed">
                          {selectedTopic.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Resources */}
                {selectedTopic.resources && selectedTopic.resources.length > 0 && (
                  <div className="p-6 bg-zinc-800/50 border border-zinc-700 rounded-xl">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#DEFF37]/10 border border-[#DEFF37]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#DEFF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-4">Öğrenme Kaynakları</h3>
                        <div className="space-y-5">
                          {selectedTopic.resources.map((resourceGroup, idx) => (
                            <div key={idx}>
                              <h4 className="text-sm font-semibold text-gray-400 mb-2">{resourceGroup.category}</h4>
                              <ul className="space-y-2">
                                {resourceGroup.items.map((item, itemIdx) => (
                                  <li key={itemIdx}>
                                    <a
                                      href={item.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-gray-300 hover:text-[#DEFF37] transition-colors group"
                                    >
                                      <span className="text-[#DEFF37]/50 group-hover:text-[#DEFF37]">→</span>
                                      <span className="text-sm">{item.title}</span>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Practice */}
                {selectedTopic.practice && (
                  <div className="p-6 bg-gradient-to-br from-[#DEFF37]/10 to-[#DEFF37]/5 border border-[#DEFF37]/20 rounded-xl">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#DEFF37]/20 border border-[#DEFF37]/40 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#DEFF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-3">{selectedTopic.practice.title}</h3>
                        <ul className="space-y-2">
                          {selectedTopic.practice.tasks.map((task, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#DEFF37] mt-1 font-bold">•</span>
                              <span className="text-gray-300 text-sm">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fallback if no content */}
                {!selectedTopic.description && !selectedTopic.resources && !selectedTopic.practice && (
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
                )}
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
