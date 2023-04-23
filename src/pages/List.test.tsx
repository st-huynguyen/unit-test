import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { store } from '../stores';
import { listUsers } from '../shared/data';
import { BrowserRouter } from 'react-router-dom';
import List from './List';
import { endpoint, loadingText } from '../shared/constants';

const handlers = [
  rest.get(endpoint, (req: any, res: any, ctx: any) => {
    return res(ctx.json(listUsers), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

const renderTemplate = (
  <Provider store={store}>
    <List />
  </Provider>
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Test List component: get list users function', () => {
  it('Display list users page title', async () => {
    render(renderTemplate, { wrapper: BrowserRouter });
    expect(screen.getByRole('heading')).toHaveTextContent('LIST USERS');
  });

  it('Display loading state', async () => {
    render(renderTemplate, { wrapper: BrowserRouter });
    expect(screen.queryByText(loadingText)).toBeInTheDocument();
  });

  it('Display 10 users when success', async () => {
    const numberOfUsers = listUsers.length;
    render(renderTemplate, { wrapper: BrowserRouter });
    await waitFor(() => {
      expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
      // render 10 users
      expect(screen.getAllByText(/Detail/i)).toHaveLength(numberOfUsers);
      // render user1 info
      expect(screen.queryByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.queryByText('Sincere@april.biz')).toBeInTheDocument();
      expect(screen.queryByText('1-770-736-8031 x56442')).toBeInTheDocument();
    });
  });

  it('Display error when request error', async () => {
    server.use(
      rest.get(endpoint, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(renderTemplate, { wrapper: BrowserRouter });
    await waitFor(() => {
      expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
      expect(screen.queryByText(/500/i)).toBeInTheDocument();
    });
  });
});

describe('Test List component: delete user function', () => {
  it('Display 9 users when delete user2 success', async () => {
    server.use(
      rest.delete(`${endpoint}/2`, (req, res, ctx) => {
        return res(ctx.status(200));
      })
    );
    render(renderTemplate, { wrapper: BrowserRouter });
    await waitFor(() => {
      expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
      fireEvent.click(screen.getAllByText('Delete')[1]);
    });
    await waitFor(() => {
      expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
      // render 9 users after delete successfully
      expect(screen.getAllByText(/Detail/i)).toHaveLength(9);
      // still render user1 info
      expect(screen.queryByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.queryByText('Sincere@april.biz')).toBeInTheDocument();
      expect(screen.queryByText('1-770-736-8031 x56442')).toBeInTheDocument();
      // not render user2 info
      expect(screen.queryByText('Ervin Howell')).not.toBeInTheDocument();
      expect(screen.queryByText('Shanna@melissa.tv')).not.toBeInTheDocument();
      expect(screen.queryByText('010-692-6593 x09125')).not.toBeInTheDocument();
    });
  });

  it('Display error when request error', async () => {
    server.use(
      rest.delete(`${endpoint}/2`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(renderTemplate, { wrapper: BrowserRouter });
    await waitFor(() => {
      expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
      fireEvent.click(screen.getAllByText('Delete')[1]);
    });
    await waitFor(() => {
      expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
      // still render 10 users
      expect(screen.getAllByText(/Detail/i)).toHaveLength(10);
      // render error
      expect(screen.queryByText(/500/i)).toBeInTheDocument();
    });
  });
});
