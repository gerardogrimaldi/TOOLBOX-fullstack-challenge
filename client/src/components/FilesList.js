import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { fetchFilesList, setSelectedFileName } from '../redux/slices/filesSlice';


const FilesList = () => {
  const dispatch = useDispatch();
  const { 
    files, 
    selectedFileName,
    filesListStatus: loading, 
    filesListError: error
  } = useSelector(state => state.files);
  
  const [localSelectedFile, setLocalSelectedFile] = useState('');

  useEffect(() => {
    dispatch(fetchFilesList());
  }, [dispatch]);

  useEffect(() => {
    setLocalSelectedFile(selectedFileName || '');
  }, [selectedFileName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSelectedFileName(localSelectedFile || null));
  };

  const handleReset = () => {
    setLocalSelectedFile('');
    dispatch(setSelectedFileName(null));
  };

  return (
    <div className="mb-4">
      <h4 className="mb-3">Filter by File Name</h4>
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-end">
          <Col md={6} className="mb-2">
            <Form.Group>
              <Form.Label>Select File</Form.Label>
              <Form.Select 
                value={localSelectedFile} 
                onChange={(e) => setLocalSelectedFile(e.target.value)}
                disabled={loading === 'loading' || files.length === 0}
              >
                <option value="">All Files</option>
                {files.map((file) => (
                  <option key={file} value={file}>{file}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} className="mb-2 d-flex">
            <Button 
              type="submit" 
              variant="primary" 
              className="me-2"
              disabled={loading === 'loading'}
            >
              Apply Filter
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={handleReset}
              disabled={loading === 'loading' || !localSelectedFile}
            >
              Show All
            </Button>
          </Col>
        </Row>
      </Form>
      {error && <div className="text-danger mt-2">{error}</div>}
    </div>
  );
};

export default FilesList;