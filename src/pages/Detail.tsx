import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../shared/hooks';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { getUserById } from '../stores/users/userSlice';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const { user, isLoading, isError, message } = useSelector(
    (state: any) => state.users
  );
  const dispatch = useAppDispatch();

  const fetchUser = () => {
    if (id) {
      dispatch(getUserById(id));
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h1>USER DETAIL</h1>
      <Loading isLoading={isLoading} />
      <Error isError={isError} message={message} />
      {user && (
        <div>
          <ul>
            <li>ID: {user.id}</li>
            <li>Name: {user.name}</li>
            <li>Username: {user.username}</li>
            <li>Email: {user.email}</li>
            <li>Phone: {user.phone}</li>
            <li>Website: {user.website}</li>
            <li>Compnay: {user.company.name}</li>
            <li>
              Address: {user.address.street}, {user.address.city}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Detail;
