'use client';
import Image from 'next/image';

export default function SupportButton({ iconOnly = false, size = 'default' }) {
  const isLarge = size === 'large';

  return (
    <a 
      href="https://ko-fi.com/kazama_studiooo" 
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2.5 rounded-full border-2 border-[#ffbdd5] bg-[#fff4f8] font-black text-[#5c4351] shadow-[0_4px_0_0_#f8b6ca] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_6px_0_0_#f8b6ca] active:translate-y-0.5 active:shadow-[0_2px_0_0_#f8b6ca] ${
        isLarge ? 'px-7 py-3.5 text-lg' : 'px-3 py-2 sm:px-4'
      }`}
    >
      <div className={`flex items-center justify-center rounded-full bg-white shadow-inner shadow-rose-100 transition-transform group-hover:rotate-[-6deg] group-hover:scale-110 ${
        isLarge ? 'h-8 w-8' : 'h-7 w-7'
      }`}>
        <Image
          src="/kofi_symbol.png"
          alt=""
          width={24}
          height={24}
          className={`${isLarge ? 'h-6 w-6' : 'h-5 w-5'} object-contain`}
        />
      </div>
      <span className={`${isLarge ? 'text-lg' : 'text-sm'} tracking-tight ${iconOnly ? 'hidden sm:inline' : ''}`}>
        Support me on Ko-fi
      </span>
    </a>
  );
}
