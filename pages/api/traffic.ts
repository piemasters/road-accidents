const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

export default async (req, res) => {
  const results = [];

  fs.createReadStream(path.resolve("./public", "traffic-accident-heatmap.csv"))
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.status(200).json(JSON.stringify(results));
    });
};
