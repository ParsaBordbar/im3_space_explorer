import { spaceApi } from "../api/base";

const useGetConfigData = async (slug: string): Promise<any> => {
  try {
    const response = await spaceApi.get(slug);
    if (Array.isArray(response.data) && response.data.length === 0) {
      return 0; // Return 0 if data is an empty array
    }
    return response.data; // Return the fetched data
  } catch (err) {
    throw err instanceof Error ? err.message : "An unknown error occurred";
  }
};

export default useGetConfigData;
