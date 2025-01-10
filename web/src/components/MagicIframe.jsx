'use client'

import React, { useEffect, useRef, useState } from 'react';

// Example: a component that lazy loads an iframe and supports fullscreen
export default function IframeEmbed({ src }) {
  const iframeContainerRef = useRef(null);
  const [loadIframe, setLoadIframe] = useState(false);

  useEffect(() => {
    if (!iframeContainerRef.current) return;

    // Lazy load using Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(iframeContainerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={iframeContainerRef} style={{ minHeight: '300px' }}>
      {loadIframe ? (
        <iframe
          src={src}
          frameBorder="0"
          allow="fullscreen"
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          style={{ width: '100%', height: '100vh' }}
          loading="lazy"
        />
      ) : (
        <div style={{ padding: '1rem', textAlign: 'center' }}>Loading iframe...</div>
      )}
    </div>
  );
}
