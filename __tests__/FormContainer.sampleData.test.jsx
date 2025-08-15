import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import DataPage from '../client/pages/DataPage.jsx';

// This is a light interaction test that clicks the "Use Sample Database" button.
// It doesn't assert the graph structure, but ensures the UI wires are intact.
describe('Sample DB button', () => {
  it('clicking "Use Sample Database" does not crash and keeps UI responsive', async () => {
    render(
      <MemoryRouter initialEntries={['/data']}>
        <DataPage />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /Use Sample Database/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    // Sidebar and diagram still render after click
    expect(screen.getByTestId('react-flow-mock')).toBeInTheDocument();
    // Code mirror container exists
    expect(document.querySelector('.codeContainer')).toBeTruthy();
  });
});
