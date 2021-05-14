import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import loadCSV from "../util/LoadCSV";
import Head from "next/head";
import Map from "../components/Map";
import Controls from "../components/Controls";

export default function Home({ MAPBOX_ACCESS_TOKEN, data }) {
  const [radius, setRadius] = useState(1000);
  const [opacity, setOpacity] = useState(1);
  const [upperPercentile, setUpperPercentile] = useState(100);

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
      <div className="overflow-hidden relative h-screen max-h-screen">
        <Controls
          radius={radius}
          handleRadiusChange={handleRadiusChange}
          opacity={opacity}
          handleOpacityChange={handleOpacityChange}
          upperPercentile={upperPercentile}
          handleUpperPercentileChange={handleUpperPercentileChange}
          accidentsTotal={data.length}
        />
        <Map
          data={data}
          opacity={opacity}
          radius={radius}
          MAPBOX_ACCESS_TOKEN={MAPBOX_ACCESS_TOKEN}
          upperPercentile={upperPercentile}
        />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
  const data = await loadCSV("traffic-accident-heatmap.csv");
  return { props: { MAPBOX_ACCESS_TOKEN, data } };
}
