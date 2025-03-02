"use client";

import React from "react";

export const ScrollArea = ({ children }: { children: React.ReactNode }) => {
  return <div className="overflow-auto max-h-96">{children}</div>;
};
