'use client';
import React, { useState } from 'react';
import { Plus, Trash2, Smile } from 'lucide-react';
import ComponentSelector from './ComponentSelector';
import ImageElement from './ImageElement';
import TextElement from './TextElement';
import CoverElement from './CoverElement';
import GiftElement from './GiftElement';
import Sticker from './Sticker';

export default function Page({ data, onUpdate, onUpdateStickers, side, isCover, readOnly, bgPattern, bgColor, pageBorder, pageBgImage, pageBgOpacity, onOpenDrawer }) {
  // data: { id, type, content }
  const [showSelector, setShowSelector] = useState(false);

  const handleSelectType = (type) => {
    onUpdate(type, null); // Set type, init content as null
    setShowSelector(false);
  };

  const handleContentUpdate = (newContent) => {
    onUpdate(data.type, newContent);
  };

  // Sticker Logic
  const stickers = data.stickers || [];
  const [selectedStickerId, setSelectedStickerId] = useState(null);
  const pageRef = React.useRef(null);

  const handleStickerUpdate = (id, updates) => {
      const newStickers = stickers.map(s => s.id === id ? { ...s, ...updates } : s);
      onUpdateStickers(newStickers);
  };

  const handleAddSticker = (url) => {
      const nextStickerNumber = stickers.length + 1;
      const newSticker = {
          id: `sticker-${nextStickerNumber}-${url.split('/').pop() || 'item'}`,
          url,
          x: 50,
          y: 50,
          rotation: ((nextStickerNumber % 5) - 2) * 4,
          scale: 1,
          zIndex: stickers.length + 10
      };
      onUpdateStickers([...stickers, newSticker]);
  };

  const handleLayerChange = (id, direction) => {
    // Simple z-index swapping or reordering logic
    // For now, simpler approach: just reorder array (last is top)
    const index = stickers.findIndex(s => s.id === id);
    if (index === -1) return;
    
    const newStickers = [...stickers];
    if (direction === 'forward' && index < stickers.length - 1) {
        [newStickers[index], newStickers[index + 1]] = [newStickers[index + 1], newStickers[index]];
    } else if (direction === 'backward' && index > 0) {
        [newStickers[index], newStickers[index - 1]] = [newStickers[index - 1], newStickers[index]];
    }
    
    onUpdateStickers(newStickers);
  };

  // Deselect sticker when clicking bg
  const handleBgClick = () => {
      setSelectedStickerId(null);
  };

  // Background Styles configuration
  const getBgStyle = () => {
      if (isCover) return {}; // Covers handle their own bg or use default
      switch (bgPattern) {
          case 'dots': return { backgroundImage: 'radial-gradient(#ccc 1px, transparent 1px)', backgroundSize: '20px 20px' };
          case 'lines': return { backgroundImage: 'repeating-linear-gradient(transparent, transparent 29px, #ccc 29px, #ccc 30px)', backgroundSize: '100% 100%' };
          case 'graphy': return { backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)', backgroundSize: '20px 20px' };
          case 'graphy': return { backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)', backgroundSize: '20px 20px' };
          case 'rabbit': return { backgroundImage: 'url("/svg/rabbit1.svg")', backgroundSize: '120px 120px' };
          case 'giraffe': return { backgroundImage: 'url("/svg/giraffe1.svg")', backgroundSize: '120px 120px' };
          case 'plain': return {};
          default: return { backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 30px' };
      }
  };

  const getBorderClass = (border) => {
      switch(border) {
          case 'solid': return 'border-2 border-black';
          case 'dashed': return 'border-2 border-dashed border-black';
          case 'cute-flower': return 'border-[8px] border-pink-300 border-dashed';
          default: return '';
      }
  };



  return (
    <div 
        ref={pageRef}
        onClick={handleBgClick}
        className={`w-full h-full relative overflow-hidden group ${isCover ? 'bg-gray-100' : ''}`}
        style={{ backgroundColor: isCover ? undefined : (bgColor || '#FFFDF5') }}
    >
        {/* Background Texture */}
        {!isCover && bgPattern !== 'plain' && (
            <div className="absolute inset-0 opacity-40 pointer-events-none" style={getBgStyle()}></div>
        )}

        {/* Custom Page Background */}
        {!isCover && pageBgImage && (
             <div 
                className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
                style={{ 
                    backgroundImage: `url("${pageBgImage}")`, 
                    opacity: pageBgOpacity !== undefined ? pageBgOpacity : 0.8
                }}
            />
        )}

        {/* Page Border Overlay */}
        {!isCover && pageBorder && pageBorder !== 'none' && (
            <div 
                className={`absolute inset-1.5 md:inset-2 pointer-events-none z-20 ${getBorderClass(pageBorder)}`} 
             ></div>
        )}

        {/* EMPTY STATE */}
        {data.type === 'empty' && (
            <div className="w-full h-full flex items-center justify-center relative z-10">
                {!readOnly && (
                    <button 
                        onClick={() => onOpenDrawer('COMPONENT', {}, handleSelectType, 'Add Content')}
                        className={`w-16 h-16 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center text-gray-300 hover:border-black hover:text-black hover:scale-110 transition-all ${isCover ? 'w-24 h-24 border-black text-black opacity-50' : ''}`}
                    >
                        <Plus className={`${isCover ? 'w-12 h-12' : 'w-8 h-8'}`} />
                    </button>
                )}
                {isCover && !readOnly && (
                    <div className="absolute bottom-10 text-gray-400 font-bold uppercase tracking-widest text-sm pointer-events-none">
                        {side === 'left' ? 'Front Cover' : 'Back Cover'}
                    </div>
                )}
            </div>
        )}

        {/* FILLED STATE */}
        <div className="relative z-10 w-full h-full">
            {/* Image type */}
            {data.type === 'image' && (
                <ImageElement content={data.content} onUpdate={handleContentUpdate} isCover={isCover} readOnly={readOnly} onOpenDrawer={onOpenDrawer} />
            )}

            {/* Text type (with background color for covers) */}
            {data.type === 'text' && (
                <TextElement content={data.content} onUpdate={handleContentUpdate} isCover={isCover} readOnly={readOnly} onOpenDrawer={onOpenDrawer} />
            )}

            {/* Cover type (image + text overlay) - new option */}
            {data.type === 'cover' && (
                <CoverElement content={data.content} onUpdate={handleContentUpdate} side={side} readOnly={readOnly} onOpenDrawer={onOpenDrawer} />
            )}

            {/* Gift type (hidden surprise) */}
            {data.type === 'gift' && (
                <GiftElement content={data.content} onUpdate={handleContentUpdate} isCover={isCover} readOnly={readOnly} onOpenDrawer={onOpenDrawer} />
            )}
        </div>

        {/* STICKERS LAYER */}
        {stickers.map((sticker, index) => (
            <Sticker 
                key={sticker.id}
                data={{...sticker, zIndex: index + 10}} 
                isSelected={selectedStickerId === sticker.id}
                onSelect={setSelectedStickerId}
                onUpdate={handleStickerUpdate}
                onRemove={(id) => onUpdateStickers(stickers.filter(s => s.id !== id))}
                onLayerChange={handleLayerChange}
                readOnly={readOnly}
                containerRef={pageRef}
            />
        ))}

        {/* ADD STICKER BUTTON */}
        {!readOnly && (
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onOpenDrawer('STICKERS', {}, handleAddSticker, 'Pick a Sticker');
                }}
                className={`absolute top-20 right-3 z-[40] w-9 h-9 bg-white/90 backdrop-blur text-rose-400 border border-rose-200 rounded-full flex items-center justify-center shadow-sm hover:scale-110 hover:bg-rose-50 transition-all`}
                title="Add Sticker"
            >
                <Smile className="w-5 h-5" />
            </button>
        )}

        {/* DELETE CONTENT BUTTON */}
        {!readOnly && data.type !== 'empty' && (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if(confirm('Are you sure you want to remove this content?')) {
                        onUpdate('empty', null);
                    }
                }}
                className="absolute top-4 left-4 p-2 bg-white text-red-400 border border-gray-200 hover:border-red-300 hover:text-red-500 rounded-xl shadow-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all z-50 hover:bg-red-50"
                title="Remove Content"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        )}
    </div>
  );
}

