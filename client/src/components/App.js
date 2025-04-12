import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import FilesList from './FilesList';
import FileData from './FileData';
import { fetchFilesData } from '../redux/slices/filesSlice';

const App = () => {
  const dispatch = useDispatch();
  const { 
    data: filesData, 
    status, 
    error, 
    selectedFileName 
  } = useSelector(state => state.files);

  useEffect(() => {
    dispatch(fetchFilesData(selectedFileName));
  }, [dispatch, selectedFileName]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      <Container className="py-4 flex-grow-1">
        <h1 className="mb-4">Files Data</h1>
        
        <FilesList />
        
        <FileData
          data={filesData}
          loading={status === 'loading'}
          error={error}
        />
      </Container>
      
      <footer className="bg-light py-3 text-center">
        <Container>
          <small className="text-muted">TOOLBOX-fullstack-challenge - Gerardo Germán Grimaldi - {new Date().getFullYear()}</small>
        </Container>
      </footer>
    </div>
  );
};

export default App;