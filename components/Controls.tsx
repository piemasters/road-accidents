import React from "react";

const Controls = ({
  radius,
  handleRadiusChange,
  opacity,
  handleOpacityChange,
  upperPercentile,
  handleUpperPercentileChange,
}) => {
  return (
    <div className="bg-white opacity-70 absolute top-12 right-0 z-10 hover:opacity-100">
      <div className="m-4 font-bold">Great Britain Road Accidents</div>
      <div className="m-4">
        <label className="flex align-middle">
          <input
            id="radius"
            type="range"
            min="400"
            max="10000"
            step="200"
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
  );
};

export default Controls;
