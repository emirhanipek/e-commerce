import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-black tracking-widest">404</h1>
          <div className="bg-[#b8860b] px-2 text-sm rounded rotate-12 absolute">
            Sayfa Bulunamadı
          </div>
        </div>
        <div className="mt-8">
          <div className="text-black text-2xl font-bold mb-4">
            Aradığınız sayfaya ulaşılamıyor
          </div>
          <p className="text-gray-600 mb-8">
            Aradığınız sayfa taşınmış, kaldırılmış veya hiç var olmamış olabilir.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-md shadow-md hover:bg-[#b8860b] transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
        <div className="mt-12 border-t pt-6 border-gray-200">
          <div className="flex justify-center space-x-4">
            <Link to="/products" className="text-[#b8860b] hover:text-black">
              Ürünleri Keşfet
            </Link>
            <span className="text-gray-400">|</span>
            <Link to="/contact" className="text-[#b8860b] hover:text-black">
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
