'use client'
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { VegaLite } from 'react-vega';

export default function HomePage() {
  const [prompt, setPrompt] = useState("Show me a scatterplot of horsepower vs. mpg for cars, colored by origin.");
  const [loading, setLoading] = useState(false);
  const [chartSpec, setChartSpec] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setChartSpec(null);

    try {
      const res = await fetch('/api/generate-viz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!res.ok) {
        throw new Error('Failed to generate visualization');
      }

      const data = await res.json();
      setChartSpec(data.spec);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-semibold mb-4">Visualization Recommendation Demo</h1>
        <p className="text-gray-700 mb-4">
          This demo integrates concepts from two research papers to produce a recommended Vega-Lite visualization based on your prompt.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block font-medium text-gray-700">
              Your Prompt
            </label>
            <textarea
              id="prompt"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Generate Visualization
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-600">
            Error: {error}
          </div>
        )}

        {chartSpec && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Generated Visualization</h2>
            <VegaLite spec={chartSpec} />
          </div>
        )}
      </div>

      {/* Loading Dialog */}
      <Dialog open={loading} onClose={() => {}} className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <div className="bg-white rounded p-6 shadow-xl max-w-sm mx-auto">
          <Dialog.Title className="text-lg font-medium">Generating Visualization</Dialog.Title>
          <p className="mt-2 text-gray-700">Please wait while we process your request...</p>
        </div>
      </Dialog>
    </div>
  );
}
