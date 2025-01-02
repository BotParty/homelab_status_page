"use client"

// pages/index.js

import { useState } from 'react'

export default function Home() {
  // State to hold slider values
  const [grid, setGrid] = useState({
    columnGutters: 200,
    rowGutters: 60,
    topMargin: 50,
    bottomMargin: 50,
  })

  const [lightbox, setLightbox] = useState({
    deactivateDepth: 50,
    durationVariance: 0,
  })

  const [titleTransition, setTitleTransition] = useState({
    springDamping: 0.75,
    springPeriod: 800,
  })

  const [tagTransition, setTagTransition] = useState({
    springDamping: 0.75,
    springPeriod: 800,
  })

  const handleGridChange = (e) => {
    setGrid({ ...grid, [e.target.name]: Number(e.target.value) })
  }

  const handleLightboxChange = (e) => {
    setLightbox({ ...lightbox, [e.target.name]: Number(e.target.value) })
  }

  const handleTitleChange = (e) => {
    setTitleTransition({ ...titleTransition, [e.target.name]: Number(e.target.value) })
  }

  const handleTagChange = (e) => {
    setTagTransition({ ...tagTransition, [e.target.name]: Number(e.target.value) })
  }

  return (
    <div className="relative min-h-screen flex">
      {/* Background section (for the image or any content behind the panel) */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url("https://via.placeholder.com/600")' }}
      >
        {/* You can swap out with your actual background */}
      </div>

      {/* Side Panel */}
      <div className="relative z-10 w-full sm:w-96 bg-black text-white p-6 space-y-6 overflow-y-auto">
        {/* Close Button at Top */}
        <div className="flex justify-end">
          <button className="text-white text-2xl font-bold">
            &times;
          </button>
        </div>

        {/* GRID Section */}
        <SectionHeader title="GRID" />
        <Slider
          label="Column Gutters"
          name="columnGutters"
          value={grid.columnGutters}
          min={0}
          max={400}
          onChange={handleGridChange}
        />
        <Slider
          label="Row Gutters"
          name="rowGutters"
          value={grid.rowGutters}
          min={0}
          max={200}
          onChange={handleGridChange}
        />
        <Slider
          label="topMargin"
          name="topMargin"
          value={grid.topMargin}
          min={0}
          max={200}
          onChange={handleGridChange}
        />
        <Slider
          label="bottomMargin"
          name="bottomMargin"
          value={grid.bottomMargin}
          min={0}
          max={200}
          onChange={handleGridChange}
        />

        {/* LIGHTBOX Section */}
        <SectionHeader title="LIGHTBOX" />
        <Slider
          label="Deactivate Depth"
          name="deactivateDepth"
          value={lightbox.deactivateDepth}
          min={0}
          max={100}
          onChange={handleLightboxChange}
        />
        <Slider
          label="Duration Variance"
          name="durationVariance"
          value={lightbox.durationVariance}
          min={0}
          max={100}
          onChange={handleLightboxChange}
        />

        {/* TITLE TRANSITION */}
        <SectionHeader title="TITLE TRANSITION" />
        <Slider
          label="Title Spring Damping"
          name="springDamping"
          step={0.05}
          value={titleTransition.springDamping}
          min={0}
          max={1}
          onChange={handleTitleChange}
        />
        <Slider
          label="Title Spring Period"
          name="springPeriod"
          value={titleTransition.springPeriod}
          min={0}
          max={2000}
          onChange={handleTitleChange}
        />

        {/* TAG TRANSITION */}
        <SectionHeader title="TAG TRANSITION" />
        <Slider
          label="Tag Spring Damping"
          name="springDamping"
          step={0.05}
          value={tagTransition.springDamping}
          min={0}
          max={1}
          onChange={handleTagChange}
        />
        <Slider
          label="Tag Spring Period"
          name="springPeriod"
          value={tagTransition.springPeriod}
          min={0}
          max={2000}
          onChange={handleTagChange}
        />

        {/* Footer / Info section */}
        <div className="mt-4 text-sm">
          famo.us is a free and open source Javascript platform for building apps, games and interfaces in DOM, Canvas and WebGL.
        </div>

        {/* Email + JOIN */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Email Address"
            className="flex-1 px-3 py-2 rounded bg-gray-100 text-black focus:outline-none"
          />
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">
            JOIN
          </button>
        </div>
      </div>
    </div>
  )
}

// A simple reusable Section Header component
function SectionHeader({ title }) {
  return (
    <h2 className="text-lg font-bold mt-4 border-b border-gray-700 pb-1 uppercase tracking-wider">
      {title}
    </h2>
  )
}

// A reusable Slider component
function Slider({ label, name, value, min, max, step = 1, onChange }) {
  return (
    <div className="mt-4">
      <label className="text-sm block mb-1 font-semibold">
        {label}: {value.toFixed(2)}
      </label>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full accent-gray-500"
      />
    </div>
  )
}