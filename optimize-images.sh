#!/bin/bash

# Image optimization script for portfolio background
# Requires imagemagick: brew install imagemagick

echo "Optimizing background images..."

# Create optimized versions of background images
convert src/assets/images/backgrounds/background.jpg \
  -quality 85 \
  -resize 1920x1080\> \
  -strip \
  public/preload-background.jpg

echo "Created optimized background image: public/preload-background.jpg"

# Create webp version for modern browsers
convert src/assets/images/backgrounds/background.jpg \
  -quality 80 \
  -resize 1920x1080\> \
  -strip \
  src/assets/images/backgrounds/background.webp

echo "Created WebP version: src/assets/images/backgrounds/background.webp"

# Show file sizes
echo ""
echo "Original background.jpg size:"
ls -lh src/assets/images/backgrounds/background.jpg | awk '{print $5}'
echo "Optimized preload-background.jpg size:"
ls -lh public/preload-background.jpg | awk '{print $5}'
echo "WebP version size:"
ls -lh src/assets/images/backgrounds/background.webp | awk '{print $5}'