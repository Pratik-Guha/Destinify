
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import  ClientOnly from "./components/ClientOnly";
import { RegisterModel } from "./components/models/RegisterModel";
import { ToastProvider } from "./providers/ToastProvider";
import { LoginModel } from "./components/models/LoginModel";
import {getCurrentUser} from "./actions/getCurrentUser";
import { Navbar } from "./components/navbar/Navbar";
import { RentModel } from "./components/models/RentModel";
import SearchModel from "./components/models/SearchModel";
import ThemeToggleButton from "./toggle";
import ChatbaseWidget from "./components/ChatBot";


const nunito = Nunito({
  
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Tour App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    
    <html lang="en">
      <body
        className={`${nunito.className}bg-gray-600  dark:bg-neutral-700 text-black dark:text-white  antialiased`}
      >
        
        <ClientOnly>
          <ToastProvider/>
          <SearchModel/>
          <RentModel/>
          <LoginModel/>
          <RegisterModel/>
        <Navbar currentUser={currentUser}/>
        <ThemeToggleButton/>
        </ClientOnly>
        
        <div className="pb-20 pt-28">
        {children}
        <ChatbaseWidget />
        </div>
      </body>
    </html>
     
  );
}
