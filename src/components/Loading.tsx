import React from 'react';

interface LoadingProps {
  isLoading: boolean;
}

const Loading = ({ isLoading }: LoadingProps) => {
  return (
    <>
      {isLoading ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : null}
    </>
  );
};

export default Loading;
