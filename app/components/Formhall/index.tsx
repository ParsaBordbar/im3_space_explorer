"use client";
import { useCallback, useEffect, useState } from "react";
import CheckboxWithIcon from "../CheckBox";
import ItemInput from "../ListInput";
import MainInput from "../MainInput";
import Dropdown from "../DropDown";
import X from "/public/x.svg";
import LinkedIn from "/public/linkedin.svg";
import GitHub from "/public/github.svg";
import Website from "/public/global.svg";
import Discord from "/public/discord.svg";
import FileUpload from "../FileUpload";
import MainButton from "../MainButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";

const schemaFormHall = yup.object().shape({
  name: yup.string().required("Name is required"),
  slug: yup.string().required("Slug is required"),
  admins: yup.string(),
  description: yup.string().required("Description is required"),
  pr_pb: yup.string(),
  participants: yup.string(),
  maxParticipants: yup.number().required("maximum participants is required"),
  logoFile: yup.mixed(),
  X: yup.string().required("X is required"),
  LinkedIn: yup.string().required("LinkedIn is required"),
  Discord: yup.string().required("Discord is required"),
  GitHub: yup.string().required("GitHub is required"),
  Website: yup.string().required("Website is required"),
  Web3: yup.string(),
  Decentralization: yup.string(),
  Blockchain: yup.string(),
  SmartContract: yup.string(),
  GameFi: yup.string(),
  DeFi: yup.string(),
  Organization: yup.string(),
  dApps: yup.string(),
  Web3Community: yup.string(),
  Individual: yup.string(),
  Crypto: yup.string(),
  tags: yup.array().of(yup.string()),
});

interface SpaceFormData {
  name: string;
  slug: string;
  admins?: string | string[];
  description: string;
  pr_pb?: string;
  participants?: string | string[];
  maxParticipants: number;
  logoFile?: FileList | File | null;
  X: string;
  LinkedIn: string;
  Discord: string;
  GitHub: string;
  Website: string;
  Web3?: string;
  Decentralization?: string;
  Blockchain?: string;
  SmartContract?: string;
  GameFi?: string;
  DeFi?: string;
  Organization?: string;
  dApps?: string;
  Web3Community?: string;
  Individual?: string;
  Crypto?: string;
  tags?: (undefined | string)[] | undefined;
}

type SpaceFormDataFromSchema = yup.InferType<typeof schemaFormHall>;

const Formhall = () => {
  const [dataFromChild, setDataFromChild] = useState("Public");
  const [dataFromChildAdmins, setDataFromChildAdmins] = useState([""]);
  const [dataFromChildParticipants, setDataFromChildParticipants] = useState([
    "",
  ]);
  const [dataFromChildTags, setDataFromChildTags] = useState([""]);

  const handleDataFromChild = (data: string) => {
    setDataFromChild(data); // Update state with data from child
  };
  const handleDataFromChildAdmins = (data: string[]) => {
    setDataFromChildAdmins(data); // Update state with data from child
  };

  const handleDataFromChildParticipants = (data: string[]) => {
    setDataFromChildParticipants(data); // Update state with data from child
  };

  const socials: Array<{
    socialName: keyof SpaceFormDataFromSchema;
    icon: React.FC;
  }> = [
    { socialName: "X", icon: X },
    { socialName: "LinkedIn", icon: LinkedIn },
    { socialName: "Discord", icon: Discord },
    { socialName: "GitHub", icon: GitHub },
    { socialName: "Website", icon: Website },
  ];

  const allTags = [
    "Web3",
    "Decentralization",
    "Blockchain",
    "Smart Contract",
    "GameFi",
    "Organization",
    "dApps",
    "DeFi",
    "Web3 Community",
    "Crypto",
    "Individual",
  ];

  const tagsField = useCallback(() => {
    return (
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="" className="text-white font-SpaceGrotesk ">
          Tags of your space {` (${dataFromChildTags.length} selected)`}
        </label>
        <section className="flex items-center flex-wrap gap-2.5">
          {allTags.map((tag) => {
            return (
              <CheckboxWithIcon
                key={tag}
                value={tag}
                sendDataToParent={(data: string, isChecked: boolean) => {
                  const updatedData = dataFromChildTags.filter(
                    (item) => item !== ""
                  );
                  if (isChecked) {
                    setDataFromChildTags([...updatedData, data]);
                  }
                  if (!isChecked) {
                    const updatedDataTags = updatedData.filter(
                      (item) => item !== data
                    );
                    setDataFromChildTags(updatedDataTags);
                  }
                }}
              />
            );
          })}
        </section>
      </div>
    );
  }, [dataFromChildTags]);

  const socialField = useCallback(() => {
    return (
      <div className="w-full col-span-full flex flex-col gap-1">
        <h2 className="text-base font-SpaceGrotesk text-white">
          Socials of your space
        </h2>
        <ul className="grid grid-cols-4 md:grid-cols-5 w-full gap-2 rounded-lg shadow-lg z-10 ">
          {socials.map(({ socialName, icon }) => {
            return (
              <li
                key={socialName}
                className=" flex col-span-full sm:col-span-2 last:sm:col-span-full last:md:col-span-1 md:col-span-1 flex-col gap-1 "
              >
                <Controller
                  name={socialName}
                  control={control}
                  render={({ field }) => (
                    <MainInput
                      {...field}
                      inputClassName="!text-sm"
                      parentClassName={` ${
                        socialName == "Website"
                          ? "[&>section>div>svg>*]:stroke-white"
                          : "[&>section>div>svg>*]:fill-white"
                      } [&>section>div>svg>*]:opacity-70`}
                      iconFirst={icon}
                      mode="input"
                    />
                  )}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }, []);

  const participantsField = useCallback(() => {
    return (
      <Controller
        control={control}
        name="participants"
        render={({ field }) => (
          <ItemInput
            className="col-span-full md:col-span-1"
            onData={handleDataFromChildParticipants}
            {...field}
            mode={dataFromChild == "Public" ? "disable" : null}
            label="Participants of your space"
            registerValue={"participants"}
          />
        )}
      />
    );
  }, [dataFromChild]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaFormHall), // Integrate yup validation
  });

  console.log(errors);
  useEffect(() => {
    if (errors.name?.message) {
      toast.error(errors.name.message);
    }
    if (!errors.name?.message && errors.slug?.message) {
      toast.error(errors.slug.message);
    }
    if (
      !errors.name?.message &&
      !errors.slug?.message &&
      errors.description?.message
    ) {
      toast.error(errors.description?.message);
    }
    if (
      !errors.name?.message &&
      !errors.slug?.message &&
      !errors.description?.message &&
      errors.maxParticipants?.message
    ) {
      toast.error(errors.maxParticipants?.message);
    }
    if (
      !errors.name?.message &&
      !errors.slug?.message &&
      !errors.description?.message &&
      !errors.maxParticipants?.message &&
      !errors.logoFile?.message &&
      (errors.LinkedIn?.message ||
        errors.X?.message ||
        errors.GitHub?.message ||
        errors.Website?.message ||
        errors.Discord?.message)
    ) {
      toast.error("All of social field is required");
    }
  }, [errors]);

  const onSubmit = (data: SpaceFormData) => {
    if (!data.logoFile) {
      toast.error("Logo file is required");
      return;
    }

    const pr_pbValidation = () => {
      return dataFromChildParticipants.length == 0 && dataFromChild == "Private"
        ? "Public"
        : dataFromChild;
      // return !dataFromChild ? "Private" : "Public";
    };

    Object.assign(
      data,
      { admins: dataFromChildAdmins },
      {
        participants:
          pr_pbValidation() == "Private" ? dataFromChildParticipants : [],
      },
      { tags: dataFromChildTags },
      { pr_pb: pr_pbValidation() },
      { url: `space.ime.live/rooms/${data.slug}` }
    );
    if (data.tags && data.tags.length < 3) {
      toast.error("At Least 3 Tags");
      return;
    } else {
      console.log("Form Data:", data);
    }
    // const mergeData = [...data, ...dataFromChildAdmins];
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action=""
      className="grid grid-cols-2 mb-20 bg-[#5b5b5d3e] rounded-xl p-4 w-full gap-10"
    >
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <MainInput
            {...field}
            parentClassName="col-span-full md:col-span-1"
            type="text"
            placeholder="Moun Netword"
            label="Name of your space"
            mode={"input"}
          />
        )}
      />

      <Controller
        control={control}
        name="slug"
        render={({ field }) => (
          <MainInput
            {...field}
            placeholder="moun"
            parentClassName="col-span-full md:col-span-1"
            type="text"
            label="Slug of your space"
            mode={"input"}
          />
        )}
      />

      <Controller
        control={control}
        name="admins"
        render={({ field }) => (
          <ItemInput
            className="col-span-full md:col-span-1"
            onData={handleDataFromChildAdmins}
            {...field}
            registerValue="admins"
            label="Admins of your space"
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <MainInput
            {...field}
            parentClassName="col-span-full md:col-span-1"
            type="text"
            placeholder="Decentralize all Off-Chain Components of your dApp"
            label="Description of your space"
            mode={"input"}
          />
        )}
      />

      <Controller
        control={control}
        name="pr_pb"
        render={({ field }) => (
          <Dropdown
            className="max-md:col-span-full"
            {...field}
            onData={handleDataFromChild}
            itemsArray={["Public", "Private"]}
            label="Private / Public"
            mode={"input"}
          />
        )}
      />

      {participantsField()}

      <Controller
        control={control}
        name="maxParticipants"
        render={({ field }) => (
          <MainInput
            {...field}
            parentClassName="col-span-full md:col-span-1"
            type="number"
            placeholder="20"
            label="Maximum number of participent"
            mode={"input"}
          />
        )}
      />

      <Controller
        name="logoFile"
        control={control}
        render={({ field, fieldState }) => (
          <FileUpload
            label="Logo of your space"
            field={field}
            error={fieldState.error?.message}
          />
        )}
      />
      {socialField()}
      {tagsField()}
      <MainButton
        // onClick={handleSubmit(onSubmit)}
        mode={"pro"}
        value={"Create the new space"}
        className="!font-normal !rounded-lg p-3 col-span-full md:w-fit md:place-self-end"
      />
    </form>
  );
};

export default Formhall;
