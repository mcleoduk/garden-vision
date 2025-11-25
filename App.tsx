import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { Button } from './components/Button';
import { generateLandscape } from './services/geminiService';
import { DesignStyle, STYLE_PROMPTS, GeneratedImage } from './types';

const App: React.FC = () => {
  // State
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle>(DesignStyle.MODERN);
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [generatedResult, setGeneratedResult] = useState<GeneratedImage | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  const handleImageSelected = (base64: string) => {
    setOriginalImage(base64);
    setGeneratedResult(null);
    setError(null);
  };

  const handleClearImage = () => {
    setOriginalImage(null);
    setGeneratedResult(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!originalImage) return;
    
    setIsGenerating(true);
    setError(null);

    try {
      const promptToUse = selectedStyle === DesignStyle.CUSTOM 
        ? customPrompt 
        : STYLE_PROMPTS[selectedStyle];

      if (!promptToUse.trim()) {
        setError("Please provide a description or select a style.");
        setIsGenerating(false);
        return;
      }

      const resultBase64 = await generateLandscape(originalImage, promptToUse);
      
      setGeneratedResult({
        imageUrl: resultBase64,
        prompt: promptToUse,
        timestamp: Date.now()
      });

      // Scroll to result
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err: any) {
      setError(err.message || "Something went wrong while generating the design.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow flex flex-col items-center w-full max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Section */}
        <div className="text-center max-w-2xl space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Redesign your yard in <span className="text-emerald-600">seconds</span>
          </h2>
          <p className="text-lg text-slate-600">
            Upload a photo of your current outdoor space and let our AI landscape architect reimagine it.
          </p>
        </div>

        {/* Input Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left: Upload */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">1. Upload Current Photo</label>
            </div>
            <ImageUploader 
              currentImage={originalImage} 
              onImageSelected={handleImageSelected} 
              onClear={handleClearImage}
            />
          </div>

          {/* Right: Controls */}
          <div className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 h-full">
             <div>
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4 block">2. Choose a Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.values(DesignStyle) as DesignStyle[]).map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`p-3 rounded-lg text-sm font-medium text-left transition-all ${
                        selectedStyle === style 
                          ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500' 
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
             </div>

             {selectedStyle === DesignStyle.CUSTOM && (
               <div className="animate-fadeIn">
                 <label className="block text-sm font-medium text-slate-700 mb-2">Describe your dream garden</label>
                 <textarea
                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-slate-700 min-h-[100px] resize-none"
                    placeholder="e.g. A modern fire pit surrounded by white gravel, agave plants, and concrete pavers..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                 />
               </div>
             )}

            {/* Style Description Preview (if not custom) */}
            {selectedStyle !== DesignStyle.CUSTOM && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 italic">
                "{STYLE_PROMPTS[selectedStyle]}"
              </div>
            )}
            
            <div className="pt-4 border-t border-slate-100">
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <Button 
                onClick={handleGenerate} 
                disabled={!originalImage} 
                isLoading={isGenerating}
                className="w-full text-lg py-4"
              >
                {isGenerating ? 'Designing your garden...' : 'Generate New Look'}
              </Button>
              <p className="text-center text-xs text-slate-400 mt-2">Powered by Google Gemini 2.5 Flash</p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {generatedResult && (
          <div id="results-section" className="w-full space-y-6 py-8 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-2xl font-bold text-slate-800">Your New Garden Design</h3>
              <a 
                href={generatedResult.imageUrl} 
                download={`garden-vision-${Date.now()}.png`}
                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Image
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="space-y-2">
                 <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Original</span>
                 <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3] bg-slate-100">
                   <img src={originalImage!} alt="Original" className="w-full h-full object-cover" />
                 </div>
              </div>

              {/* After */}
              <div className="space-y-2">
                 <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Redesigned</span>
                 <div className="rounded-2xl overflow-hidden shadow-xl shadow-emerald-100 border border-emerald-100 aspect-[4/3] bg-slate-100 relative group">
                   <img src={generatedResult.imageUrl} alt="Generated" className="w-full h-full object-cover" />
                 </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-2">Design Notes</h4>
                <p className="text-slate-600 leading-relaxed">
                    The AI focused on implementing: <span className="italic">{generatedResult.prompt}</span>
                </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} GardenVision AI. Built with React & Google Gemini.
        </div>
      </footer>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
