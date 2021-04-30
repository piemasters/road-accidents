import "tailwindcss/tailwind.css";
import { StaticMap } from "react-map-gl";
import React from "react";
import { LightingEffect, PointLight, DirectionalLight } from "@deck.gl/core";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import DeckGL from "@deck.gl/react";

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

const Map = ({
  data,
  opacity,
  radius,
  MAPBOX_ACCESS_TOKEN,
  upperPercentile,
}) => {
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
};

export default Map;
