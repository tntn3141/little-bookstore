import React, { ElementType } from "react";

type Variant =
  | "h1"
  | "h2"
  | "3xl"
  | "2xl"
  | "xl"
  | "lg"
  | "md"
  | "body-big"
  | "body"
  | "body-small"
  | "small"
  | "title"
  | "author";

interface Props {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
}

const tags: Record<Variant, ElementType> = {
  h1: "h1",
  h2: "h2",
  "3xl": "span",
  "2xl": "span",
  "xl": "span",
  "lg": "span",
  "md": "span",
  "body-big": "p",
  body: "p",
  "body-small": "p",
  small: "span",
  title: "p",
  author: "p"
};

const sizes: Record<Variant, string> = {
  h1: "text-2xl font-bold md:text-1xl lg:text-2xl",
  h2: "text-xl font-bold md:text-xl lg:text-xl",
  "3xl": "text-3xl font-bold md:text-2xl lg:text-3xl",
  "2xl": "text-2xl font-bold md:text-xl lg:text-2xl",
  xl: "text-xl font-bold md:text-lg lg:text-xl",
  lg: "text-lg md:text-md lg:text-lg",
  md: "text-md md:text-sm lg:text-md",
  "body-big": "text-xl font-bold md:text-lg lg:text-xl",
  body: "text-lg md:text-md lg:text-lg",
  "body-small": "text-md md:text-sm lg:text-md",
  small: "text-sm sm:text-xs",
  title: "text-sm font-bold sm:text-md lg:text-lg",
  author: "italic text-sm sm:text-md lg:text-lg",
};

export const Typography = ({ variant, children, className, as }: Props) => {
  const sizeClasses = sizes[variant];
  const Tag = as || tags[variant];

  return <Tag className={`${sizeClasses} ${className}`}>{children}</Tag>;
};
