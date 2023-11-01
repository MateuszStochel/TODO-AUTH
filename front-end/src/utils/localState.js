import { useState } from 'react';

const useLocalState = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false)

  return {
    isLoading,
    setLoading,
    isError,
    setError,
  };
};

export default useLocalState;
