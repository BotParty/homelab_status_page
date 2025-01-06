'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function RoboticsOdysseyPage() {
  return (
    <div className="dark">
      <div className="text-gray-950 antialiased bg-slate-900">
        <div className="overflow-hidden items-center min-h-screen">
          <main className="flex flex-col items-center px-8">
            {/* Hero Section */}
            <div className="overflow-hidden bg-dark-blue text-light-blue">
              <div className="mx-auto max-w-2xl lg:max-w-7xl">
                <div className="max-w-4xl">
                  <p className="text-xl font-semibold leading-7 text-teal-100">
                    Robotics Odyssey <span className="text-gray-400 text-xs">Nov 1 - 5000 research papers converted to video games</span>
                  </p>
                  <h1 className="mt-2 text-pretty text-3xl font-semibold tracking-tight text-teal-100 shiny-text">
                    Become a AI+Robotics <span className="rewriting-me">artist</span> for <span>$25</span>
                  </h1>
                  {/* ... rest of content ... */}
                </div>
              </div>
            </div>

            {/* Rest of sections */}
            {/* ... */}

            {/* Footer */}
            <footer aria-labelledby="footer-heading" className="bg-gray-900">
              {/* ... footer content ... */}
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

// Add required styles to your global CSS file or a CSS module
const styles = {
  '.bg-dark-blue': {
    backgroundColor: '#1a1a2e',
  },
  '.text-light-blue': {
    color: '#e0e1dd',
  },
  // ... other styles ...
};
