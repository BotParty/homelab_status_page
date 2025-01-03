
import markdownStyles from "./markdown-styles.module.css";

import TextEditor from '../../../components/texteditor'
import { remark } from "remark";
import html from "remark-html";

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

const dynamicland_is_great = `
image.png

`


// export default function Dynamicland2025() {
//   return <div><TextEditor />
  

//   <h1>Dynamicland 2025</h1>
//   <div>
//     <p>
//       {dynamicland_is_great}
//     </p>
//   </div>
  
//   </div>
// }


import React from 'react';

export default function Blog() {
  return (
    <div id="__next">
      <div className="min-h-screen">
        {/* Top bar */}
        <div className="border-b bg-accent-1 border-accent-2">
          <div className="container mx-auto px-5">
          {/* <TextEditor /> */}
            {/* <div className="py-2 text-center text-sm">
              The source code for this blog is{' '}
              <a
                href="https://github.com/vercel/next.js/tree/canary/examples/blog-starter"
                className="underline hover:text-success duration-200 transition-colors"
              >
                available on GitHub
              </a>
              .
            </div> */}
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
              {/* <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
                A statically generated blog example using{' '}
                <a
                  href="https://nextjs.org/"
                  className="underline hover:text-success duration-200 transition-colors"
                >
                  Next.js
                </a>{' '}
                and Markdown.
              </h4> */}
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
                    <a
                      className="hover:underline"
                      href="/posts/dynamic-routing"
                    >
                      Dynamicland is the greatest invention of the century
                    </a>
                  </h3>
                  <div className="mb-4 md:mb-0 text-lg">
                    <time dateTime="2025-01-03T05:35:07.322Z">January 3, 2025</time>
                  </div>
                </div>
                <div>
                  <p className="text-lg leading-relaxed mb-4">
                 
                  </p>

               
                  <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: dynamicland_is_great }}
      />


                  <div className="flex items-center">
                    {/* <img
                      src="/assets/blog/authors/jj.jpeg"
                      className="w-12 h-12 rounded-full mr-4"
                      alt="JJ Kasper"
                    /> */}
                    <div className="text-xl font-bold">By Adnan Wahab</div>
                  </div>
                </div>
              </div>
            </section>


          </div>
        </main>

        {/* Footer */}

        
        <footer className="bg-accent-1 border-t border-accent-2">
          <TextEditor />
          <div className="container mx-auto px-5">
            <div className="py-28 flex flex-col lg:flex-row items-center">
              <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
                Click here to edit this blog post
              </h3>
              <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
                {/* <a
                  href="https://nextjs.org/docs/basic-features/pages"
                  className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
                >
                  Read Documentation
                </a> */}
                <a
                  href="https://github.com/adnanwahab/homelab"
                  className="mx-3 font-bold hover:underline"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
