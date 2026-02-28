"use client";

import React from "react";
import { track } from "../lib/analytics";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventParams?: Record<string, any>;
};

export function TrackLink({ eventName, eventParams, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(eventName, eventParams);
        onClick?.(e);
      }}
    />
  );
}