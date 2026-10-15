"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          
          {/* زر المنيو للموبايل */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none transition"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">فتح القائمة</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* اسم الموقع / اللوجو في المنتصف */}
          <div className="flex-1 md:flex-initial text-center md:text-right">
            <Link href="/" className="text-2xl font-bold tracking-wider hover:text-blue-100 transition inline-block">
              Edu Track
            </Link>
          </div>

          {/* روابط التنقل للشاشات الكبيرة */}
          <nav className="hidden md:flex space-x-12 space-x-reverse gap-10">
            <Link href="/" className="text-white hover:text-blue-200 font-medium transition">
              الرئيسية
            </Link>
            <Link href="/about" className="text-white hover:text-blue-200 font-medium transition">
              من نحن
            </Link>
          </nav>

          {/* عنصر فارغ للموازنة في الموبايل */}
          <div className="w-10 md:hidden"></div>

        </div>
      </div>

      {/* القائمة الخاصة بالشاشات الصغيرة (Mobile Menu) */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 border-t border-blue-500" id="mobile-menu">
          <div className="px-4 pt-3 pb-5 space-y-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-800 transition"
            >
              الرئيسية
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-800 transition"
            >
              من نحن
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}