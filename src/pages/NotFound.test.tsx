import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

describe('Test NotFound component', () => {
  it('Render NotFound component', async () => {
    render(<NotFound />);
    expect(screen.getByRole('heading')).toHaveTextContent('NOT FOUND');
  });
});
