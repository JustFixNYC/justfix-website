import React from "react";

type OutboundLinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const OutboundLink = (props: OutboundLinkProps) => (
  <a {...props} target="_blank" rel="nofollow noopener">
    {props.children}
  </a>
);

export const linkIsSms = (link: string) => link.slice(0, 4) === "sms:";
