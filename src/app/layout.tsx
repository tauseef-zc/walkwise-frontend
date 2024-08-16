import Footer from "@/components/common/Footer";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import "@/assets/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import Header from "@/components/common/Header";
import StoreProvider from "@/services/redux/storeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthCheck from "@/components/auth/AuthCheck";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "WalkWise",
  description: "A Tour Booking Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <StoreProvider>
        <AuthCheck>
          <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
            <Header className="shadow-sm dark:border-b dark:border-neutral-700" />
            {children}
            <Footer />
            <ToastContainer position="top-right" autoClose={2500} />
          </body>
        </AuthCheck>
      </StoreProvider>
    </html>
  );
}
