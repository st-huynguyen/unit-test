import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('Test Error component', () => {
  const errorMsg = 'Something went wrong...';

  it('Render Error component when error prop is true', async () => {
    render(<Error isError={true} message={errorMsg} />);
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });

  it('NOT render Error component when error prop is false', async () => {
    render(<Error isError={false} message={errorMsg} />);
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();
  });
});
