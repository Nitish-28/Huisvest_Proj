import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AxiosFetchComponent = ({ url, onDataFetched, method, data = null }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method,
          url: `http://api.chrisouboter.com/api${url}`,
          data,
        });
        onDataFetched(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, onDataFetched, method, data]);

  return null;
};

export default AxiosFetchComponent;
