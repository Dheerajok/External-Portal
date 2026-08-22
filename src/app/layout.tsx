import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ECO-SMART | National Authority & Partner Portal',
  description: 'National-scale environmental collaboration and execution infrastructure connecting government authorities, municipalities, recyclers, NGOs, businesses, and environmental telemetry.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
