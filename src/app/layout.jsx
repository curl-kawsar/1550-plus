import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "College Mastermind - Your Gateway to College Success",
  description: "Join thousands of students on their journey to academic excellence with personalized college guidance and support.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <main className="min-h-screen">{children}</main>
          <Toaster position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
