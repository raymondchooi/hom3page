import "styles/global.css";

import { Inter } from "next/font/google";

import { Navbar } from "components";
import { ConnectkitProvider } from "utils/connectkit";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Hom3page bApps",
  description: "bApp market for hom3page",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} relative`}>
        <ConnectkitProvider>
          <>{children}</>
          <Navbar />
        </ConnectkitProvider>
      </body>
    </html>
  );
}
