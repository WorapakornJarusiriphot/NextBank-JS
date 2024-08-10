import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextBank - Banking Made Easy",
  description:
    "Manage your finances with NextBank: Deposit, Withdraw, Transfer, and View Transaction History effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 dark:bg-blue-800 p-6 shadow-lg">
          <Link href="/">
            <h1 className="text-white text-4xl font-bold text-center">
              Welcome to NextBank
            </h1>
            <p className="text-center text-white mt-2">
              Secure and efficient banking at your fingertips.
            </p>
          </Link>
        </header>
        {children}
        <footer className="bg-blue-600 dark:bg-blue-800 p-4">
          <p className="text-center text-white">
            &copy; 2024 NextBank. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
