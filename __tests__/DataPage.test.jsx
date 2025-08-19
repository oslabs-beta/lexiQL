import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import DataPage from '../client/pages/DataPage.jsx';

test('renders DataPage containers', async () => {
  render(
    <MemoryRouter initialEntries={['/visualizer']}>
      <DataPage />
    </MemoryRouter>
  );

  // React.lazy + Suspense renders async; wait for mock to appear
  expect(await screen.findByTestId('react-flow-mock')).toBeInTheDocument();
});
