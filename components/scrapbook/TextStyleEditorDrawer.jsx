'use client';
import React, { useState, useEffect } from 'react';
import { X, Check, Palette, Type } from 'lucide-react';

// Font style presets - each uses the SAME font for heading and body (cleaner look)
const FONT_STYLES = [
  { 
    id: 'classic', 
    label: 'Classic', 
    emoji: '📖',
    headingFont: 'var(--font-space-grotesk)', 
    bodyFont: 'var(--font-space-grotesk)',
    headingWeight: '800',
    bodyWeight: '400'
  },
  { 
    id: 'handwritten', 
    label: 'Handwritten', 
    emoji: '✏️',
    headingFont: 'var(--font-caveat)', 
    bodyFont: 'var(--font-caveat)',
    headingWeight: '700',
    bodyWeight: '400'
  },
  { 
    id: 'retro', 
    label: 'Retro', 
    emoji: '🎞️',
    headingFont: 'var(--font-cormorant)', 
    bodyFont: 'var(--font-cormorant)',
    headingWeight: '700',
    bodyWeight: '400'
  },
  { 
    id: 'soft-note', 
    label: 'Soft Note', 
    emoji: '♡',
    headingFont: 'var(--font-caveat)', 
    bodyFont: 'var(--font-space-grotesk)',
    headingWeight: '700',
    bodyWeight: '500'
  },
  { 
    id: 'storybook', 
    label: 'Storybook', 
    emoji: '✦',
    headingFont: 'var(--font-cormorant)', 
    bodyFont: 'var(--font-space-grotesk)',
    headingWeight: '800',
    bodyWeight: '400'
  },
];

// Preset Colors
const COLOR_PRESETS = [
  '#FFF7ED', '#FFF1F2', '#FDF2F8', '#F5F3FF',
  '#EFF6FF', '#ECFEFF', '#F0FDF4', '#FEFCE8',
  '#000000', '#1F2937', '#374151', '#4B5563', 
  '#EF4444', '#F97316', '#EAB308', '#22C55E',
  '#14B8A6', '#3B82F6', '#8B5CF6', '#EC4899',
  '#991B1B', '#9A3412', '#854D0E', '#166534',
  '#115E59', '#1E40AF', '#5B21B6', '#9D174D',
  '#FECACA', '#FED7AA', '#FEF08A', '#BBF7D0',
  '#A5F3FC', '#BFDBFE', '#DDD6FE', '#FBCFE8',
  '#FFFFFF', '#F3F4F6', '#E5E7EB', '#D1D5DB',
];

export default function TextStyleEditorDrawer({ 
  currentFontStyle, 
  currentBgColor, 
  currentTextColor,
  onFontChange, 
  onColorChange, 
  onTextColorChange,
  onClose,
  isCover = false
}) {
  const [activeTab, setActiveTab] = useState('font');
  const [colorMode, setColorMode] = useState(isCover ? 'background' : 'text'); // text or background
  const [localColor, setLocalColor] = useState(isCover ? currentBgColor : (currentTextColor || '#000000'));
  
  // LOCAL state for selected font (updates immediately on click)
  const [selectedFont, setSelectedFont] = useState(currentFontStyle || 'classic');

  // Sync if prop changes
  useEffect(() => {
    setSelectedFont(currentFontStyle || 'classic');
  }, [currentFontStyle]);

  const handleFontSelect = (fontId) => {
    setSelectedFont(fontId);
    onFontChange && onFontChange(fontId);
  };

  const handleColorChange = (color) => {
    setLocalColor(color);
    if (colorMode === 'background') {
        onColorChange && onColorChange(color);
    } else {
        onTextColorChange && onTextColorChange(color);
    }
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 z-[9999] flex flex-col w-80 bg-white border-r border-gray-100 shadow-2xl p-6 animate-in slide-in-from-left duration-300">
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-50 hover:text-black rounded-full transition-colors"
        title="Close"
      >
        <X className="w-5 h-5" />
      </button>

      <header className="mb-6 mt-2">
        <h2 className="text-2xl font-bold tracking-tight mb-2 text-gray-900">Text Style</h2>
        <div className="h-1 w-12 bg-rose-400 rounded-full"></div>
      </header>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-6 border-b border-gray-100 pb-1">
        <button
          onClick={() => setActiveTab('font')}
          className={`flex items-center gap-2 px-4 py-2 font-medium text-sm transition-all border-b-2 ${
            activeTab === 'font' 
              ? 'border-black text-black' 
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Type className="w-4 h-4" />
          Fonts
        </button>
        <button
          onClick={() => setActiveTab('color')}
          className={`flex items-center gap-2 px-4 py-2 font-medium text-sm transition-all border-b-2 ${
            activeTab === 'color' 
              ? 'border-black text-black' 
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Palette className="w-4 h-4" />
          Color
        </button>
      </div>

      {/* Font Styles Tab */}
      {activeTab === 'font' && (
        <div className="flex flex-col gap-3 overflow-y-auto flex-1 pb-4">
          {FONT_STYLES.map((font) => (
            <button
              key={font.id}
              onClick={() => handleFontSelect(font.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedFont === font.id 
                  ? 'border-rose-400 bg-rose-50/50 shadow-sm ring-1 ring-rose-400' 
                  : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{font.emoji}</span>
                <span className={`font-bold text-sm ${selectedFont === font.id ? 'text-rose-600' : 'text-gray-700'}`}>{font.label}</span>
                {selectedFont === font.id && (
                  <Check className="ml-auto w-5 h-5 text-rose-500" />
                )}
              </div>
              <div 
                className="text-2xl truncate text-gray-900"
                style={{ 
                  fontFamily: font.headingFont,
                  fontWeight: font.headingWeight
                }}
              >
                Hello World
              </div>
              <div 
                className="text-sm text-gray-500 truncate mt-1"
                style={{ 
                  fontFamily: font.bodyFont,
                  fontWeight: font.bodyWeight
                }}
              >
                The quick brown fox jumps over...
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Color Tab */}
      {activeTab === 'color' && (
        <div className="flex flex-col gap-4 overflow-y-auto flex-1 pb-4">
          
          {/* If Cover, show toggle for Text vs Background */}
          {isCover && (
              <div className="flex bg-gray-100 p-1 rounded-lg mb-2">
                  <button 
                    onClick={() => {
                        setColorMode('text');
                        setLocalColor(currentTextColor || '#000000');
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${colorMode === 'text' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Text Color
                  </button>
                  <button 
                    onClick={() => {
                        setColorMode('background');
                        setLocalColor(currentBgColor || '#000000');
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${colorMode === 'background' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Background
                  </button>
              </div>
          )}
          {/* Color Wheel / Native Picker */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <input
              type="color"
              value={localColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-14 h-14 cursor-pointer rounded-lg border-0 bg-transparent p-0 overflow-hidden shadow-sm"
              title="Pick a color"
            />
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-500 mb-1 block uppercase tracking-wide">HEX Code</label>
              <input
                type="text"
                value={localColor.toUpperCase()}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                    handleColorChange(val);
                  }
                }}
                onBlur={(e) => {
                  let val = e.target.value;
                  if (!/^#[0-9A-Fa-f]{6}$/.test(val)) {
                    handleColorChange('#000000');
                  }
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Preset Colors */}
          <div>
            <div className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">Preset Colors</div>
            <div className="grid grid-cols-6 gap-2">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-9 h-9 rounded-full border transition-all hover:scale-110 ${
                    localColor === color 
                      ? 'border-gray-300 ring-2 ring-rose-400 ring-offset-2' 
                      : 'border-black/5 hover:border-black/20 hover:shadow-sm'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-gray-100">
        <button 
          onClick={onClose}
          className="w-full py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}
