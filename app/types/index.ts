import { ButtonHTMLAttributes } from "react";

export type SpaceCardProps = {
  className: string;
  logo_URL: any;
  slug: string;
  name_space: string;
  members: string;
  privateSpace: boolean;
  roomUrl: string;
  tags: [string];
};

export type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  value?: string;
  className?: string;
  iconSrc?: string;
  submit?: boolean;
  simple?: boolean;
  freez?: boolean;
  pro?: boolean;
};

export type SocialInfoType = {
  icon: string;
  value: string;
  link: string;
  width: number;
  title: string;
  height: number;
};

export type DetailMiniBoxType = {
  icon: string;
  value: string;
  className?: string;
  title: string;
};

export interface SpaceSectionType {
  search: any;
};

export interface TagType {
  tag: string;
};