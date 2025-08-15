import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import DataPage from '../client/pages/dataPage.jsx';

describe('DataPage interactions', () => {
  it('toggles the code sidebar open/closed', () => {
    render(
      <MemoryRouter initialEntries={['/data']}>
        <DataPage />
      </MemoryRouter>
    );

    const toggleBtn = screen.getByRole('button', { name: '+' });
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);

    // After opening, the toggle should show '-'
    expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
  });
});
