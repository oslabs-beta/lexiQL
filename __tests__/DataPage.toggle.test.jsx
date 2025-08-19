import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import DataPage from '../client/pages/DataPage.jsx';

// Mock the CodeMirror component
jest.mock('react-codemirror2', () => ({
  UnControlled: ({ value }) => <div data-testid="code-mirror">{value}</div>,
}));

// Mock the initial code state to include schema and resolver data
jest.mock('../client/state/reducers', () => ({
  ...jest.requireActual('../client/state/reducers'),
  initialCodeState: {
    schema: 'type User { id: ID! name: String! }',
    resolver: 'const resolvers = { Query: { users: () => [] } }',
    displayCode: 'type User { id: ID! name: String! }',
    codeIsOpen: false,
  },
}));

describe('DataPage interactions', () => {
  it('toggles the code drawer open/closed', async () => {
    render(
      <MemoryRouter initialEntries={['/visualizer']}>
        <DataPage />
      </MemoryRouter>
    );

    // Wait for the toggle button to appear (it only shows when code data is available)
    const toggleBtn = await screen.findByTitle('Show code panel');
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);

    // After opening, the toggle should show hide text
    expect(screen.getByTitle('Hide code panel')).toBeInTheDocument();
  });
});
