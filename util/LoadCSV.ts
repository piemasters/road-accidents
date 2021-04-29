const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const loadCSV = async (filename) => {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve("./data", filename))
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => reject(error));
  });
};

export default loadCSV;
