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
      className="bg-white absolute top-12 right-0 z-10 w-96 p-4 hidden md:block"
      initial="hidden"
      animate="visible"
      variants={variants}
      whileHover={{ opacity: 1 }}
    >
      <h1 className="text-xl font-medium mb-4">Great Britain Road Accidents</h1>
      <p className="text-md font-light mb-2">
        Personal injury road accidents in GB from 1979
      </p>
      <p className="text-md font-light mb-4">
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
          <div className="flex-1 text-sm font-bold mt-1">Fewer Accidents</div>
          <div className="flex-1 text-sm font-bold text-right mt-1">
            More Accidents
          </div>
        </div>
      </div>

      <p className="mt-4">
        <span className="text-sm">Data Source: </span>
        <a
          href="https://data.gov.uk/"
          target="_blank"
          className="text-blue-400 hover:text-blue-600"
        >
          DATA.GOV.UK
        </a>
      </p>

      <div className="mt-4">
        <div className="font-medium text-4xl">
          {Math.round(accidentsTotal / 100) / 10}K
          <span className="text-sm font-bold ml-2">accidents</span>
        </div>
      </div>

      <div className="mt-6">
        <label className="flex align-middle relative">
          {showRadius && (
            <div className="bg-gray-900 text-gray-50 text-sm font-light p-1 absolute bottom-6 left-10 w-12 text-center">
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
            onMouseEnter={() => setShowRadius(true)}
            onMouseLeave={() => setShowRadius(false)}
          />
          <div className="inline-block ml-2 font-medium text-gray-800">
            Radius
          </div>
        </label>
      </div>
      <div className="mt-4">
        <label className="flex align-middle relative">
          {showOpacity && (
            <div className="bg-gray-900 text-gray-50 text-sm font-light p-1 absolute bottom-6 left-10 w-12 text-center">
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
            onMouseEnter={() => setShowOpacity(true)}
            onMouseLeave={() => setShowOpacity(false)}
          />
          <div className="inline-block ml-2 font-medium text-gray-800">
            Opacity
          </div>
        </label>
      </div>
      <div className="mt-4">
        <label className="flex align-middle relative">
          {showPercentile && (
            <div className="bg-gray-900 text-gray-50 text-sm font-light p-1 absolute bottom-6 left-10 w-12 text-center">
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
            onMouseEnter={() => setShowPercentile(true)}
            onMouseLeave={() => setShowPercentile(false)}
          />{" "}
          <div className="inline-block ml-2 font-medium text-gray-800">
            Upper Percentile
          </div>
        </label>
      </div>
    </motion.div>
  );
};

export default Controls;
