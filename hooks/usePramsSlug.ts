const useParamsSlug = (url: string) => {
  return url.replace(/_/g, " ");
};

export default useParamsSlug;
