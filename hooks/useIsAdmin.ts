import { useMemo } from "react";
import useGetConfigData from "./useGetConfig";

const useIsAdmin = (identity: string, slug: string) => {
  const { configData, isLoading } = useGetConfigData(
    `admin/admins/sort?sort=room&room=${slug}`
  );
  const isAdmin = useMemo(() => {
    if (Array.isArray(configData)) {
      const ad = configData.find((admin) => admin.identity == identity);
      return !!ad;
    }
  }, [configData]);
  return { isAdmin, isLoading };
};

export default useIsAdmin;
