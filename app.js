"use strict";

// ----- DOM References -----
const searchtext = document.querySelector("#search-input");
const searchBtn = document.querySelector("#generate-btn");
const imgSection = document.querySelector("#image-container");
const categoryBar = document.querySelectorAll(".category");

// ----- Config from config.js (loaded before this script) -----
const UNSPLASH_BASE_URL = CONFIG.UNSPLASH_BASE_URL;
const UNSPLASH_ACCESS_KEY = CONFIG.UNSPLASH_ACCESS_KEY;
const IK_URL_ENDPOINT = CONFIG.IK_URL_ENDPOINT;

// ----- Responsive image sizes matching our CSS column layout -----
// CSS breakpoints: 4 columns (default), 3 at 1200px, 2 at 900px, 1 at 540px
// Each image takes roughly 1/columns of the viewport width
const RESPONSIVE_SIZES =
  "(max-width: 540px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw";

/**
 * Build an ImageKit-optimised URL from an Unsplash raw URL.
 *
 * ImageKit.buildSrc() constructs a URL through ImageKit's CDN with transforms:
 * - format: "auto" — serves WebP/AVIF based on browser support
 * - quality: 80    — good balance between file size and visual quality
 *
 * The Unsplash raw URL (photo.urls.raw) is passed as the `src` so ImageKit
 * fetches the original from Unsplash, optimises it, and caches + serves it
 * from its CDN edge nodes.
 */
function buildImageKitUrl(unsplashRawUrl) {
  return ImageKit.buildSrc({
    urlEndpoint: IK_URL_ENDPOINT,
    src: `/${unsplashRawUrl}`,
    transformation: [{ format: "auto" }, { quality: 80 }],
  });
}

/**
 * Get responsive image attributes (src, srcSet, sizes) from ImageKit SDK.
 *
 * ImageKit.getResponsiveImageAttributes() generates a srcset with multiple
 * width variants (e.g. 256w, 384w, 640w, 750w, 828w, 1080w, 1200w, etc.)
 * so the browser picks the best size based on:
 *   1. The rendered image width (from the `sizes` attribute)
 *   2. The device pixel ratio (e.g. 2x on Retina)
 *
 * Returns: { src: "...", srcSet: "...", sizes: "..." }
 */
function getResponsiveAttrs(unsplashRawUrl) {
  return ImageKit.getResponsiveImageAttributes({
    urlEndpoint: IK_URL_ENDPOINT,
    src: `/${unsplashRawUrl}`,
    sizes: RESPONSIVE_SIZES,
    transformation: [{ format: "auto" }, { quality: 80 }],
  });
}

// Number of above-the-fold images that get high fetch priority
// (roughly the first row of the grid — 4 columns on desktop)
const ABOVE_FOLD_COUNT = 4;

/**
 * Create an image card element from an Unsplash photo object.
 *
 * @param {object} photo - Unsplash photo object
 * @param {number} index - Position in the current render batch
 *
 * Loading strategy:
 * - First 4 images (above the fold): fetchpriority="high" — tells the browser
 *   to prioritise these downloads for faster LCP (Largest Contentful Paint)
 * - All remaining images (below the fold): loading="lazy" — browser defers
 *   downloading until the image is near the viewport, saving bandwidth
 */
function createImageCard(photo, index) {
  const imgCard = document.createElement("div");
  imgCard.classList.add("image-card");

  const imgEle = document.createElement("img");

  // Get responsive attributes from ImageKit SDK
  const responsive = getResponsiveAttrs(photo.urls.raw);

  if (responsive) {
    // src: fallback URL for browsers that don't support srcset
    imgEle.src = responsive.src;

    // srcset: comma-separated list of URLs with width descriptors (e.g. "url 640w, url 1080w")
    // The browser uses this + sizes to pick the optimal image
    if (responsive.srcSet) imgEle.setAttribute("srcset", responsive.srcSet);

    // sizes: tells the browser how wide the image will be rendered at each breakpoint
    // so it can pick the right srcset entry BEFORE the image loads
    if (responsive.sizes) imgEle.setAttribute("sizes", responsive.sizes);
  } else {
    // Fallback: if ImageKit SDK isn't available, use a direct ImageKit URL
    imgEle.src = buildImageKitUrl(photo.urls.raw);
  }

  // Above-the-fold images: fetch them with high priority for faster LCP
  // Below-the-fold images: lazy load so the browser only downloads them when needed
  if (index < ABOVE_FOLD_COUNT) {
    imgEle.fetchPriority = "high";
  } else {
    imgEle.loading = "lazy";
  }

  imgEle.alt = photo.alt_description || "Unsplash image";

  // Overlay with download button (appears on hover via CSS)
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const photographer = document.createElement("div");
  photographer.classList.add("photographer");

  const downloadBtn = document.createElement("button");
  downloadBtn.classList.add("download-btn");
  downloadBtn.textContent = "\u2B07\uFE0F";

  downloadBtn.addEventListener("click", () => {
    window.open(photo.links.download, "_blank");
  });

  overlay.append(photographer, downloadBtn);
  imgCard.append(overlay, imgEle);
  imgSection.append(imgCard);
}

// ----- Search button handler -----
searchBtn.addEventListener("click", async () => {
  const searchTextValue = searchtext.value.trim();
  if (!searchTextValue) return;

  searchtext.value = "";

  const response = await fetch(
    `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(searchTextValue)}&per_page=20&client_id=${UNSPLASH_ACCESS_KEY}`,
  );
  const data = await response.json();

  imgSection.innerHTML = "";

  data.results.forEach((photo, index) => createImageCard(photo, index));
});

// ----- Load random images on page load -----
document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(
    `${UNSPLASH_BASE_URL}/photos/random?count=50&client_id=${UNSPLASH_ACCESS_KEY}`,
  );
  const data = await response.json();

  data.forEach((photo, index) => createImageCard(photo, index));
});

// ----- Category bar click handlers -----
for (let category of categoryBar) {
  category.addEventListener("click", async () => {
    // Remove active class from all buttons, add to the clicked one
    categoryBar.forEach((btn) => btn.classList.remove("active"));
    category.classList.add("active");

    const categoryText = category.innerText.trim();

    const response = await fetch(
      `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(categoryText)}&per_page=20&client_id=${UNSPLASH_ACCESS_KEY}`,
    );
    const data = await response.json();

    imgSection.innerHTML = "";

    data.results.forEach((photo, index) => createImageCard(photo, index));
  });
}
