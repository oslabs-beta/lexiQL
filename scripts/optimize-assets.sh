#!/bin/bash

# Asset Optimization Script for lexiQL
# This script converts GIF files to optimized video formats and images to modern formats

echo "🚀 Starting asset optimization for lexiQL..."

# Create output directories
mkdir -p client/assets/optimized/videos
mkdir -p client/assets/optimized/images

# Convert GIF files to video formats
echo "📹 Converting GIF files to video formats..."

GIFS=(
    "client/assets/codemirror.gif"
    "client/assets/graphiql.gif" 
    "client/assets/movingtables.gif"
    "client/assets/userdbinput.gif"
)

for gif in "${GIFS[@]}"; do
    if [ -f "$gif" ]; then
        filename=$(basename "$gif" .gif)
        
        echo "Converting $gif..."
        
        # Convert to WebM (best compression)
        ffmpeg -i "$gif" -c:v libvpx-vp9 -crf 30 -b:v 0 -an "client/assets/optimized/videos/${filename}.webm" -y
        
        # Convert to MP4 (better compatibility)
        ffmpeg -i "$gif" -c:v libx264 -pix_fmt yuv420p -an "client/assets/optimized/videos/${filename}.mp4" -y
        
        echo "✅ Converted $filename"
    else
        echo "⚠️  File not found: $gif"
    fi
done

# Convert PNG files to WebP
echo "🖼️  Converting images to WebP format..."

IMAGES=(
    "client/assets/new-logo.png"
    "client/assets/white-logo.png"
    "client/assets/navy-github.png"
    "client/assets/navy-linkedin.png"
    "client/assets/navy-twitter.png"
    "client/assets/white-github.png"
    "client/assets/white-linkedin.png"
    "client/assets/chris-headshot.png"
    "client/assets/john-headshot.png"
    "client/assets/ryan-headshot.png"
    "client/assets/stacy-headshot.png"
)

for image in "${IMAGES[@]}"; do
    if [ -f "$image" ]; then
        filename=$(basename "$image" .png)
        
        echo "Converting $image to WebP..."
        cwebp "$image" -o "client/assets/optimized/images/${filename}.webp" -q 80
        
        echo "✅ Converted $filename to WebP"
    else
        echo "⚠️  File not found: $image"
    fi
done

echo "✨ Asset optimization complete!"
echo ""
echo "📁 Optimized files are in:"
echo "   - client/assets/optimized/videos/ (WebM & MP4 formats)"
echo "   - client/assets/optimized/images/ (WebP format)"
echo ""
echo "📊 To use optimized assets:"
echo "   1. Update import paths in components to use optimized versions"
echo "   2. Add fallbacks for browser compatibility"
echo "   3. Test in different browsers"
echo ""
echo "🔧 Required tools:"
echo "   - ffmpeg (for video conversion): brew install ffmpeg"
echo "   - cwebp (for WebP conversion): brew install webp"
