import "tailwindcss/tailwind.css";
import { StaticMap } from "react-map-gl";
import React from "react";
import { LightingEffect, PointLight, AmbientLight } from "@deck.gl/core";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import DeckGL from "@deck.gl/react";
import { COLOR_RANGE } from "../data/colors";

const INITIAL_VIEW_STATE = {
  longitude: -1.4157,
  latitude: 52.2324,
  zoom: 7,
  pitch: 42,
  bearing: 0,
};

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000],
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000],
});

const material = {
  ambient: 0.9,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51],
};

function getTooltip({ object }) {
  if (!object) {
    return null;
  }
  const lat = object.position[1];
  const lng = object.position[0];
  const count = object.points.length;

  return `\
    latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ""}
    longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ""}
    ${count} Accidents`;
}

const Map = ({
  data = [],
  opacity,
  radius,
  MAPBOX_ACCESS_TOKEN,
  upperPercentile,
}) => {
  const lightingEffect = new LightingEffect({
    ambientLight,
    pointLight1,
    pointLight2,
  });

  const hexLayer = new HexagonLayer({
    id: "heatmap",
    data: data,
    radius: radius,
    coverage: 0.7,
    upperPercentile: upperPercentile,
    colorRange: COLOR_RANGE,
    elevationRange: [0, 1000],
    elevationScale: 220,
    extruded: true,
    getPosition: (d) => [Number(d.lng), Number(d.lat)],
    opacity: opacity,
    material,
    pickable: true,
    transitions: {
      elevationScale: 3000,
    },
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={[hexLayer]}
      glOptions={{ stencil: true }}
      effects={[lightingEffect]}
      getTooltip={getTooltip}
    >
      <StaticMap
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        preventStyleDiffing={true}
      />
    </DeckGL>
  );
};

export default Map;
