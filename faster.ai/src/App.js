import React from 'react';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer, PolygonLayer} from '@deck.gl/layers';
import {LightingEffect, AmbientLight, _SunLight as SunLight} from '@deck.gl/core';
import {scaleThreshold} from 'd3-scale';
import logo from './logo.svg';
import data from './vancouver-blocks.json'
import './App.css';

import headData from './data/crime'

function App() {

  const COLOR_SCALE = scaleThreshold()
  .domain([-0.6, -0.45, -0.3, -0.15, 0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.05, 1.2])
  .range([
    [65, 182, 196],
    [127, 205, 187],
    [199, 233, 180],
    [237, 248, 177],
    // zero
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [189, 0, 38],
    [128, 0, 38]
  ]);

  const _onHover = ({x, y, object}) => {
    this.setState({x, y, hoveredObject: object});
  }

  const _renderLayers = () => {
    const intensity = 1, threshold = 0.03, radiusPixels = 30;
    return [
      // new HeatmapLayer({
      //   headData,
      //   id: 'heatmp-layer',
      //   opacity: 1,
      //   pickable: false,
      //   getPosition: d => {
      //     console.log(d);
      //     return [d.lat, d.lng]},
      //   getWeight: d => d.weight,
      //   radiusPixels,
      //   intensity,
      //   threshold
      // }),
      new GeoJsonLayer({
        id: 'geojson',
        data,
        opacity: 0.8,
        stroked: false,
        filled: true,
        extruded: true,
        wireframe: true,
        getElevation: 70,
        getFillColor: f => COLOR_SCALE(f.properties.growth),
        getLineColor: [255, 255, 255],
        pickable: true,
        onHover: f => console.log('hover')
      })
    ];
  }

  const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0
  });

  const dirLight = new SunLight({
    timestamp: Date.UTC(2019, 7, 1, 22),
    color: [255, 255, 255],
    intensity: 1.0,
    _shadow: true
  });

  const mapStyle = 'mapbox://styles/mapbox/light-v9';
  const lightingEffect = new LightingEffect({ambientLight, dirLight});
  lightingEffect.shadowColor = [0, 0, 0, 0.5];
  const _effects = [lightingEffect];

  const INITIAL_VIEW_STATE = {
    latitude: 49.254,
    longitude: -123.13,
    zoom: 11,
    maxZoom: 16,
    pitch: 45,
    bearing: 0
  };

  return (
    <div className="App">
      <header className="App-header">
      <DeckGL
        layers={_renderLayers()}
        effects={_effects}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
      >
      </DeckGL>
      </header>
    </div>
  );
}

export default App;



