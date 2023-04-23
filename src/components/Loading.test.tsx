import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';
import { loadingText } from '../shared/constants';

describe('Test Loading component', () => {
  it('Render Loading component when loading prop is true', async () => {
    render(<Loading isLoading={true} />);
    expect(screen.getByText(loadingText)).toBeInTheDocument();
  });

  it('NOT render Loading component when loading prop is false', async () => {
    render(<Loading isLoading={false} />);
    expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
  });
});
