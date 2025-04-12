import React from 'react';
import { render, screen } from '@testing-library/react';
import FileData from './FileData';

describe('FileData Component', () => {
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

  test('renders loading spinner when loading is true', () => {
    render(<FileData loading={true} />);
    
    expect(screen.getByText('Loading file data...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('renders error message when error is provided', () => {
    const errorMessage = 'Failed to load files';
    render(<FileData error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders "No file data available" when data is empty', () => {
    render(<FileData data={[]} />);
    
    expect(screen.getByText('No file data available.')).toBeInTheDocument();
  });

  test('renders file data with correct columns and values', () => {
    render(<FileData data={mockData} />);
    
    expect(screen.getByText('file1.csv')).toBeInTheDocument();
    
    expect(screen.getByText('Line')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('Number')).toBeInTheDocument();
    expect(screen.getByText('Hex')).toBeInTheDocument();
    
    expect(screen.getByText('RgTya')).toBeInTheDocument();
    expect(screen.getByText('64075909')).toBeInTheDocument();
    expect(screen.getByText('70ad29aacf0b690b0467fe2b2767f765')).toBeInTheDocument();
    expect(screen.getByText('AtjW')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('d33a8ca5d36d3106219f66f939774cf5')).toBeInTheDocument();
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});