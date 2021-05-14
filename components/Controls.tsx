import React, { useState } from "react";
import { motion } from "framer-motion";
import { COLOR_RANGE } from "../data/colors";

const Controls = ({
  radius,
  handleRadiusChange,
  opacity,
  handleOpacityChange,
  upperPercentile,
  handleUpperPercentileChange,
  accidentsTotal,
}) => {
  const [showRadius, setShowRadius] = useState(false);
  const [showOpacity, setShowOpacity] = useState(false);
  const [showPercentile, setShowPercentile] = useState(false);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.8, transition: { duration: 2 } },
  };

  return (
    <motion.div
      className="hidden absolute top-0 right-0 z-10 p-2 w-64 bg-white lg:top-12 lg:w-96 lg:p-4 md:block"
      initial="hidden"
      animate="visible"
      variants={variants}
      whileHover={{ opacity: 1 }}
    >
      <h1 className="mb-4 font-medium text-md lg:text-xl">
        Great Britain Road Accidents
      </h1>
      <p className="mb-2 text-sm font-light lg:text-md">
        Personal injury road accidents in GB from 1979
      </p>
      <p className="mb-4 text-sm font-light lg:text-md">
        The layer aggregates data within the boundary of each hexagon cell
      </p>

      <div>
        <div className="flex w-full h-3">
          {COLOR_RANGE.map((color: number[], index: number) => {
            return (
              <div
                className="flex-1"
                style={{
                  backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`,
                }}
                key={index}
              />
            );
          })}
        </div>
        <div className="flex">
          <div className="flex-1 mt-1 text-xs font-bold lg:text-sm">
            Fewer Accidents
          </div>
          <div className="flex-1 mt-1 text-xs font-bold text-right lg:text-sm">
            More Accidents
          </div>
        </div>
      </div>

      <p className="mt-4">
        <span className="text-sm">Data Source: </span>
        <a
          href="https://data.gov.uk/"
          target="_blank"
          className="text-sm text-blue-400 hover:text-blue-600 lg:text-md"
        >
          DATA.GOV.UK
        </a>
      </p>

      <div className="mt-2 lg:mt-4">
        <div className="text-xl font-medium lg:text-4xl">
          {Math.round(accidentsTotal / 100) / 10}K
          <span className="ml-2 text-sm font-bold">accidents</span>
        </div>
      </div>

      <div className="mt-2 lg:mt-6">
        <label className="flex relative align-middle">
          {showRadius && (
            <div className="absolute bottom-6 left-10 p-1 w-12 text-sm font-light text-center text-gray-50 bg-gray-900">
              {radius}
            </div>
          )}
          <input
            id="radius"
            type="range"
            min="400"
            max="10000"
            step="200"
            value={radius}
            onChange={handleRadiusChange}
            onPointerEnter={() => setShowRadius(true)}
            onPointerLeave={() => setShowRadius(false)}
          />
          <div className="inline-block ml-2 text-xs font-medium text-gray-800 lg:text-md">
            Radius
          </div>
        </label>
      </div>
      <div className="mt-2 lg:mt-4">
        <label className="flex relative align-middle">
          {showOpacity && (
            <div className="absolute bottom-6 left-10 p-1 w-12 text-sm font-light text-center text-gray-50 bg-gray-900">
              {opacity}
            </div>
          )}
          <input
            id="coverage"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={opacity}
            onChange={handleOpacityChange}
            onPointerEnter={() => setShowOpacity(true)}
            onPointerLeave={() => setShowOpacity(false)}
          />
          <div className="inline-block ml-2 text-xs font-medium text-gray-800 lg:text-md">
            Opacity
          </div>
        </label>
      </div>
      <div className="mt-2 lg:mt-4">
        <label className="flex relative align-middle">
          {showPercentile && (
            <div className="absolute bottom-6 left-10 p-1 w-12 text-sm font-light text-center text-gray-50 bg-gray-900">
              {upperPercentile}
            </div>
          )}
          <input
            id="upper-pecentile"
            type="range"
            min="90"
            max="100"
            step="1"
            value={upperPercentile}
            onChange={handleUpperPercentileChange}
            onPointerEnter={() => setShowPercentile(true)}
            onPointerLeave={() => setShowPercentile(false)}
          />{" "}
          <div className="inline-block ml-2 text-xs font-medium text-gray-800 lg:text-md">
            Upper Percentile
          </div>
        </label>
      </div>
    </motion.div>
  );
};

export default Controls;
