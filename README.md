# PixelFind — Stock Image Search App

A stock image search app powered by the Unsplash API with image optimization and delivery through ImageKit.

## Features

- **Search** — Search millions of free photos from Unsplash
- **Category browsing** — Quick-access category tabs (Nature, Travel, Architecture, etc.)
- **Random photos** — Loads 50 random photos on page load
- **Image optimization** — All images served through ImageKit CDN with automatic format conversion (WebP/AVIF) and quality optimization
- **Responsive images** — `srcset` and `sizes` attributes generated via ImageKit JS SDK so the browser picks the optimal image size for each viewport
- **Performance** — `fetchpriority="high"` on above-the-fold images for faster LCP, `loading="lazy"` on everything below
- **Masonry layout** — CSS columns-based grid that adapts from 4 columns on desktop down to 1 on mobile
- **Download** — Hover overlay with a download button linking to Unsplash's download endpoint

## Tech Stack

- Vanilla HTML, CSS, JavaScript (no frameworks)
- [Unsplash API](https://unsplash.com/developers) — photo data
- [ImageKit JS SDK](https://imagekit.io/docs/javascript-sdk) — image URL construction, responsive image attributes, CDN delivery

## Project Structure

```
stockImage/
├── index.html          # Page structure — navbar, hero banner, category bar, image grid
├── style.css           # Styling — masonry columns, responsive breakpoints, hover overlays
├── app.js              # App logic — API calls, image card creation, ImageKit integration
├── config.js           # API keys (gitignored)
└── config.example.js   # Template for config.js
```

## Setup

1. Copy the config template and add your API keys:
   ```bash
   cp config.example.js config.js
   ```

2. Edit `config.js` with your credentials:
   - **Unsplash Access Key** — get one at [unsplash.com/developers](https://unsplash.com/developers)
   - **ImageKit URL Endpoint** — from your [ImageKit dashboard](https://imagekit.io/dashboard)

3. Open `index.html` in a browser (or use a local server like `npx serve`).

## How ImageKit Integration Works

Images are fetched from Unsplash's API, but instead of using Unsplash URLs directly, they're routed through ImageKit's CDN:

1. **URL construction** — `ImageKit.buildSrc()` wraps the Unsplash raw URL with ImageKit transforms (`format: auto`, `quality: 80`)
2. **Responsive attributes** — `ImageKit.getResponsiveImageAttributes()` generates a full `srcset` with multiple width variants (256w through 3840w) so the browser downloads only the size it needs
3. **`sizes` attribute** — Matches the CSS column layout breakpoints so the browser can calculate the correct image width before downloading

This means every image gets automatic WebP/AVIF conversion, quality optimization, and CDN caching — without changing the Unsplash source.

## CSS Layout

The image grid uses CSS `columns` for a masonry-style layout:

| Viewport | Columns |
|----------|---------|
| > 1200px | 4 |
| 900–1200px | 3 |
| 540–900px | 2 |
| < 540px | 1 |

Each image card is a 1:1 square (`aspect-ratio: 1/1`) with `object-fit: cover`.
