import * as yup from "yup";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { TSearchForm } from "@/app/types";

export const AdminSchema = yup.object({
  search: yup.string(),
});

const useAdmin = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TSearchForm>({
    resolver: yupResolver(AdminSchema),
  });
  console.log(errors);

  const { push } = useRouter();
  const handleValueInputs: SubmitHandler<TSearchForm> = useCallback(
    (data: TSearchForm) => {
      // console.log(data.search);
      // data.search != "" && push(`/search/${data.search}`);
    },
    []
  );

  return {
    control,
    handleValueInputs,
    register,
    errors,
    handleSubmit,
  };
};

export default useAdmin;
