import React from "react";
import {
  EventProperties,
  useLogAmplitudeLinkClick,
} from "../components/amplitude";

type OutboundLinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const OutboundLink = (
  props: OutboundLinkProps & { eventProperties?: EventProperties }
) => {
  const { eventProperties, ...linkProps } = props;
  return (
    <a
      {...linkProps}
      target="_blank"
      rel="nofollow noopener"
      onClick={useLogAmplitudeLinkClick(linkProps.href!, {
        ...eventProperties,
      })}
    >
      {linkProps.children}
    </a>
  );
};

export const linkIsSms = (link: string) => link.slice(0, 4) === "sms:";
