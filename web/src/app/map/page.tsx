'use client';

import { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { Map } from 'react-map-gl';
import { ScatterplotLayer } from '@deck.gl/layers';

const INITIAL_VIEW_STATE = {
  longitude: -100,
  latitude: 40,
  zoom: 3,
  pitch: 0,
  bearing: 0
};

// You'll need to get a Mapbox token from https://www.mapbox.com/
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXdhaGFiIiwiYSI6ImNrdjc3NW11aTJncmIzMXExcXRiNDNxZWYifQ.tqFU7uVd6mbhHtjYsjtvlg';

export default function MapPage() {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  const layers = [
    new ScatterplotLayer({
      id: 'scatter',
      data: [
        { position: [-122.45, 37.78], color: [255, 0, 0] },
        { position: [-74.00, 40.71], color: [0, 255, 0] }
      ],
      getPosition: d => d.position,
      getFillColor: d => d.color,
      getRadius: 10000,
      pickable: true
    })
  ];

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <DeckGL
        initialViewState={viewState}
        controller={true}
        layers={layers}
        onViewStateChange={({ viewState }) => setViewState(viewState)}
      >
        <Map
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v11"
        />
      </DeckGL>
    </div>
  );
}