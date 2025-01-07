import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Appointment Booking",
  description: "Hospital appointment booking system",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={`${inter.className} bg-gray-100`}>
        {/* Main Content */}
        <main className="container min-h-screen">
          <div className="flex min-h-full">{children}</div>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
