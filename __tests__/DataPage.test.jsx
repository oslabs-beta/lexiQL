import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import DataPage from '../client/pages/DataPage.jsx';

test('renders DataPage containers', () => {
  render(
    <MemoryRouter initialEntries={['/data']}>
      <DataPage />
    </MemoryRouter>
  );

  // Smoke test: Diagram and Code containers render without crashing
  expect(screen.getByTestId('react-flow-mock')).toBeInTheDocument();
});
