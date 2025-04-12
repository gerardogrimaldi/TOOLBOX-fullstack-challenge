const axios = require('axios');
const { 
  EXTERNAL_API_URL, 
  EXTERNAL_API_HEADERS, 
  FILES_ENDPOINT,
  FILE_ENDPOINT 
} = require('../config/constants');
const { parseCSVData } = require('../utils/csvParser');

const getFilesList = async () => {
  try {
    const response = await axios.get(`${EXTERNAL_API_URL}${FILES_ENDPOINT}`, {
      headers: EXTERNAL_API_HEADERS
    });
    
    return response.data.files || [];
  } catch (error) {
    console.error('Error fetching files list:', error.message);
    return [];
  }
};

const getFileContent = async (fileName) => {
  try {
    const response = await axios.get(`${EXTERNAL_API_URL}${FILE_ENDPOINT}/${fileName}`, {
      headers: EXTERNAL_API_HEADERS,
      responseType: 'text'
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching file ${fileName}:`, error.message);
    return null;
  }
};

const processFilesData = async (fileNameFilter = null) => {
  try {
    const files = await getFilesList();
    
    const filesToProcess = fileNameFilter 
      ? files.filter(file => file === fileNameFilter) 
      : files;

    const filePromises = filesToProcess.map(async (fileName) => {
      const fileContent = await getFileContent(fileName);
      
      if (!fileContent) return null;
      
      try {
        const parsedData = await parseCSVData(fileContent, fileName);
        
        // Only return files with valid lines
        if (parsedData.length > 0) {
          return {
            file: fileName,
            lines: parsedData
          };
        }
        
        return null;
      } catch (parseError) {
        console.error(`Error parsing file ${fileName}:`, parseError.message);
        return null;
      }
    });
    
    const results = await Promise.all(filePromises);
    
    return results.filter(result => result !== null);
  } catch (error) {
    console.error('Error processing files data:', error.message);
    return [];
  }
};

module.exports = {
  getFilesList,
  getFileContent,
  processFilesData
};