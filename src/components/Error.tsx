import React from 'react';

interface ErrorProps {
  isError: boolean;
  message: string;
}

const Error = ({ isError, message }: ErrorProps) => {
  return (
    <>
      {isError ? (
        <div>
          <span>{message}</span>
        </div>
      ) : null}
    </>
  );
};

export default Error;
