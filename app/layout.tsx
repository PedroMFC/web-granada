import type { Metadata } from 'next';
import './ui/globals.css';
import { mukta } from './ui/fonts';

export const metadata: Metadata = {
    title: 'Web Granada',
    description: 'Discover the beauty of Granada',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${mukta.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
