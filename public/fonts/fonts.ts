import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

export const tusker = localFont({
  src: "./Tusker.otf",
  variable: "--font-tusker",
  display: "swap",
});

export const editorial = localFont({
  src: "./Editorial.otf",
  variable: "--font-editorial",
  display: "swap",
});

export const montreal = localFont({
  src: [
    {
      path: "./Montreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Montreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-montreal",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});