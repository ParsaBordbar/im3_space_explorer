import { useEffect, useState } from "react";
import { spaceApi } from "../api/base";

const useGetConfigData = (slug: string) => {
  const [configData, setConfigData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchConfigData = async (slug: string) => {
    setIsLoading(true);
    try {
      const response = await spaceApi.get(slug);
      Array.isArray(response.data) && response.data.length === 0
        ? setConfigData(0)
        : setConfigData(response.data);
      console.log("Response from Hook:", response, slug);
    } catch (err) {
      console.error("Error fetching config data:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchConfigData(slug);
    }
  }, [slug]);

  return { configData, error, isLoading };
};

export default useGetConfigData;
