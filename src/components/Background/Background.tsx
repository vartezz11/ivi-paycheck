import React from "react";

export const Background = ({ children }: { children: React.ReactNode }) => {
  const style: React.CSSProperties = {
    position: "fixed",
    backgroundImage: 'url("/background.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100vw",
    height: "100vh",
    zIndex: -1,
  };

  return (
    <div style={style} className="">
      {children}
    </div>
  );
};
