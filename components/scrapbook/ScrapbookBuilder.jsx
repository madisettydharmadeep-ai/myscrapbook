'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Plus, Book, Sparkles, Eye, Share2, Check, Pencil } from 'lucide-react';
import BookLayout from './BookLayout';
import BookPreview from './BookPreview';
import Link from 'next/link';
import ComponentSelector from './ComponentSelector';
import StyleEditorDrawer from './StyleEditorDrawer';
import TextStyleEditorDrawer from './TextStyleEditorDrawer';
import CoverStyleEditorDrawer from './CoverStyleEditorDrawer';
import BackgroundEditorDrawer from './BackgroundEditorDrawer';
import { Palette } from 'lucide-react';
import SupportButton from '@/components/SupportButton';
import StickerSelectorDrawer from './StickerSelectorDrawer';

// ... (imports remain same)

export default function ScrapbookBuilder() {
  const { user } = useAuth();
  const router = useRouter();

  // State for pages
  // Each page object: { id: string, type: 'empty' | 'image' | 'text', content: any }
  // We initialize with 2 empty pages.
  const [pages, setPages] = useState([
    { id: 'p1', type: 'empty', content: null, stickers: [] },
    { id: 'p2', type: 'empty', content: null, stickers: [] },
    { id: 'p3', type: 'empty', content: null, stickers: [] },
    { id: 'p4', type: 'empty', content: null, stickers: [] },
  ]);

  const [isPreview, setIsPreview] = useState(false);
  const [bgPattern, setBgPattern] = useState('graphy'); // options: graphy, dots, lines, plain
  const [bgColor, setBgColor] = useState('#FFFDF5');
  const [pageBorder, setPageBorder] = useState('none'); // options: none, solid, dashed, dotted, doodle, cute-heart, cute-star
  const [soundId, setSoundId] = useState('page-flip'); // options: none, page-flip
  const [title, setTitle] = useState('My Scrapbook');

  const [animId, setAnimId] = useState('default'); // options: default, slide
  const [appBackground, setAppBackground] = useState('none');
  const [pageBgImage, setPageBgImage] = useState(null);
  const [pageBgOpacity, setPageBgOpacity] = useState(0.8);

  const [isSaving, setIsSaving] = useState(false);
  const [savingStage, setSavingStage] = useState(0); // 0: Idle, 1: Binding, 2: Stitching, 3: Delivering, 4: Done
  const [shareUrl, setShareUrl] = useState(null);
  
  // GLOBAL DRAWER STATE
  // { type: 'NONE' | 'COMPONENT' | 'STYLE', data: any, onAction: func, title: string }
  const [activeDrawer, setActiveDrawer] = useState({ type: 'NONE', data: {}, onAction: () => {} });

  // --- LOCAL STORAGE AUTO-SAVE LOGIC ---
  const [isInitialized, setIsInitialized] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [draftData, setDraftData] = useState(null);

  // 1. Initial Check on Mount
  useEffect(() => {
    // Helper to check validity
    const isValidDraft = (parsed) => parsed && parsed.pages && parsed.pages.length > 0;

    // A. Check for Guest Draft (Priority: Migration from Anonymous -> Logged In)
    const guestDraft = localStorage.getItem('scrapbook_draft_guest');
    if (guestDraft) {
        try {
            const parsed = JSON.parse(guestDraft);
            if (isValidDraft(parsed)) {
                setDraftData({ ...parsed, source: 'guest' });
                setShowDraftModal(true);
                return; 
            }
        } catch (e) { console.error(e); }
    }

    // B. Check for User Draft (if logged in)
    if (user) {
        const userId = user._id || user.id;
        const userDraft = localStorage.getItem(`scrapbook_draft_${userId}`);
        if (userDraft) {
            try {
                const parsed = JSON.parse(userDraft);
                if (isValidDraft(parsed)) {
                    setDraftData({ ...parsed, source: 'user' });
                    setShowDraftModal(true);
                } else {
                    setIsInitialized(true);
                }
            } catch (e) { 
                setIsInitialized(true); 
            }
        } else {
            setIsInitialized(true);
        }
    } else {
        // If no user and no guest draft found (or invalid)
        if (!guestDraft) setIsInitialized(true);
    }
  }, [user]);

  // 2. Auto-Save Effect
  useEffect(() => {
      // Only save if initialized and not currently previewing
      if (!isInitialized) return;

      const saveData = {
          pages,
          bgPattern,
          bgColor,
          pageBorder,
          soundId,
          title,
          animId,
          appBackground,
          pageBgImage,
          pageBgOpacity,
      };

      const handler = setTimeout(() => {
          const userId = user ? (user._id || user.id) : 'guest';
          localStorage.setItem(`scrapbook_draft_${userId}`, JSON.stringify(saveData));
      }, 1000); // Debounce 1s

      return () => clearTimeout(handler);
  }, [pages, bgPattern, bgColor, pageBorder, soundId, title, animId, appBackground, isInitialized, user, pageBgImage, pageBgOpacity]);

  const handleContinueDraft = () => {
    if (draftData) {
        setPages(draftData.pages || pages);
        setBgPattern(draftData.bgPattern || bgPattern);
        setBgColor(draftData.bgColor || bgColor);
        setPageBorder(draftData.pageBorder || pageBorder);
        setSoundId(draftData.soundId || soundId);
        setTitle(draftData.title || title);
        setAnimId(draftData.animId || animId);
        setAppBackground(draftData.appBackground || 'none');
        if (draftData.source === 'guest') {
            localStorage.removeItem('scrapbook_draft_guest');
        }
        setPageBgImage(draftData.pageBgImage || null);
        setPageBgOpacity(draftData.pageBgOpacity !== undefined ? draftData.pageBgOpacity : 0.8);
    }
    setShowDraftModal(false);
    setIsInitialized(true); 
  };

  const handleStartFresh = () => {
    // Determine which key to clear
    if (draftData && draftData.source === 'guest') {
        localStorage.removeItem('scrapbook_draft_guest');
    } else {
        const userId = user ? (user._id || user.id) : 'guest';
        localStorage.removeItem(`scrapbook_draft_${userId}`);
    }
    setShowDraftModal(false);
    setIsInitialized(true); 
  };

  const openDrawer = (type, data = {}, onAction = () => {}, title = '', additionalAction = null) => {
    setActiveDrawer({ type, data, onAction, title, additionalAction });
  };
  
  const closeDrawer = () => {
    setActiveDrawer({ type: 'NONE', data: {}, onAction: () => {} });
  };

  const BG_OPTIONS = [
    { id: 'graphy', label: 'Grid', value: 'url("https://www.transparenttextures.com/patterns/graphy.png")' },
    { id: 'dots', label: 'Dots', value: 'radial-gradient(#000 1px, transparent 1px)' },
    { id: 'lines', label: 'Lined', value: 'linear-gradient(#000 1px, transparent 1px)' },
    { id: 'plain', label: 'Plain', value: 'none' },
    { id: 'giraffe', label: 'Giraffe', value: 'url("/svg/giraffe1.svg")' },
  ];

  const COLOR_OPTIONS = [
      { id: 'white', value: '#FFFDF5', label: 'Cream' },
      { id: 'pink', value: '#FDF2F8', label: 'Pink' },
      { id: 'blue', value: '#EFF6FF', label: 'Blue' },
      { id: 'yellow', value: '#FEFCE8', label: 'Yellow' },
      { id: 'green', value: '#F0FDF4', label: 'Green' },
  ];

  const BORDER_OPTIONS = [
      { id: 'none', label: 'None', preview: 'border-0' },
      { id: 'solid', label: 'Single', preview: 'border-2 border-black' },
      { id: 'dashed', label: 'Dashed', preview: 'border-2 border-dashed border-black' },
      { id: 'cute-flower', label: 'Flowers', preview: 'border-[6px] border-pink-300 border-dashed' },
  ];

  const SOUND_OPTIONS = [
      { id: 'none', label: 'Silent', src: null },
      { id: 'page-flip', label: 'Paper Snap', src: '/sounds/page-flip.m4a' },
      { id: 'cute-click', label: 'Cute Click', src: '/sounds/Cute-click.mp3' },
      { id: 'heavy-flip', label: 'Heavy Flip', src: '/sounds/heavy-flip.mp3' },
  ];

  const ANIM_OPTIONS = [
    { id: 'default', label: 'Classic Flip', icon: '📖' },
  ];

  const addPagePair = () => {
    const newId1 = `p${pages.length + 1}`;
    const newId2 = `p${pages.length + 2}`;
    setPages([
      ...pages,
      { id: newId1, type: 'empty', content: null, stickers: [] },
      { id: newId2, type: 'empty', content: null, stickers: [] },
    ]);
  };

  const updatePage = (pageId, type, content) => {
      setPages(prev => prev.map(p => 
          p.id === pageId ? { ...p, type, content } : p
      ));
  };

  const updatePageStickers = (pageId, stickers) => {
      setPages(prev => prev.map(p => 
          p.id === pageId ? { ...p, stickers } : p
      ));
  };

  const removePagePair = (index) => {
      // Index refers to the spread index (0 for pages 1-2, 1 for 3-4, etc.)
      const newPages = [...pages];
      newPages.splice(index * 2, 2);
      setPages(newPages);
  };

  const handleShare = async () => {
    if (!user) {
        // Force save draft before redirecting to login
        const currentData = {
           pages, bgPattern, bgColor, pageBorder, soundId, title, animId, appBackground, pageBgImage, pageBgOpacity
        };
        localStorage.setItem('scrapbook_draft', JSON.stringify(currentData));
        router.push('/login?redirect=/scrapbook');
        return;
    }

    setIsSaving(true);
    setSavingStage(1); // Start binding

    try {
      // 1. Process Images (Upload Base64 to R2)
      // Use sequential for-of loop to avoid race conditions or overwhelming the network
      const processedPages = [...pages]; // Clone array
      
      for (let i = 0; i < processedPages.length; i++) {
          const page = processedPages[i];
          
          if (page.type === 'image' && page.content?.url?.startsWith('data:')) {
              try {
                  // Convert base64 to blob/file
                  const res = await fetch(page.content.url);
                  const blob = await res.blob();
                  const file = new File([blob], "image.png", { type: "image/png" });

                  const formData = new FormData();
                  formData.append('file', file);

                  const uploadRes = await fetch('/api/upload', {
                      method: 'POST',
                      body: formData
                  });
                  const uploadData = await uploadRes.json();
                  
                  if (uploadData.success) {
                       processedPages[i] = { ...page, content: { ...page.content, url: uploadData.url } };
                  }
              } catch (e) {
                  console.error("Failed to upload image for page", page.id, e);
                  // Keep as base64 on failure so data isn't lost? or error out?
              }
          }
          
           // Handle Cover Images
          if (page.type === 'cover' && page.content?.url?.startsWith('data:')) {
               try {
                  const res = await fetch(page.content.url);
                  const blob = await res.blob();
                  const file = new File([blob], "cover.png", { type: "image/png" });
                  const formData = new FormData();
                  formData.append('file', file);
                  const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
                  const uploadData = await uploadRes.json();
                  if (uploadData.success) {
                       processedPages[i] = { ...page, content: { ...page.content, url: uploadData.url } };
                  }
               } catch (e) { console.error("Failed to upload cover", e); }
          }

          // Handle Gift Images (Hidden inside envelopes/scratch cards)
          if (page.type === 'gift' && page.content?.type === 'image' && page.content?.data?.startsWith('data:')) {
               try {
                  const res = await fetch(page.content.data);
                  const blob = await res.blob();
                  const file = new File([blob], "gift.png", { type: "image/png" });
                  const formData = new FormData();
                  formData.append('file', file);
                  const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
                  const uploadData = await uploadRes.json();
                  if (uploadData.success) {
                       processedPages[i] = { 
                           ...page, 
                           content: { 
                               ...page.content, 
                               data: uploadData.url 
                           } 
                       };
                  }
               } catch (e) { console.error("Failed to upload gift image", e); }
          }
      }
      
      // Fake delay for "Binding" visual if upload was too fast
      await new Promise(r => setTimeout(r, 1000));
      
      const res = await fetch('/api/scrapbook/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pages: processedPages, bgPattern, bgColor, pageBorder, title, soundId, animId, appBackground, pageBgImage, pageBgOpacity }),
      });
      const data = await res.json();
      
      if (data.success) {
        setSavingStage(2); // Stitching
        await new Promise(r => setTimeout(r, 1500));
        
        setSavingStage(3); // Delivering
        await new Promise(r => setTimeout(r, 1500));

        setShareUrl(`${window.location.origin}/scrapbook/${data.shareId}`);
        setSavingStage(0); // Reset
      } else {
        alert('Failed to save scrapbook. Please try again.');
        setSavingStage(0);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
      setSavingStage(0);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden relative bg-[#FFFBF7] selection:bg-rose-100 selection:text-rose-900">
      {/* Share Modal */}
      {shareUrl && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
           {/* ... existing share modal content ... */}
           <div className="bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl border border-gray-100 transform transition-all scale-100">
              <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Scrapbook Ready!</h2>
              <p className="mb-8 text-gray-500 text-center leading-relaxed">Your digital scrapbook has been saved. Share this link with your lucky recipient!</p>
              
              <div className="flex gap-2 mb-6">
                 <input 
                    type="text" 
                    readOnly 
                    value={shareUrl} 
                    className="flex-1 border border-gray-200 p-3 rounded-xl font-mono text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-400/50"
                 />
                 <button 
                    onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                        alert('Link copied!');
                    }}
                    className="bg-rose-400 text-white px-5 font-bold rounded-xl hover:bg-rose-500 transition-colors shadow-sm"
                 >
                    Copy
                 </button>
              </div>

              <button 
                  onClick={() => router.push('/profile')}
                  className="w-full py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-all shadow-lg shadow-gray-800/20"
              >
                  Go to Profile
              </button>
           </div>
        </div>
      )}

      {/* Progress / Making Modal */}
      {isSaving && savingStage > 0 && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-500">
              <div className="flex flex-col items-center gap-8 max-w-sm w-full">
                  
                  {/* Icon Animation */}
                  <div className="relative">
                      <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                          {savingStage === 1 && <Book className="w-10 h-10 text-rose-400 animate-bounce" />}
                          {savingStage === 2 && <Palette className="w-10 h-10 text-amber-400 animate-spin-slow" />}
                          {savingStage === 3 && <Share2 className="w-10 h-10 text-rose-300 animate-ping" />}
                      </div>
                  </div>

                  {/* Steps List */}
                  <div className="w-full space-y-4">
                      {/* Step 1 */}
                      <div className={`flex items-center gap-4 p-4 rounded-xl border border-white/10 transition-all duration-500 ${savingStage >= 1 ? 'bg-white/10 opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${savingStage > 1 ? 'bg-rose-400 border-rose-400 text-white' : (savingStage === 1 ? 'border-rose-400 text-rose-400' : 'border-white/30')}`}>
                              {savingStage > 1 ? <Check className="w-3 h-3" /> : '1'}
                          </div>
                          <span className={`font-bold ${savingStage === 1 ? 'text-white' : 'text-white/60'}`}>Binding the book...</span>
                          {savingStage === 1 && <div className="ml-auto w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin"></div>}
                      </div>

                      {/* Step 2 */}
                      <div className={`flex items-center gap-4 p-4 rounded-xl border border-white/10 transition-all duration-500 delay-100 ${savingStage >= 2 ? 'bg-white/10 opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${savingStage > 2 ? 'bg-amber-400 border-amber-400 text-white' : (savingStage === 2 ? 'border-amber-400 text-amber-400' : 'border-white/30')}`}>
                              {savingStage > 2 ? <Check className="w-3 h-3" /> : '2'}
                          </div>
                          <span className={`font-bold ${savingStage === 2 ? 'text-white' : 'text-white/60'}`}>Stitching pages...</span>
                          {savingStage === 2 && <div className="ml-auto w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>}
                      </div>

                      {/* Step 3 */}
                      <div className={`flex items-center gap-4 p-4 rounded-xl border border-white/10 transition-all duration-500 delay-200 ${savingStage >= 3 ? 'bg-white/10 opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${savingStage > 3 ? 'bg-rose-300 border-rose-300 text-white' : (savingStage === 3 ? 'border-rose-300 text-rose-300' : 'border-white/30')}`}>
                              {savingStage > 3 ? <Check className="w-3 h-3" /> : '3'}
                          </div>
                          <span className={`font-bold ${savingStage === 3 ? 'text-white' : 'text-white/60'}`}>Delivering gift...</span>
                          {savingStage === 3 && <div className="ml-auto w-4 h-4 border-2 border-rose-300 border-t-transparent rounded-full animate-spin"></div>}
                      </div>
                  </div>

              </div>
          </div>
      )}

      {/* Draft Detected Modal */}
      {showDraftModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl border border-gray-100 transform transition-all scale-100 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Book className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">Unsaved Progress Found</h2>
              <p className="mb-8 text-gray-500 text-center leading-relaxed">
                  We found a previous scrapbook you were working on. Would you like to continue where you left off?
              </p>
              
              <div className="flex flex-col gap-3">
                 <button 
                    onClick={handleContinueDraft}
                    className="w-full py-3 bg-rose-400 text-white font-bold rounded-xl hover:bg-rose-500 transition-all shadow-lg shadow-rose-500/20"
                 >
                    Continue Editing
                 </button>
                 <button 
                    onClick={handleStartFresh}
                    className="w-full py-3 bg-white text-gray-700 border border-gray-200 font-bold rounded-xl hover:bg-gray-50 transition-all"
                 >
                    Start Fresh
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Header */}
      {/* Header - Hidden in Preview */}
      {!isPreview && (
        <header className="px-4 py-4 md:px-6 flex justify-between items-center sticky top-0 z-50 bg-[#FFFBF7]/90 border-b border-gray-100/50 backdrop-blur-md">
            <div className="flex items-center shrink-0">
                <Link href="/" className="flex items-center gap-2 select-none group cursor-pointer hover:opacity-80 transition-opacity">
                    <img 
                        src="/heart-favicon.ico" 
                        alt="Logo" 
                        className="w-8 h-8 transform group-hover:rotate-12 transition-transform"
                    />
                    <span className="text-lg md:text-xl font-bold tracking-tight text-gray-700">myscrapbook</span>
                </Link>
            </div>
            <div className="flex gap-2 md:gap-3 shrink-0">
                <div className="scale-90 origin-right">
                    <SupportButton iconOnly={true} />
                </div>

                <button 
                    onClick={() => openDrawer('THEME', { bgPattern, bgColor, soundId, pageBgImage, pageBgOpacity }, () => {}, 'Page Theme')}
                    className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-3 sm:px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-all hover:shadow-sm"
                >
                    <Palette className="w-4 h-4" />
                    <span className="hidden sm:inline">Theme</span>
                </button>

                <button 
                    onClick={() => setIsPreview(true)}
                    className="flex items-center gap-2 px-3 sm:px-5 py-2 rounded-full font-medium text-sm transition-all hover:scale-105 bg-gray-800 text-white hover:bg-gray-700"
                >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Preview</span>
                </button>
            </div>
        </header>
      )}

      {/* Floating Controls in Preview Mode */}
      {isPreview && (
           <div className="fixed top-6 right-6 z-50 flex gap-2 sm:gap-3 animate-in slide-in-from-top-4 duration-500 items-center">
                <button 
                     onClick={() => setIsPreview(false)}
                     className="flex items-center gap-2 bg-white/90 backdrop-blur text-gray-900 border border-gray-200 px-3 py-2 sm:px-6 sm:py-3 rounded-full font-bold hover:bg-white hover:scale-105 transition-all shadow-lg"
                     title="Back to Edit"
                >
                    <Pencil className="w-4 h-4" />
                    <span className="hidden sm:inline">Back</span>
                </button>
                <button 
                     onClick={handleShare}
                     disabled={isSaving}
                     className="flex items-center gap-2 bg-rose-400 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-full font-bold shadow-lg shadow-rose-500/30 hover:shadow-xl hover:scale-105 hover:bg-rose-500 transition-all disabled:opacity-50 disabled:hover:scale-100"
                     title="Share"
                >
                    <Share2 className="w-4 h-4" />
                   <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Share'}</span>
                </button>
           </div>
      )}
    
      {/* Background Toolbar */}


      {/* Main Workspace */}
      <main 
        className={`flex-1 overflow-auto relative flex ${isPreview ? 'items-center justify-center' : 'flex-col items-center'} transition-colors duration-500 ${isPreview ? 'bg-[#1a1a1a]' : 'bg-[#FFFBF7]'}`}
        style={{
            backgroundImage: isPreview && appBackground !== 'none' ? appBackground : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: isPreview && appBackground === 'none' ? '#1a1a1a' : undefined
        }}
      >
          {/* Subtle Dark Overlay for better contrast on images */}
          {isPreview && appBackground !== 'none' && (
              <div className="fixed inset-0 bg-black/30 pointer-events-none z-0" />
          )}
          
          
          {/* Title Input */}
          {!isPreview && (
            <div className="my-8 w-full max-w-md flex flex-col items-center z-10 relative px-4 group/title">
                <div className="relative w-full">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-center text-2xl md:text-3xl font-bold tracking-tight bg-transparent border-b-2 border-dashed border-gray-300/50 hover:border-gray-300 focus:border-rose-400 focus:border-solid focus:outline-none placeholder-gray-300 w-full pb-2 text-gray-800 transition-all pr-8"
                        placeholder="Name your story..."
                    />
                    <Pencil className="w-5 h-5 text-gray-300 absolute right-0 top-1/2 -translate-y-full sm:-translate-y-1/2 group-hover/title:text-rose-400 transition-colors pointer-events-none" />
                </div>
            </div>
          )}

          <div className={`${isPreview ? 'w-full h-full flex items-center justify-center scale-100 sm:scale-90' : ''} transition-transform duration-500`}>
              {isPreview ? (
                <BookPreview 
                  pages={pages} 
                  bgPattern={bgPattern} 
                  bgColor={bgColor} 
                  pageBorder={pageBorder} 
                  soundId={soundId} 
                  animId={animId} 
                  pageBgImage={pageBgImage}
                  pageBgOpacity={pageBgOpacity}
                />
              ) : (
                <BookLayout 
                    pages={pages} 
                    onUpdatePage={updatePage} 
                    onStickerUpdate={updatePageStickers}
                    onRemovePair={removePagePair} 
                    readOnly={false} 
                    bgPattern={bgPattern} 
                    bgColor={bgColor}
                    pageBorder={pageBorder}
                    pageBgImage={pageBgImage}
                    pageBgOpacity={pageBgOpacity}
                    onOpenDrawer={openDrawer}
                />
              )}
          </div>

          {/* GLOBAL DRAWER RENDERER */}
          {activeDrawer.type === 'COMPONENT' && (
              <ComponentSelector 
                  onSelect={(type) => {
                      activeDrawer.onAction(type);
                      closeDrawer();
                  }} 
                  onClose={closeDrawer} 
              />
          )}

          {activeDrawer.type === 'STYLE' && (
              <StyleEditorDrawer
                  title={activeDrawer.title}
                  categories={activeDrawer.data.categories}
                  currentStyle={activeDrawer.data.currentStyle}
                  tapePosition={activeDrawer.data.tapePosition}
                  polaroidPosition={activeDrawer.data.polaroidPosition}
                  onSelect={(styleId) => activeDrawer.onAction(styleId)}
                  onTapePosChange={activeDrawer.additionalAction?.onTapePosChange}
                  onPolaroidPosChange={activeDrawer.additionalAction?.onPolaroidPosChange}
                  onClose={closeDrawer}
              />
          )}

          {activeDrawer.type === 'THEME' && (
              <BackgroundEditorDrawer
                   bgPattern={bgPattern}
                   setBgPattern={setBgPattern}
                   bgColor={bgColor}
                   setBgColor={setBgColor}
                   pageBorder={pageBorder}
                   setPageBorder={setPageBorder}
                   soundId={soundId}
                   setSoundId={setSoundId}
                   animId={animId}
                   setAnimId={setAnimId}
                   appBackground={appBackground}
                   setAppBackground={setAppBackground}
                   bgOptions={BG_OPTIONS}
                   colorOptions={COLOR_OPTIONS}
                   borderOptions={BORDER_OPTIONS}
                   soundOptions={SOUND_OPTIONS}
                   animOptions={ANIM_OPTIONS}
                   pageBgImage={pageBgImage}
                   setPageBgImage={setPageBgImage}
                   pageBgOpacity={pageBgOpacity}
                   setPageBgOpacity={setPageBgOpacity}
                   onClose={closeDrawer}
              />
          )}

          {activeDrawer.type === 'TEXT_STYLE' && (
              <TextStyleEditorDrawer
                  currentFontStyle={activeDrawer.data.currentFontStyle}
                  currentBgColor={activeDrawer.data.currentBgColor}
                  currentTextColor={activeDrawer.data.currentTextColor}
                  isCover={activeDrawer.data.isCover}
                  onFontChange={(fontStyleId) => activeDrawer.onAction.onFontChange(fontStyleId)}
                  onColorChange={(color) => activeDrawer.onAction.onColorChange(color)}
                  onTextColorChange={(color) => activeDrawer.onAction.onTextColorChange?.(color)}
                  onClose={closeDrawer}
              />
          )}

          {activeDrawer.type === 'COVER_STYLE' && (
              <CoverStyleEditorDrawer
                  currentFontStyle={activeDrawer.data.currentFontStyle}
                  currentOverlayColor={activeDrawer.data.currentOverlayColor}
                  currentOverlayOpacity={activeDrawer.data.currentOverlayOpacity}
                  currentTextColor={activeDrawer.data.currentTextColor}
                  onFontChange={(fontStyleId) => activeDrawer.onAction.onFontChange(fontStyleId)}
                  onOverlayChange={(color, opacity) => activeDrawer.onAction.onOverlayChange(color, opacity)}
                  onTextColorChange={(color) => activeDrawer.onAction.onTextColorChange?.(color)}
                  onClose={closeDrawer}
              />
          )}

          {activeDrawer.type === 'STICKERS' && (
              <StickerSelectorDrawer
                  onSelect={(url) => activeDrawer.onAction(url)}
                  onClose={closeDrawer}
              />
          )}

          {/* Add Page Button */}
          {!isPreview && (
              <div className="mt-12 pb-24">
                <button 
                    onClick={addPagePair}
                    className="group flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all border border-gray-100"
                >
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center group-hover:bg-rose-200 transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span>Add Pages</span>
                </button>
              </div>
          )}
      </main>
    </div>
  );
}
