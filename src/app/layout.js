import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
    title: "PYTH Airdrop Checker",
    description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
