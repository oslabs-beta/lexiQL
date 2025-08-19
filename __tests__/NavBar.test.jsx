import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../client/components/NavBar.jsx';

describe('NavBar', () => {
  it('renders home nav with Playground and FAQ links at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Playground/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
  });

  it('renders app header with Sandbox at /visualizer', () => {
    render(
      <MemoryRouter initialEntries={['/visualizer']}>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Sandbox/i)).toBeInTheDocument();
    // Sandbox link is present in the /visualizer navbar in this layout
  });
});
