import { StaticImageData } from "next/image";
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  FunctionComponent,
  InputHTMLAttributes,
} from "react";
import { UseFormRegister } from "react-hook-form";

export type SpaceCardProps = {
  className: string;
  verified: boolean;
  logo_URL: string;
  slug: string;
  name_space: string;
  members: string | 1;
  privateSpace: boolean;
  roomUrl: string;
  tags: [string];
};

export type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  value?: string;
  className?: string;
  iconSrc?: string;
  mode: "freez" | "simple" | "pro" | "submit";
};

export type SocialInfoType = {
  className?: string;
  icon: string | StaticImageData;
  value: string;
  link: string;
  width: number;
  title: string;
  height: number;
};

export type DetailMiniBoxType = {
  icon: string;
  value: string | number;
  className?: string;
  title: string;
};

export interface SpaceSectionType {
  search: string;
}

export interface TagType {
  tag: string;
}

export interface ParamsType {
  slug: string;
}

export interface dataType {
  slug: string;
  config: {
    verified: boolean;
    ui: {
      logo: string;
      privateRoom: boolean;
      desc: string;
      socials: {
        x: string;
        discord: string;
        website: string;
        github: string;
      };
      tags: [string];
    };
    whiteListParticipants: [string];
    maxParticipants: string;
  };
}

export interface CopyButtonType {
  className: string;
}

export interface TSearchForm {
  search?: string;
}
export interface TSearch extends TSearchForm {
  filters: boolean;
  sendDataToParent?: (data: string) => void;
}

export interface TInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  arrayItems?: string[];
  mode: "input" | "dropdown";
  iconFirst?: FunctionComponent;
  iconEnd?: FunctionComponent;
  inputClassName?: string;
  error?: boolean;
  register?: any;
  parentClassName?: string;
}

export type UseFormRegisterReturn = {
  onChange: (e: ChangeEvent) => void;
  onBlur: (e: FocusEvent) => void;
  ref: (instance: HTMLInputElement | null) => void;
  name: string;
};
