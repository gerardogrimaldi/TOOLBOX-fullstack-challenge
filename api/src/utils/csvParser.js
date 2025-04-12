const csvParser = require('csv-parser');
const { Readable } = require('stream');

const parseCSVData = (csvData, fileName) => {
  return new Promise((resolve, reject) => {
    const results = [];
    
    const readableStream = Readable.from([csvData]);
    
    readableStream
      .pipe(csvParser())
      .on('data', (data) => {
        if (
          data.file &&
          data.text !== undefined && 
          data.number !== undefined && 
          !isNaN(Number(data.number)) &&
          data.hex &&
          data.hex.length === 32
        ) {
          results.push({
            text: data.text,
            number: parseInt(data.number, 10),
            hex: data.hex
          });
        }
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

module.exports = {
  parseCSVData
};