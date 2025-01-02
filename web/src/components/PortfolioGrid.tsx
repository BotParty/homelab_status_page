'use client'

import { useEffect, useState } from 'react'
import * as d3 from 'd3'
import Link from 'next/link'

interface FileItem {
  title: string;
  size: string;
  source: string;
}
const completed = 10

const files: FileItem[] = []
const processedFiles: FileItem[] = [];

for (let i = 1; i < 102; i++) {
  processedFiles.push({
    title: ``,
    size: '',
    source: `/vis/${i}.png`,
  });
}

export default function PortfolioGrid() {
  return (
    <div className="p-8 bg-[#1e2231]">
      <h2 className="text-2xl font-semibold mb-6 text-[#8b98e8]">Visualization Demos</h2>
      <ul role="list" className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {processedFiles.map((file, index) => (
          <Link href={ completed > index ? `/demos/${index}` : `/demos/${index}`} key={index}>
            <li className="relative group">
              <div className="aspect-[10/7] overflow-hidden rounded-lg bg-gray-800">
                <img
                  alt=""
                  src={file.source}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-[#8b98e8] truncate">{file.title}</p>
              {file.size && (
                <p className="text-sm text-gray-400">{file.size}</p>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
