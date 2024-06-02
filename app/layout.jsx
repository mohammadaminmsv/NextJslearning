import Nav from "@components/Nav";
import "../styles/globals.css";
import React from "react";
import Provider from "@components/Provider";
export const metadata = {
  title: "promptopia",
  description: "Discover & Share AI Prompt",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <Nav />
          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
