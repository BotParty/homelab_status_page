'use client';
import { ArticleLayout } from '../../../_components/ArticleLayout';
import React, { useState } from 'react';
import markdownStyles from "./markdown-styles.module.css";
import TextEditor from '../../../components/texteditor'
import { remark } from "remark";
import html from "remark-html";

const article = {
  title: "Dynamicland is the greatest invention of the century",
  date: "2025-01-03",
  slug: "dynamicland_2025",
}
const children = <div>Hello</div> 

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

const dynamicland_is_great = `
image.png
`

export default function Blog() {
  // 1. Use state to determine whether to show the editor
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div id="__next">
      <div className="min-h-screen">
        {/* Top bar */}
        <div className="border-b bg-accent-1 border-accent-2">
          <div className="container mx-auto px-5">
            {/* optional top bar content */}
          </div>
        </div>

        {/* Main section */}
        <main>
          <div className="container mx-auto px-5">
            {/* Hero section */}
            <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
                Collaborative Thinking and Shared Reasoning
              </h1>
            </section>

            {/* Featured post */}
            <section>
              <div className="mb-8 md:mb-16">
                <div className="sm:mx-0">
                  <a
                    aria-label="Dynamic Routing and Static Generation"
                    href="/posts/dynamic-routing"
                  >
                    <div
                      style={{
                        display: 'block',
                        overflow: 'hidden',
                        position: 'relative',
                        boxSizing: 'border-box',
                        margin: 0,
                      }}
                    >
                      <div
                        style={{
                          display: 'block',
                          boxSizing: 'border-box',
                          paddingTop: '50%',
                        }}
                      ></div>
                      <img
                        alt="Cover Image for Dynamic Routing and Static Generation"
                        src="/cover.webp"
                        decoding="async"
                        className="shadow-sm hover:shadow-md transition-shadow duration-200"
                        style={{
                          visibility: 'visible',
                          position: 'absolute',
                          inset: 0,
                          boxSizing: 'border-box',
                          padding: 0,
                          border: 'none',
                          margin: 'auto',
                          display: 'block',
                          width: 0,
                          height: 0,
                          minWidth: '100%',
                          maxWidth: '100%',
                          minHeight: '100%',
                          maxHeight: '100%',
                        }}
                      />
                    </div>
                  </a>
                </div>
              </div>

              {/* Post info */}
              <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                <div>
                  <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
                    <a className="hover:underline" href="/posts/dynamic-routing">
                      Dynamicland is the greatest invention of the century
                    </a>
                  </h3>
                  <div className="mb-4 md:mb-0 text-lg">
                    <time dateTime="2025-01-03T05:35:07.322Z">January 3, 2025</time>
                  </div>
                </div>
                <div>
                  <p className="text-lg leading-relaxed mb-4">
                    {/* Body */}
                  </p>
                  <div
                    className={markdownStyles["markdown"]}
                    dangerouslySetInnerHTML={{ __html: dynamicland_is_great }}
                  />

                  <div className="flex items-center">
                    <div className="text-xl font-bold">By Adnan Wahab</div>

                    <ArticleLayout article={article} children={children} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-accent-1 border-t border-accent-2">
          <div className="container mx-auto px-5">
            <div className="py-28 flex flex-col lg:flex-row items-center">
              {/* 2. Use onClick to toggle our local "showEditor" state */}
              <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
                <button
                  className="hover:underline"
                  onClick={() => setShowEditor((prev) => !prev)}
                >
                  Click here to edit this blog post
                </button>
              </h3>

              <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
                <a
                  href="https://github.com/adnanwahab/homelab"
                  className="mx-3 font-bold hover:underline"
                >
                  View on GitHub
                </a>
              </div>
            </div>

            {/* 3. Conditionally show the TextEditor only if showEditor is true */}
            {showEditor && (
              <div className="pb-10">
                <TextEditor />
              </div>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
