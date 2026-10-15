import Footer from '../componant/Footer';
import Header from '../componant/Header';
import './globals.css';

export const metadata = {
  title: 'Edu Track',
  description: 'منصة تتبع التعليم والتطوير',
};

export default function RootLayout({ children } : {children : React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex flex-col min-h-screen bg-white text-gray-900">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}