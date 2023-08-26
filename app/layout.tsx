import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import Modal from "./components/modals/Modal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Air BnB",
  description: "Airbnb clone website using full stack next",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Modal title="Hello world" isOpen />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
