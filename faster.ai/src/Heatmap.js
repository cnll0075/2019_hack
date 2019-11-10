import React from 'react';
import DeckGL from '@deck.gl/react';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import heatData from './data/crime.json'
// Set your mapbox token here
const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line
const DATA_URL =
  'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json'; // eslint-disable-line

const INITIAL_VIEW_STATE = {
    latitude: 49.254,
    longitude: -123.13,
    zoom: 11,
    maxZoom: 16,
    pitch: 45,
    bearing: 0
};

function App() {
  const _renderLayers = () => {
    const data = heatData, intensity = 1, threshold = 0.03, radiusPixels = 30

    return [
      new HeatmapLayer({
        data,
        id: 'heatmp-layer',
        opacity: 1,
        pickable: false,
        getPosition: d => {
            // console.log(d);
            return [d[0], d[1]]
        },
        getWeight: d => d[2],
        radiusPixels,
        intensity,
        threshold
      })
    ];
  }

    return (
      <div>
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={_renderLayers()}
        >
        </DeckGL>
      </div>
    );
  
}

export default App;