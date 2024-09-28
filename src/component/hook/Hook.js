import { useState, useEffect } from "react";
import axios from "axios";

const useElasticSearch = (indexName, query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:9200/${indexName}/_search`,
          {
            query: query,
          }
        );
        const hits = response.data.hits.hits.map((hit) => hit._source);
        setData(hits);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [indexName, query]);

  return { data, loading, error };
};

export default useElasticSearch;
