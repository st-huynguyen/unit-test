import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../shared/hooks';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { deleteUserById, getListUsers } from '../stores/users/userSlice';

const List = () => {
  const { users, isLoading, isError, message } = useSelector(
    (state: any) => state.users
  );
  const dispatch = useAppDispatch();

  const fetchUsers = () => {
    dispatch(getListUsers());
  };

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUserById(id));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>LIST USERS</h1>
      <Loading isLoading={isLoading} />
      <Error isError={isError} message={message} />
      {users && (
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id}>
                  <th>{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Link to={`users/${user.id}`}>Detail</Link>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default List;
