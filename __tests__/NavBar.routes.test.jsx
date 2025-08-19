import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../client/components/NavBar.jsx';

describe('NavBar route rendering', () => {
  it('renders home header at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Docs/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Visualize/i)[0]).toBeInTheDocument();
  });

  it('renders data header at /visualizer', () => {
    render(
      <MemoryRouter initialEntries={['/visualizer']}>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Playground/i)).toBeInTheDocument();
  });
});
