import SocketHandler from "../components/SocketHandler/SocketHandler";
import UserProvider from "../components/UserProvider/UserProvider";
import SocketProvider from "../contexts/socket/SocketProvider";
import ReduxProvider from "../providers/ReduxProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Provider } from "../components/ui/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Huddle - Connect, Share, and Engage",
  description:
    "Huddle is a social media platform where you can create channels, share ideas, and connect with people in meaningful conversations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <SocketProvider>
            <ReduxProvider>
              <UserProvider>
                <SocketHandler>{children}</SocketHandler>
              </UserProvider>
            </ReduxProvider>
          </SocketProvider>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
