const chai = require('chai');
const chaiHttp = require('chai-http');
const spies = require('chai-spies');
const app = require('../src/app');
const filesService = require('../src/services/filesService');

const { expect } = chai;

chai.use(chaiHttp);
chai.use(spies);

describe('Files API', () => {
  const originalConsoleError = console.error;
  
  let sandbox;

  beforeEach(() => {
    sandbox = chai.spy.sandbox();
    
    console.error = () => {};
  });

  afterEach(() => {
    sandbox.restore();
    
    console.error = originalConsoleError;
  });

  describe('GET /files/data', () => {
    it('should return formatted data from files', async () => {
      const mockData = [
        {
          file: 'file1.csv',
          lines: [
            {
              text: 'RgTya',
              number: 64075909,
              hex: '70ad29aacf0b690b0467fe2b2767f765'
            },
            {
              text: 'AtjW',
              number: 6,
              hex: 'd33a8ca5d36d3106219f66f939774cf5'
            }
          ]
        }
      ];

      const processFilesDataSpy = sandbox.on(filesService, 'processFilesData', () => Promise.resolve(mockData));

      const res = await chai.request(app)
        .get('/files/data')
        .set('accept', 'application/json');

      expect(processFilesDataSpy).to.have.been.called();
      expect(res).to.have.status(200);
      expect(res).to.have.header('content-type', /application\/json/);
      expect(res.body).to.be.an('array');
      expect(res.body).to.deep.equal(mockData);
    });

    it('should handle errors and return 500', async () => {
      sandbox.on(filesService, 'processFilesData', () => Promise.reject(new Error('Service error')));

      const res = await chai.request(app)
        .get('/files/data')
        .set('accept', 'application/json');

      expect(res).to.have.status(500);
      expect(res.body).to.have.property('error');
    });

    it('should filter by fileName if provided', async () => {
      const mockData = [
        {
          file: 'file2.csv',
          lines: [
            {
              text: 'Test',
              number: 123,
              hex: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6'
            }
          ]
        }
      ];

      const processFilesSpy = sandbox.on(filesService, 'processFilesData', () => Promise.resolve(mockData));

      const fileName = 'file2.csv';
      await chai.request(app)
        .get(`/files/data?fileName=${fileName}`)
        .set('accept', 'application/json');

      expect(processFilesSpy).to.have.been.called.with(fileName);
    });
  });

  describe('GET /files/list', () => {
    it('should return list of files', async () => {
      const mockFiles = ['file1.csv', 'file2.csv', 'file3.csv'];
      sandbox.on(filesService, 'getFilesList', () => Promise.resolve(mockFiles));

      const res = await chai.request(app)
        .get('/files/list')
        .set('accept', 'application/json');

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('files');
      expect(res.body.files).to.be.an('array');
      expect(res.body.files).to.deep.equal(mockFiles);
    });

    it('should handle errors in file listing', async () => {
      sandbox.on(filesService, 'getFilesList', () => Promise.reject(new Error('Failed to get files')));

      const res = await chai.request(app)
        .get('/files/list')
        .set('accept', 'application/json');

      expect(res).to.have.status(500);
      expect(res.body).to.have.property('error');
    });
  });
});