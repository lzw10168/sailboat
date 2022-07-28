import { useState, useEffect } from 'react';
import axios from 'axios';

const useURLLoader = (url: string, deps: any[] = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | string>(null);
  const a = 1;
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await axios.get(url);
        setData(result.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, deps);

  return { data, loading, error };
};

export default useURLLoader;
