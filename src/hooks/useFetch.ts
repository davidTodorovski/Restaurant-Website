import { useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState<any[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsPending(true);
      setError(false);

      try {
        const res = await fetch(url);
        if (!res.ok) {
          setError(true);
          throw new Error(res.statusText);
        }
        const data = await res.json();

        setIsPending(false);
        setData(data);
        setError(false);
      } catch (err) {
        setIsPending(false);
        setError(true);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isPending, error };
};
