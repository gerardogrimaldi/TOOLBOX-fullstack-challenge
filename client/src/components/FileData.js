import React from 'react';
import { Table, Card, Spinner, Alert } from 'react-bootstrap';


const FileData = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading file data...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!data || data.length === 0) {
    return <Alert variant="info">No file data available.</Alert>;
  }

  return (
    <>
      {data.map((fileData, index) => (
        <Card key={fileData.file || index} className="mb-4">
          <Card.Header as="h5">{fileData.file}</Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Line</th>
                  <th>Text</th>
                  <th>Number</th>
                  <th>Hex</th>
                </tr>
              </thead>
              <tbody>
                {fileData.lines.map((line, lineIndex) => (
                  <tr key={lineIndex}>
                    <td>{lineIndex + 1}</td>
                    <td>{line.text}</td>
                    <td>{line.number}</td>
                    <td>
                      <span className="font-monospace">{line.hex}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default FileData;