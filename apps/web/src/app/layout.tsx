import "styles/global.css";

import { Inter } from "next/font/google";

import { ConnectkitProvider } from "utils/connectkit";
import { BASE_URL } from "constants/urls";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Hom3page",
  description: "Home of web3",
  creator: "Elliott and Ray",
  publisher: "Elliott and Ray",
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    url: BASE_URL,
    title: "Hom3page",
    description: "Home of web3",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Hom3page",
      },
    ],
    locale: "en_UK",
    type: "website",
  },
  generator: "Next.js",
  applicationName: "Hom3page",
  keywords: ["web3", "bApp", "blockchain", "web3 home"],
  manifest: `./manifest.json`,
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
        </ConnectkitProvider>
      </body>
    </html>
  );
}
