import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../client/App.jsx';

test('renders NavBar and shows Visualize link', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getAllByText(/Visualize/i)[0]).toBeInTheDocument();
});
