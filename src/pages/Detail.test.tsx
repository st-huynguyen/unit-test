import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { store } from '../stores';
import { user1 } from '../shared/data';
import { Router, Route, Routes } from 'react-router-dom';
import Detail from './Detail';
import { endpoint, loadingText } from '../shared/constants';
import { createMemoryHistory } from 'history';

const { id, name } = user1;
const user1Endpoint = `${endpoint}/${id}`;

export const handlers = [
  rest.get(user1Endpoint, (req: any, res: any, ctx: any) => {
    return res(ctx.json(user1), ctx.delay(150));
  }),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Test Detail component', () => {
  // Set up param id = 1
  const history = createMemoryHistory({
    initialEntries: [`/users/${id}`],
  });
  const renderTemplate = (
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route path="/users/:id" element={<Detail />} />
        </Routes>
      </Router>
    </Provider>
  );

  it('Display detali page title', async () => {
    render(renderTemplate);
    expect(screen.getByRole('heading')).toHaveTextContent('USER DETAIL');
  });

  it('Display loading state', async () => {
    render(renderTemplate);
    expect(screen.queryByText(loadingText)).toBeInTheDocument();
  });

  it('Display user1 when success', async () => {
    render(renderTemplate);
    await waitFor(() => {
      expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
      expect(screen.getByText(`ID: ${id}`)).toBeInTheDocument();
      expect(screen.getByText(`Name: ${name}`)).toBeInTheDocument();
      expect(screen.getByText('Email: Sincere@april.biz')).toBeInTheDocument();
      expect(
        screen.getByText('Phone: 1-770-736-8031 x56442')
      ).toBeInTheDocument();
      expect(screen.getByText('Website: hildegard.org')).toBeInTheDocument();
      expect(screen.getByText('Compnay: Romaguera-Crona')).toBeInTheDocument();
      expect(
        screen.getByText('Address: Kulas Light, Gwenborough')
      ).toBeInTheDocument();
    });
  });

  it('Display error when 500 server error', async () => {
    server.use(
      rest.get(user1Endpoint, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(renderTemplate);
    await waitFor(() => {
      expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
      expect(screen.queryByText(/500/i)).toBeInTheDocument();
    });
  });

  it('Display not found message when 404 error', async () => {
    server.use(
      rest.get(user1Endpoint, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    render(renderTemplate);
    await waitFor(() => {
      expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
      expect(screen.queryByText(/User not found!/)).toBeInTheDocument();
    });
  });
});
