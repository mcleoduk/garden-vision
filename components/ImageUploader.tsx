import React, { useRef } from 'react';

interface ImageUploaderProps {
  currentImage: string | null;
  onImageSelected: (base64: string) => void;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ currentImage, onImageSelected, onClear }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simple validation
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onImageSelected(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerInput = () => {
    inputRef.current?.click();
  };

  if (currentImage) {
    return (
      <div className="relative group w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
        <img 
          src={currentImage} 
          alt="Original Garden" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
                onClick={onClear}
                className="bg-white/90 text-red-600 px-4 py-2 rounded-full font-medium hover:bg-white shadow-lg transform hover:scale-105 transition-all"
            >
                Remove Image
            </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={triggerInput}
      className="w-full h-64 md:h-96 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group"
    >
      <input 
        type="file" 
        ref={inputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      
      <div className="bg-emerald-100 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-slate-700 mb-1">Upload a photo of your yard</h3>
      <p className="text-slate-500 text-sm">Click to browse or take a photo</p>
    </div>
  );
};