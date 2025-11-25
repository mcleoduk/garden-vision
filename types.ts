export interface GeneratedImage {
  imageUrl: string;
  prompt: string;
  timestamp: number;
}

export interface AppState {
  originalImage: string | null;
  generatedImages: GeneratedImage[];
  isGenerating: boolean;
  error: string | null;
}

export enum DesignStyle {
  MODERN = 'Modern & Minimalist',
  TROPICAL = 'Lush Tropical',
  JAPANESE = 'Japanese Zen',
  COTTAGE = 'English Cottage',
  DESERT = 'Desert Xeriscape',
  MEDITERRANEAN = 'Mediterranean',
  CUSTOM = 'Custom Description'
}

export const STYLE_PROMPTS: Record<DesignStyle, string> = {
  [DesignStyle.MODERN]: "A modern, minimalist garden with clean lines, concrete pavers, geometric planters, and low-maintenance architectural grasses. Sleek outdoor furniture and subtle lighting.",
  [DesignStyle.TROPICAL]: "A lush tropical paradise with large palm trees, vibrant exotic flowers, ferns, a small water feature, and natural stone pathways.",
  [DesignStyle.JAPANESE]: "A peaceful Japanese Zen garden with raked gravel, mossy rocks, shaped maples, bamboo fencing, and a stone lantern.",
  [DesignStyle.COTTAGE]: "A charming English cottage garden overflowing with colorful wildflowers, roses, lavender, a winding brick path, and a rustic wooden bench.",
  [DesignStyle.DESERT]: "A sustainable desert xeriscape with agave, cactus, decorative gravel, large boulders, and drought-tolerant succulents.",
  [DesignStyle.MEDITERRANEAN]: "A Mediterranean courtyard with terracotta tiles, olive trees, lavender bushes, a pergola with climbing vines, and a fountain.",
  [DesignStyle.CUSTOM]: ""
};
