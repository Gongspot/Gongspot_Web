import React from "react";

const NAVBAR_HEIGHT = 64; // 실제 하단 네비바의 height(px)와 맞춰야 함!

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main
    className="w-full"
    style={{
      minHeight: "100vh",
      paddingBottom: NAVBAR_HEIGHT,
      boxSizing: "border-box",
    }}
  >
    {children}
  </main>
);

export default Layout;
