import React, { useState } from "react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { LightingEffect, PointLight, DirectionalLight } from "@deck.gl/core";
import "tailwindcss/tailwind.css";
import loadCSV from "../util/LoadCSV";
import Head from "next/head";

const INITIAL_VIEW_STATE = {
  longitude: -1.4157,
  latitude: 52.2324,
  zoom: 7,
  pitch: 42,
  bearing: 0,
};

const LIGHTS = {
  light0: new DirectionalLight({
    color: [255, 255, 255],
    intensity: 2,
    position: [0, 0, 1000],
  }),
  light1: new PointLight({
    color: [255, 255, 255],
    intensity: 2,
    position: [0, 0, 1000],
  }),
};

const COLOR_RANGE = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];

export default function Home({ MAPBOX_ACCESS_TOKEN, data }) {
  const [radius, setRadius] = useState(500);
  const [opacity, setOpacity] = useState(1);
  const [upperPercentile, setUpperPercentile] = useState(100);

  const lightingEffect = new LightingEffect(LIGHTS);

  const hexLayer = new HexagonLayer({
    id: "heatmap",
    data: data,
    radius: radius,
    coverage: 1,
    upperPercentile: upperPercentile,
    colorRange: COLOR_RANGE,
    elevationRange: [0, 1000],
    elevationScale: 220,
    extruded: true,
    getPosition: (d) => [Number(d.lng), Number(d.lat)],
    opacity: opacity,
  });

  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
  };
  const handleOpacityChange = (event) => {
    setOpacity(event.target.value);
  };
  const handleUpperPercentileChange = (event) => {
    setUpperPercentile(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Road Accidents</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div className="bg-white opacity-70 absolute top-12 right-0 z-10 hover:opacity-100">
        <div className="m-4">
          <label className="flex align-middle">
            <input
              id="radius"
              type="range"
              min="500"
              max="20000"
              step="1000"
              value={radius}
              onChange={handleRadiusChange}
            />
            <div className="inline-block ml-2 font-medium text-gray-800">
              Radius
            </div>
          </label>
        </div>
        <div className="m-4">
          <label className="flex align-middle">
            <input
              id="coverage"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={opacity}
              onChange={handleOpacityChange}
            />
            <div className="inline-block ml-2 font-medium text-gray-800">
              Opacity
            </div>
          </label>
        </div>
        <div className="m-4">
          <label className="flex align-middle">
            <input
              id="upper-pecentile"
              type="range"
              min="90"
              max="100"
              step="1"
              value={upperPercentile}
              onChange={handleUpperPercentileChange}
            />{" "}
            <div className="inline-block ml-2 font-medium text-gray-800">
              Upper Percentile
            </div>
          </label>
        </div>
      </div>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={[hexLayer]}
        glOptions={{ stencil: true }}
        effects={[lightingEffect]}
      >
        <StaticMap
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v9"
        />
      </DeckGL>
    </>
  );
}

export async function getStaticProps() {
  const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

  const data = await loadCSV("traffic-accident-heatmap.csv");

  return { props: { MAPBOX_ACCESS_TOKEN, data } };
}
