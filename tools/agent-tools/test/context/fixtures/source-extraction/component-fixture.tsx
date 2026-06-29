import * as React from "react";

type PolicyCardProps = {
  title: string;
};

export function PolicyCard({ title }: PolicyCardProps) {
  return (
    <article>
      <h2>{title}</h2>
    </article>
  );
}

const LocalBadge = () => <span>Ready</span>;

function renderValue(value: string) {
  return <strong>{value}</strong>;
}

export const InlinePanel = ({ children }: { children: React.ReactNode }) => {
  return <section>{children}</section>;
};
