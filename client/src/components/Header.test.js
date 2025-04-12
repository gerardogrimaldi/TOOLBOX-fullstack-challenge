import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  test('renders the application title', () => {
    render(<Header />);
    
    expect(screen.getByText('Toolbox Challenge')).toBeInTheDocument();
  });

  test('uses dark navbar styling', () => {
    render(<Header />);
    
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('bg-dark');
    expect(navbar).toHaveClass('navbar-dark');
  });
});