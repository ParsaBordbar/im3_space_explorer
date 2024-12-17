import { useState } from "react";
import MainInput from "../MainInput";
import X from "/public/x.svg";
import LinkedIn from "/public/linkedin.svg";
import GitHub from "/public/github.svg";
import Website from "/public/global.svg";
import Discord from "/public/discord.svg";
const SocialLinksInput = () => {
  const platforms = [
    { socialName: "X", icon: X },
    { socialName: "LinkedIn", icon: LinkedIn },
    { socialName: "Discord", icon: Discord },
    { socialName: "GitHub", icon: GitHub },
    { socialName: "Website", icon: Website },
  ];

  return (
    <div className="w-full col-span-full flex flex-col gap-1">
      <h2 className="text-base font-SpaceGrotesk text-white">
        Socials of your space
      </h2>
      <ul className="grid grid-cols-5 w-full gap-2 rounded-lg shadow-lg z-10 ">
        {platforms.map((platform) => (
          <li
            title={platform.socialName}
            key={platform.socialName}
            className=" flex col-span-1 flex-col gap-1 "
          >
            <MainInput
              inputClassName="!text-sm"
              parentClassName={` ${
                platform.socialName == "Website"
                  ? "[&>section>div>svg>*]:stroke-white"
                  : "[&>section>div>svg>*]:fill-white"
              } [&>section>div>svg>*]:opacity-70`}
              iconFirst={platform.icon}
              mode="input"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinksInput;
