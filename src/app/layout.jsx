import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/QueryProvider";
import LayoutContent from "@/components/LayoutContent";

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
          <LayoutContent>{children}</LayoutContent>
          <Toaster position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
