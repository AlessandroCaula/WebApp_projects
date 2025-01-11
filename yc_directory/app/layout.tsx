import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Importing local Fonts.
const workSans = localFont({
  src: [
    {
      // Pointing to the path of the specific font.
      path: './fonts/WorkSans-Black.ttf',
      weight: '900',
      style: 'normal'
    },
    {
      // Pointing to the path of the specific font.
      path: './fonts/WorkSans-ExtraBold.ttf',
      // Changing the weight of the font. 
      weight: '800',
      style: 'normal'
    },
    {
      // Pointing to the path of the specific font.
      path: './fonts/WorkSans-Bold.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      // Pointing to the path of the specific font.
      path: './fonts/WorkSans-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      // Pointing to the path of the specific font.
      path: './fonts/WorkSans-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      // Pointing to the path of the specific font.
      path: './fonts/WorkSans-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      // Pointing to the path of the specific font.
      path: './fonts/WorkSans-Thin.ttf',
      weight: '200',
      style: 'normal'
    },
    {
      // Pointing to the path of the specific font.
      path: './fonts/WorkSans-ExtraLight.ttf',
      weight: '100',
      style: 'normal'
    },
  ],
  variable: '--font-work-sans',
})

export const metadata: Metadata = {
  title: "YC Directory",
  description: "Pitch, Vote and Grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={workSans.variable}
      >
        {children}
      </body>
    </html>
  );
}
