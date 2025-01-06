import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "appointment",
  description: "booking",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${inter.className}`}>
        {/* Main Content */}
        <main className="container">
          <div className="flex items-start  min-h-screen ">
            <div className="mt-5"></div>
          {children}
          </div>
        </main>
      </body>
    </html>
  
  );
};
export default RootLayout;
