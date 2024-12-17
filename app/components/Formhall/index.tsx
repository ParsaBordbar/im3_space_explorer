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
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller } from "react-hook-form";

const schemaFormHall = yup.object().shape({
  name: yup.string().required("Name is required"),
  slug: yup.string().required("Slug is required"),
  admins: yup.string(),
  description: yup.string(),
  pr_pb: yup.string(),
  participants: yup.string(),
  maxParticipants: yup.number(),
  // logoFile: yup.mixed(),
  X: yup.string(),
  LinkedIn: yup.string(),
  Discord: yup.string(),
  GitHub: yup.string(),
  Website: yup.string(),
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
});

const Formhall = () => {
  const [dataFromChild, setDataFromChild] = useState("Private");
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

  const platforms = [
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
                value={tag}
                sendDataToParent={(data: string, isChecked: boolean) => {
                  const updatedData = dataFromChildTags.filter(
                    (item) => item !== ""
                  );
                  isChecked && setDataFromChildTags([...updatedData, data]);
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
          {platforms.map((platform: any) => (
            <li
              title={platform.socialName}
              key={platform.socialName}
              className=" flex col-span-full sm:col-span-2 last:sm:col-span-full last:md:col-span-1 md:col-span-1 flex-col gap-1 "
            >
              <Controller
                control={control}
                name={platform.socialName}
                render={({ field }) => (
                  <MainInput
                    {...field}
                    inputClassName="!text-sm"
                    parentClassName={` ${
                      platform.socialName == "Website"
                        ? "[&>section>div>svg>*]:stroke-white"
                        : "[&>section>div>svg>*]:fill-white"
                    } [&>section>div>svg>*]:opacity-70`}
                    iconFirst={platform.icon}
                    mode="input"
                  />
                )}
              />
            </li>
          ))}
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
            mode={dataFromChild == "Private" ? "disable" : null}
            label="Participants of your space"
            registerValue={"participants"}
          />
        )}
      />
    );
  }, [dataFromChild]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaFormHall), // Integrate yup validation
  });

  const onSubmit = (data: any) => {
    Object.assign(
      data,
      { admins: dataFromChildAdmins },
      { participants: dataFromChildParticipants },
      { tags: dataFromChildTags }
    );
    console.log("Form Data:", data);
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
            itemsArray={["Private", "Public"]}
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

      {/* <FileUpload /> */}
      {socialField()}
      {tagsField()}
      <MainButton
        // onClick={handleSubmit(onSubmit)}
        mode={"submit"}
        value={"Create the new space"}
        className="bg-box-space !rounded-lg p-3 col-span-full"
      />
    </form>
  );
};

export default Formhall;
