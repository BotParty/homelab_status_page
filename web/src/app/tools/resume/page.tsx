import React from "react";

export default function Resume() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 bg-white text-gray-800 font-sans">
      {/* Header / Name / Contact */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
            Adnan Wahab
          </h1>
          {/* Optional: Add a short tagline or role summary */}
          <p className="text-sm text-gray-600 mt-1">
            Perception Tools & Graphics Engineer 
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end text-sm text-gray-700 space-y-1">
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-gray-600">Portfolio:</span>
            <a
              href="https://adnanwahab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              adnanwahab.com
            </a>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-gray-600">Email:</span>
            <a
              href="mailto:adnan.f.wahab@gmail.com"
              className="text-blue-600 hover:underline"
            >
              adnan.f.wahab@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-gray-600">Phone:</span>
            <span>713-677-3669</span>
          </div>
        </div>
      </header>

      {/* Professional Summary (Optional but recommended) */}
      {/* <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Summary</h2>
        <p className="text-sm leading-relaxed text-gray-700">
          Seasoned Software Engineer with expertise in large-scale data pipelines,
          computer vision, and 3D graphics. Passionate about building cutting-edge
          annotation tools, improving labeling throughput, and delivering robust
          user experiences at scale.
        </p>
      </section> */}

      {/* Professional Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
          Professional Experience
        </h2>

        {/* Zoox */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-semibold text-gray-800">
                Perception Tools Engineer | Zoox
              </h3>
              <p className="text-xs text-gray-500">Feb 2021 - Present</p>
            </div>
            <img
              src="/logos/zoox.jpeg"
              alt="Zoox logo"
              className="h-6 w-auto object-contain"
            />
          </div>
          <ul className="list-disc list-outside ml-5 mt-2 text-sm text-gray-700 space-y-1">
            <li>Lead development of 3D annotation tools for AV computer vision</li>
            <li>Optimized data pipelines at 50PB scale, improving labeling throughput</li>
            <li>Utilize Tailwind, TypeScript, React, Three.js for interactive tooling</li>
            <li>
              Awarded a patent for object annotation and attribute labeling in computer
              vision systems for autonomous vehicles
            </li>
          </ul>
        </div>

        {/* American Express */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-semibold text-gray-800">
                Senior Software Engineer | American Express
              </h3>
              <p className="text-xs text-gray-500">Feb 2017 - Feb 2019</p>
            </div>
            <img
              src="/logos/amex.jpeg"
              alt="American Express logo"
              className="h-6 w-auto object-contain"
            />
          </div>
          <ul className="list-disc list-outside ml-5 mt-2 text-sm text-gray-700 space-y-1">
            <li>Developed ML systems for personalized card pages</li>
            <li>Implemented A/B testing and analytics, increasing revenue by $400M/year</li>
            <li>Enhanced design systems for consistent user experience</li>
          </ul>
        </div>

        {/* Samasource */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-semibold text-gray-800">
                Graphics Engineer | Samasource
              </h3>
              <p className="text-xs text-gray-500">Mar 2015 - Oct 2017</p>
            </div>
            <img
              src="/logos/samasource.jpeg"
              alt="Samasource logo"
              className="h-6 w-auto object-contain"
            />
          </div>
          <ul className="list-disc list-outside ml-5 mt-2 text-sm text-gray-700 space-y-1">
            <li>Built first LiDAR annotation tools for point clouds (WebGL, Three.js)</li>
            <li>Implemented large-scale labeling pipelines (Node.js, C++, Go)</li>
            <li>
              Awarded first Innovation Award for Empowerment of Women by H. Clinton
            </li>
          </ul>
        </div>

        {/* Sony */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-semibold text-gray-800">
                Software Engineer | Sony PlayStation
              </h3>
              <p className="text-xs text-gray-500">Feb 2013 - Jul 2014</p>
            </div>
            <img
              src="/logos/sony.jpeg"
              alt="Sony logo"
              className="h-6 w-auto object-contain"
            />
          </div>
          <ul className="list-disc list-outside ml-5 mt-2 text-sm text-gray-700 space-y-1">
            <li>Contributed to PlayStation Now video game streaming services with ember.js and java</li>
            <li>Built PlayStation Store with over 100 million customers</li>
          </ul>
        </div>

        {/* Square */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-md font-semibold text-gray-800">
                Software Engineer | Square
              </h3>
              <p className="text-xs text-gray-500">Feb 2012 - Jul 2013</p>
            </div>
            <img
              src="/logos/square.jpeg"
              alt="Square logo"
              className="h-6 w-auto object-contain"
            />
          </div>
          <ul className="list-disc list-outside ml-5 mt-2 text-sm text-gray-700 space-y-1">
            <li>Created responsive web apps for 2M+ small business owners</li>
            <li>Supported BookFresh acquisition to expand Square's calendar services</li>
          </ul>
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
          Education
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-md font-semibold text-gray-800">
            Bachelor of Science in Computer Science
          </p>
          <p className="text-sm text-gray-500">Texas A&M University</p>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
          Technical Skills
        </h2>
        {/* If you have many skills, consider splitting them into columns */}
        <ul className="text-sm text-gray-700 space-y-2">
          <li>
            <span className="font-semibold">Languages:</span>{" "}
            TypeScript, JavaScript, Python, Golang, C++, Zig
          </li>
          <li>
            <span className="font-semibold">Frontend:</span>{" "}
            React, Three.js, WebGL, WebGPU, tailwindcss
          </li>
          <li>
            <span className="font-semibold">Backend:</span>{" "}
            REST APIs, PostgreSQL, Docker, AWS
          </li>
          <li>
            <span className="font-semibold">Graphics &amp; Vision:</span>{" "}
            3D annotation, Computer Vision systems
          </li>
          <li>
            <span className="font-semibold">Tools:</span>{" "}
            Git, Figma, Testing, CI/CD
          </li>
        </ul>
      </section>
    </div>
  );
}