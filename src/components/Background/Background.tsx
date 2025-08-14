import React from "react";

export const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        backgroundImage: 'url("/background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-full w-full flex flex-col fixed"
    >
      {children}
    </div>
  );
};
