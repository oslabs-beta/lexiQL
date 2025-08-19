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
    expect(screen.getByText(/Playground/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
  });

  it('renders data header at /visualizer', () => {
    render(
      <MemoryRouter initialEntries={['/visualizer']}>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Sandbox/i)).toBeInTheDocument();
  });
});
