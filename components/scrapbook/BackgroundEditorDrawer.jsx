'use client';
import React, { useState } from 'react';
import { X, Check, ChevronDown } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';


// Helper to extract raw URL from CSS url() wrapper
const getRawAppBgUrl = (bg) => {
  if (!bg || bg === 'none') return '';
  const match = bg.match(/^url\(['"]?(.*?)['"]?\)$/);
  return match ? match[1] : bg;
};

// Collapsible Section Component
function AccordionSection({ title, icon, isOpen, onToggle, selectedLabel, children }) {
  return (
    <div className={`border transition-all duration-300 rounded-xl overflow-hidden ${isOpen ? 'border-gray-200 shadow-sm bg-white' : 'border-transparent bg-gray-50'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <div className="text-left">
            <h3 className="font-bold text-sm tracking-wide text-gray-900">{title}</h3>
            {!isOpen && selectedLabel && (
              <span className="text-xs text-gray-500 font-medium">{selectedLabel}</span>
            )}
          </div>
        </div>
        <ChevronDown 
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function BackgroundEditorDrawer({ bgPattern, setBgPattern, bgColor, setBgColor, pageBorder, setPageBorder, soundId, setSoundId, animId, setAnimId, bookStyle, setBookStyle, appBackground, setAppBackground, pageBgImage, setPageBgImage, pageBgOpacity, setPageBgOpacity, bgOptions, colorOptions, borderOptions, soundOptions, animOptions, bookStyleOptions, onClose }) {
  // Track which section is open (only one at a time)
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  // Get current selection labels
  const getSelectedTextureLabel = () => bgOptions?.find(opt => opt.id === bgPattern)?.label || 'Grid';
  const getSelectedColorLabel = () => colorOptions?.find(opt => opt.value === bgColor)?.label || 'Cream';
  const getSelectedBorderLabel = () => borderOptions?.find(opt => opt.id === pageBorder)?.label || 'None';
  const getSelectedAnimLabel = () => animOptions?.find(opt => opt.id === animId)?.label || 'Classic Flip';
  const getSelectedSoundLabel = () => soundOptions?.find(opt => opt.id === soundId)?.label || 'Silent';

  return (
    <div className="fixed left-0 top-0 bottom-0 z-[9999] flex flex-col w-80 bg-white border-r border-gray-100 shadow-2xl p-6 animate-in slide-in-from-left duration-300 overflow-y-auto">
             <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-50 hover:text-black rounded-full transition-colors"
                title="Close"
            >
                <X className="w-5 h-5" />
            </button>
            
            <header className="mb-6 mt-2">
                <h2 className="text-2xl font-bold tracking-tight mb-2 text-gray-900">Page Theme</h2>
                <div className="h-1 w-12 bg-rose-400 rounded-full"></div>
                <p className="text-gray-500 text-sm mt-3 font-medium leading-relaxed">Customize the look and feel of your scrapbook pages.</p>
            </header>

            <div className="flex flex-col gap-3 pb-10">

                {/* APP BACKGROUND SECTION */}
                <AccordionSection
                  title="App Background Image"
                  icon="🖼️"
                  isOpen={openSection === 'appBg'}
                  onToggle={() => toggleSection('appBg')}
                  selectedLabel={appBackground && appBackground !== 'none' ? 'Custom Image' : 'None'}
                >
                  <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Image URL</label>
                          <div className="flex gap-2">
                              <input
                                type="text"
                                value={appBackground && appBackground !== 'none' ? getRawAppBgUrl(appBackground) : ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (!val || val.trim() === '') {
                                    setAppBackground('none');
                                  } else {
                                    setAppBackground(`url("${val.trim()}")`);
                                  }
                                }}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                                placeholder="Paste image URL..."
                              />
                               {appBackground && appBackground !== 'none' && (
                                  <button 
                                      onClick={() => setAppBackground('none')}
                                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-gray-200"
                                      title="Clear Image"
                                  >
                                      <X className="w-5 h-5" />
                                  </button>
                               )}
                          </div>
                          <p className="text-[10px] text-gray-400">
                             Paste a direct link to an image (ending in .png, .jpg, etc). This will appear as the background of the entire app.
                          </p>
                      </div>
                  </div>
                </AccordionSection>

                {/* CUSTOM PAGE BACKGROUND SECTION */}
                <AccordionSection
                  title="Page Background Image"
                  icon="🖼️"
                  isOpen={openSection === 'pageBgImage'}
                  onToggle={() => toggleSection('pageBgImage')}
                  selectedLabel={pageBgImage ? 'Custom Image' : 'None'}
                >
                  <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Image URL</label>
                          <div className="flex gap-2">
                              <input
                                type="text"
                                value={pageBgImage || ''}
                                onChange={(e) => setPageBgImage(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                                placeholder="Paste image URL..."
                              />
                               {pageBgImage && (
                                  <button 
                                      onClick={() => setPageBgImage(null)}
                                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-gray-200"
                                      title="Clear Image"
                                  >
                                      <X className="w-5 h-5" />
                                  </button>
                               )}
                          </div>
                          <p className="text-[10px] text-gray-400">
                             Paste a direct link to an image (ending in .png, .jpg, etc). This will appear on all pages.
                          </p>
                      </div>

                      {pageBgImage && (
                          <div className="flex flex-col gap-2">
                               <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Opacity</label>
                                    <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">{Math.round(pageBgOpacity * 100)}%</span>
                               </div>
                              <input
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.05"
                                value={pageBgOpacity}
                                onChange={(e) => setPageBgOpacity(parseFloat(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-400"
                              />
                          </div>
                      )}
                  </div>
                </AccordionSection>
                
                {/* BOOK STYLE SECTION */}
                {bookStyleOptions && (
                  <AccordionSection
                    title="Book Style"
                    icon="📚"
                    isOpen={openSection === 'bookStyle'}
                    onToggle={() => toggleSection('bookStyle')}
                    selectedLabel={bookStyleOptions?.find(opt => opt.id === bookStyle)?.label}
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {bookStyleOptions.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setBookStyle(opt.id)}
                          className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                            bookStyle === opt.id 
                              ? 'border-rose-400 bg-rose-50 text-rose-700 shadow-sm' 
                              : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className={`w-8 h-10 bg-white rounded shadow-sm border border-gray-100 ${opt.preview}`}></div>
                          <span className="font-bold text-xs">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </AccordionSection>
                )}

                {/* TEXTURES SECTION */}
                <AccordionSection
                  title="Paper Texture"
                  icon="📜"
                  isOpen={openSection === 'texture'}
                  onToggle={() => toggleSection('texture')}
                  selectedLabel={getSelectedTextureLabel()}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {bgOptions.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setBgPattern(opt.id)}
                        className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-2 aspect-square transition-all ${
                          bgPattern === opt.id 
                            ? 'border-rose-400 bg-rose-50 text-rose-700 shadow-sm' 
                            : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div 
                          className="w-full flex-1 border border-black/5 rounded-lg mb-1 overflow-hidden"
                          style={{
                            background: opt.value === 'none' ? '#f5f5f5' : (opt.value.includes('url') ? opt.value : undefined),
                            backgroundColor: '#FAFAFA',
                          }}
                        >
                          {opt.id === 'dots' && <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>}
                          {opt.id === 'lines' && <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 10px' }}></div>}
                        </div>
                        <span className="font-bold text-xs">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </AccordionSection>

                {/* BORDERS SECTION */}
                <AccordionSection
                  title="Page Border"
                  icon="🖼️"
                  isOpen={openSection === 'border'}
                  onToggle={() => toggleSection('border')}
                  selectedLabel={getSelectedBorderLabel()}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {borderOptions?.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setPageBorder(opt.id)}
                        className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-2 aspect-square transition-all ${
                          pageBorder === opt.id 
                            ? 'border-rose-400 bg-rose-50 text-rose-700 shadow-sm' 
                            : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div 
                          className={`w-full flex-1 mb-1 bg-[#FAFAFA] rounded-lg ${opt.preview}`}
                          style={opt.id === 'cute-rainbow' ? { backgroundImage: 'linear-gradient(to right, #ff9999, #ffff99, #99ff99, #99ffff, #9999ff, #ff99ff)' } : {}}
                        >
                        </div>
                        <span className="font-bold text-xs">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </AccordionSection>

                {/* COLORS SECTION */}
                <AccordionSection
                  title="Paper Color"
                  icon="🎨"
                  isOpen={openSection === 'color'}
                  onToggle={() => toggleSection('color')}
                  selectedLabel={getSelectedColorLabel()}
                >
                  <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
                    {/* Custom Color Picker */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <input
                        type="color"
                        value={bgColor.startsWith('#') ? bgColor : '#FFFDF5'}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-14 h-14 cursor-pointer rounded-lg border-0 bg-transparent p-0 overflow-hidden shadow-sm"
                        title="Pick a custom color"
                      />
                      <div className="flex-1">
                        <label className="text-xs font-bold text-gray-500 mb-1 block uppercase tracking-wide">Custom Hex</label>
                        <input
                          type="text"
                          value={bgColor.startsWith('#') ? bgColor.toUpperCase() : bgColor}
                          onChange={(e) => {
                            const val = e.target.value;
                            // Allow typing hex
                            if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                              setBgColor(val);
                            }
                          }}
                          onBlur={(e) => {
                             // Validate on blur
                             if(!/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                                 // fallback to white if invalid
                                 // setBgColor('#FFFDF5'); 
                                 // Actually better to just leave it or reset to last valid? 
                                 // For now let's just ensure it starts with #
                             }
                          }}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wide px-1">Presets</div>
                    <div className="flex flex-col gap-2">
                      {colorOptions.map(opt => (
                        <button 
                          key={opt.id}
                          onClick={() => setBgColor(opt.value)}
                          className={`flex items-center gap-4 p-3 border rounded-xl transition-all ${
                            bgColor === opt.value
                              ? 'border-rose-400 bg-rose-50 text-rose-700 shadow-sm'
                              : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >   
                          <div 
                            className="w-8 h-8 rounded-full border border-black/10 shadow-sm flex-shrink-0"
                            style={{ backgroundColor: opt.value }}
                          ></div>
                          <span className="font-bold text-xs">{opt.label}</span>
                          {bgColor === opt.value && <Check className="ml-auto w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </AccordionSection>

                {/* ANIMATION SECTION - Only show if there are multiple options */}
                {animOptions && animOptions.length > 1 && (
                <AccordionSection
                  title="Flip Style"
                  icon="📖"
                  isOpen={openSection === 'animation'}
                  onToggle={() => toggleSection('animation')}
                  selectedLabel={getSelectedAnimLabel()}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {animOptions?.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setAnimId(opt.id)}
                        className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                          animId === opt.id 
                            ? 'border-rose-400 bg-rose-50 text-rose-700 shadow-sm' 
                            : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-2xl">{opt.icon}</span>
                        <span className="font-bold text-xs">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </AccordionSection>
                )}

                {/* SOUNDS SECTION */}
                <AccordionSection
                  title="Ambience"
                  icon="🔊"
                  isOpen={openSection === 'sound'}
                  onToggle={() => toggleSection('sound')}
                  selectedLabel={getSelectedSoundLabel()}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {soundOptions?.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setSoundId(opt.id);
                          // Sound preview is now handled by centralized audio context
                          // The playSound will be triggered on actual use, not preview
                        }}
                        className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                          soundId === opt.id 
                            ? 'border-rose-400 bg-rose-50 text-rose-700 shadow-sm' 
                            : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-2xl">{opt.id === 'none' ? '🔇' : '🔊'}</span>
                        <span className="font-bold text-xs">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </AccordionSection>

            </div>
            
             <div className="mt-auto pt-4 text-center border-t border-gray-100">
                 <button 
                    onClick={onClose}
                    className="w-full py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors"
                 >
                    Apply Theme
                 </button>
            </div>
    </div>
  );
}
