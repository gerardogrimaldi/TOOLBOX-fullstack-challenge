const filesService = require('../services/filesService');

const getFilesData = async (req, res) => {
  try {
    const { fileName } = req.query;

    const data = await filesService.processFilesData(fileName);
    
    res.json(data);
  } catch (error) {
    console.error('Error in getFilesData controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getFilesList = async (req, res) => {
  try {
    const files = await filesService.getFilesList();
    res.json({ files });
  } catch (error) {
    // Only log errors in non-test environments
    if (!isTestEnvironment) {
      console.error('Error in getFilesList controller:', error);
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getFilesData,
  getFilesList
};