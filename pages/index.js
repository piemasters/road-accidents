import React from "react";
import styles from "../styles/Home.module.css";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { LightingEffect, PointLight } from "@deck.gl/core";
import * as d3 from "d3";

const INITIAL_VIEW_STATE = {
  longitude: -1.4157,
  latitude: 52.2324,
  zoom: 7,
  pitch: 42,
  bearing: 0,
};

const DATA_URL =
  "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv";

const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2,
};

const COLOR_RANGE = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];

export default function Home({ MAPBOX_ACCESS_TOKEN }) {
  const light1 = new PointLight({
    color: [255, 255, 255],
    intensity: 1,
    position: [0, 0, 200],
  });
  const light2 = new PointLight({
    color: [255, 255, 255],
    intensity: 1,
    position: [0, 0, 200],
  });

  const lightingEffect = new LightingEffect({
    light1,
    light2,
  });

  const hexLayer = new HexagonLayer({
    id: "heatmap",
    data: d3.csv(DATA_URL),
    radius: 500,
    coverage: 1,
    upperPercentile: 100,
    colorRange: COLOR_RANGE,
    elevationRange: [0, 1000],
    elevationScale: 220,
    extruded: true,
    getPosition: (d) => [Number(d.lng), Number(d.lat)],
    opacity: 1,
  });

  const layers = [hexLayer];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      glOptions={{ stencil: true }}
      effects={[lightingEffect]}
    >
      <StaticMap
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v9"
      />
    </DeckGL>
  );
}

export async function getStaticProps() {
  const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

  return { props: { MAPBOX_ACCESS_TOKEN }, revalidate: 30 };
}
