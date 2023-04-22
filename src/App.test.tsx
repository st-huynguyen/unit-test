import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './stores';
import { loadingText } from './shared/constants';

describe('Test router', () => {
  it('Index route will render List page', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByRole('heading')).toHaveTextContent('LIST USERS');
  });

  it('Navigate to Detail page when user click on detail link', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    await waitFor(() => {
      expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
      fireEvent.click(screen.getAllByText('Detail')[0]);
    });
    expect(screen.getByRole('heading')).toHaveTextContent('USER DETAIL');
  });

  it('Navigate to not found page when user enter url not in routes', async () => {
    const notFoundRoute = '/some-not-found-route';
    render(
      <MemoryRouter initialEntries={[notFoundRoute]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading')).toHaveTextContent('NOT FOUND');
  });
});
