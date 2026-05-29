'use client';
import React from 'react';

export default function DefaultFlip({ 
    sheets, 
    currentSheetIndex, 
    onFlipNext, 
    onFlipPrev, 
    bgColor, 
    renderPage,
    styleConfig = { border: 'border-4 border-black', shadow: '', rounded: '' },
    isCoverPage = false  // When true, hide the left page stack (sliver)
}) {
    
  // Dimensions 
  const PAGE_WIDTH = 500;
  const PAGE_HEIGHT = 700;
  const SPREAD_WIDTH = PAGE_WIDTH * 2;

  // Extract border width for left/right edge handling
  const borderClass = styleConfig.border || 'border-4 border-black';
  
  return (
      <div 
        className="relative flex items-center justify-center transform scale-[0.45] md:scale-100 transition-transform duration-300 origin-center"
        style={{ 
          width: SPREAD_WIDTH, 
          height: PAGE_HEIGHT,
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          perspective: '2000px',
          WebkitPerspective: '2000px',
        }}
      >
        {/* FLIPPING STACK */}
        {sheets.map((sheet, index) => {
           // Logic: Pages with index < currentSheetIndex are flipped (-180deg)
           const isFlipped = index < currentSheetIndex;
           
           // Is this the page currently being interacted with?
           const isCurrentPage = index === currentSheetIndex;
           const isPreviousPage = index === currentSheetIndex - 1;
           const isActiveFlip = isCurrentPage || isPreviousPage;
           
           // Z-Index Logic:
           // The currently flipping page should ALWAYS be on top
           // Right Stack (Unflipped): Higher index = lower z (top of stack has highest z)
           // Left Stack (Flipped): Higher index = higher z (most recently flipped on top)
           let zIndex;
           if (isActiveFlip) {
             // Active flip page gets highest z-index
             zIndex = sheets.length + 10;
           } else if (isFlipped) {
             zIndex = index + 1;
           } else {
             zIndex = sheets.length - index;
           }

           // CRITICAL: When on a cover page, completely hide ALL flipped sheets
           const shouldHideFlippedSheet = isFlipped && isCoverPage;

           // Use different translateZ values to create depth separation
           // Flipped pages sit slightly back, unflipped pages sit slightly forward
           const zDepth = isFlipped ? -0.25 : 0.25;

           return (
             <div
               key={sheet.id}
               onClick={() => {
                 if (index === currentSheetIndex) onFlipNext();
                 if (index === currentSheetIndex - 1) onFlipPrev();
               }}
               style={{
                 position: 'absolute',
                 right: 0,
                 width: PAGE_WIDTH,
                 height: PAGE_HEIGHT,
                 transformStyle: 'preserve-3d',
                 WebkitTransformStyle: 'preserve-3d',
                 transformOrigin: 'left center',
                 transform: isFlipped 
                   ? `translate3d(0, 0, ${zDepth}px) rotateY(-180deg)` 
                   : `translate3d(0, 0, ${zDepth}px) rotateY(0deg)`,
                 transition: isActiveFlip ? 'transform 0.52s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                 willChange: isActiveFlip ? 'transform' : 'auto',
                 zIndex: zIndex,
                 cursor: 'pointer',
                 opacity: shouldHideFlippedSheet ? 0 : 1,
                 pointerEvents: (isActiveFlip && !shouldHideFlippedSheet) ? 'auto' : 'none',
                 contain: 'layout paint style',
               }}
               className="group"
             >
               {/* --------------------------- */}
               {/* FRONT FACE (Right Page)     */}
               {/* --------------------------- */}
               <div
                 style={{
                   position: 'absolute',
                   inset: 0,
                   backfaceVisibility: 'hidden',
                   WebkitBackfaceVisibility: 'hidden',
                   transform: 'translateZ(0.5px) rotateY(0deg)',
                   WebkitTransform: 'translateZ(0.5px) rotateY(0deg)',
                   backgroundColor: bgColor || '#FFFDF5',
                   pointerEvents: isFlipped ? 'none' : 'auto',
                 }}
                 // Matching Edit Mode Borders and visual style
                 className={`overflow-hidden ${borderClass} border-l-0 ${styleConfig.rounded} ${styleConfig.shadow}`}
               >
                 {renderPage(sheet.front, 'right')}
                 
                 {/* Spine Shadow / Gradient for depth */}
                 <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
               </div>
               
               {/* --------------------------- */}
               {/* BACK FACE (Left Page)       */}
               {/* --------------------------- */}
               <div
                 style={{
                   position: 'absolute',
                   inset: 0,
                   backfaceVisibility: 'hidden',
                   WebkitBackfaceVisibility: 'hidden',
                   transform: 'translateZ(0.5px) rotateY(180deg)',
                   WebkitTransform: 'translateZ(0.5px) rotateY(180deg)',
                   backgroundColor: bgColor || '#FFFDF5',
                   // Hide the back face if there's no content
                   visibility: sheet.back ? 'visible' : 'hidden',
                   pointerEvents: isFlipped ? 'auto' : 'none',
                 }}
                 // Matching Edit Mode Borders
                 className={`overflow-hidden ${borderClass} border-r-0 ${styleConfig.rounded}`}
               >
                 {renderPage(sheet.back, 'left')}
                 
                 {/* Spine Shadow for Left Page */}
                 <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
               </div>
             </div>
           );
         })}
      </div>
  );
}
