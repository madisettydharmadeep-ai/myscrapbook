'use client';
import React from 'react';
import { Image as ImageIcon, Type, X, Gift, Clock, Mic2, MapPinned } from 'lucide-react';

export default function ComponentSelector({ onSelect, onClose }) {
  return (
        <div className="fixed left-0 top-0 bottom-0 z-[9999] flex flex-col w-72 bg-white border-r border-gray-100 shadow-2xl p-6 animate-in slide-in-from-left duration-300">
             <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-50 hover:text-black rounded-full transition-colors"
                title="Close"
            >
                <X className="w-5 h-5" />
            </button>
            
            <header className="mb-8 mt-2">
                <h2 className="text-2xl font-bold tracking-tight mb-2 text-gray-900">Add Content</h2>
                <div className="h-1 w-12 bg-rose-400 rounded-full"></div>
            </header>

            <div className="flex flex-col gap-4">
                 <button 
                    onClick={() => onSelect('image')}
                    className="group relative overflow-hidden bg-gray-50 border border-gray-200 p-5 rounded-2xl text-left hover:bg-white hover:border-rose-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <ImageIcon className="w-24 h-24" />
                    </div>
                    <div className="bg-white text-gray-900 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform">
                        <ImageIcon className="w-6 h-6 text-rose-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Photo</h3>
                    <p className="text-xs font-medium text-gray-500 mt-1 group-hover:text-gray-600">Upload or add images</p>
                 </button>

                 <button 
                    onClick={() => onSelect('text')}
                    className="group relative overflow-hidden bg-gray-50 border border-gray-200 p-5 rounded-2xl text-left hover:bg-white hover:border-yellow-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Type className="w-24 h-24" />
                    </div>
                    <div className="bg-white text-gray-900 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                        <Type className="w-6 h-6 text-yellow-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Text</h3>
                    <p className="text-xs font-medium text-gray-500 mt-1 group-hover:text-gray-600">Add stories & notes</p>
                 </button>

                 <button 
                    onClick={() => onSelect('gift')}
                    className="group relative overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 p-5 rounded-2xl text-left hover:bg-white hover:border-pink-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Gift className="w-24 h-24" />
                    </div>
                    <div className="bg-gradient-to-br from-pink-400 to-purple-500 text-white w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform">
                        <Gift className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Gift</h3>
                    <p className="text-xs font-medium text-gray-500 mt-1 group-hover:text-gray-600">Hidden surprise to reveal</p>
                 </button>

                 <div className="grid grid-cols-3 gap-2">
                    {[
                        { icon: Clock, label: 'Timeline' },
                        { icon: Mic2, label: 'Voice' },
                        { icon: MapPinned, label: 'Places' },
                    ].map(({ icon: Icon, label }) => (
                        <div key={label} className="rounded-2xl border border-gray-100 bg-gray-50 px-3 py-4 text-center opacity-60">
                            <Icon className="mx-auto mb-2 h-5 w-5 text-gray-300" />
                            <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{label}</p>
                        </div>
                    ))}
                 </div>
            </div>

            <div className="mt-auto pt-6 text-center border-t border-gray-50">
                 <p className="text-xs font-medium text-gray-300">New components coming soon</p>
            </div>
        </div>
  );
}
