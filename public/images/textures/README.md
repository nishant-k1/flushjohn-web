# Texture Image Optimization Guide

## File Location
Place your optimized parchment texture image here as: `parchment-texture.webp`

## Optimization Requirements

### Recommended Settings:
- **Format**: WebP (best compression) or PNG-8 (fallback)
- **Dimensions**: 200x200px to 400x400px (small repeating tile)
- **File Size**: Under 50KB (ideally 20-30KB)
- **Quality**: 70-80% (WebP) or optimized PNG

### Why Small Tile?
- Small repeating tiles load faster
- Browser caches the small image and repeats it
- Reduces total page weight significantly

### Tools for Optimization:
1. **Online**: TinyPNG, Squoosh.app, ImageOptim
2. **Command Line**: 
   ```bash
   # Using cwebp (WebP encoder)
   cwebp -q 75 input.png -o parchment-texture.webp
   
   # Using ImageMagick
   convert input.png -resize 300x300 -quality 75 parchment-texture.webp
   ```

### Testing:
After adding the image, test that:
- Image repeats seamlessly (no visible seams)
- File size is under 50KB
- Texture blends well with the dark background (#5a4a3a)
- Page load time remains fast

## Current CSS Configuration:
- Background size: 300px x 300px (adjust in styles.module.css if needed)
- Opacity: 0.4 (adjustable in CSS)
- Blend mode: overlay (for natural blending)
