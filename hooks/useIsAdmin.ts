import { useMemo } from "react";
import useGetConfigData from "./useGetConfig";

const useIsAdmin = (identity: string, slug: string) => {
  const admins = useGetConfigData(`admin/admins/sort?sort=room&room=${slug}`);
  const isAdmin = useMemo(() => {
    if (Array.isArray(admins.configData)) {
      const ad = admins.configData.find((admin) => admin.identity == identity);
      return !!ad;
    }
  }, [admins]);
  return {isAdmin}
};

export default useIsAdmin