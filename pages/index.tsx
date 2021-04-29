import React from "react";
import styles from "../styles/Home.module.css";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { LightingEffect, PointLight } from "@deck.gl/core";
import loadCSV from "../util/LoadCSV";

const INITIAL_VIEW_STATE = {
  longitude: -1.4157,
  latitude: 52.2324,
  zoom: 7,
  pitch: 42,
  bearing: 0,
};

const LIGHTS = {
  light0: new PointLight({
    color: [255, 255, 255],
    intensity: 1,
    position: [0, 0, 200],
  }),
  light1: new PointLight({
    color: [255, 255, 255],
    intensity: 1,
    position: [0, 0, 200],
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
  const lightingEffect = new LightingEffect(LIGHTS);

  const hexLayer = new HexagonLayer({
    id: "heatmap",
    data: data,
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

  return (
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
  );
}

export async function getStaticProps() {
  const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

  const data = await loadCSV("traffic-accident-heatmap.csv");

  return { props: { MAPBOX_ACCESS_TOKEN, data } };
}
