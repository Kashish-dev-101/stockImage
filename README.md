# Stock Image Finder (Unsplash API Demo)

Live demo: https://kashish-dev-101.github.io/stockImage/

A lightweight stock image web app built to demonstrate how to consume an external REST API (Unsplash), process the response, and render results dynamically on a single page using vanilla JavaScript.

This project focuses on practical API integration patterns (fetch, async/await, DOM rendering, event driven UI). In the next iteration, I plan to integrate ImageKit for image optimization and faster delivery.

## Features

1. Random image feed on page load  
   Fetches 50 random images from Unsplash and renders them as cards.

2. Keyword search  
   Users can type a query and load 20 matching images using the Unsplash Search API.

3. Category based browsing  
   Clicking a category button triggers a search using that category keyword and updates the grid.

4. Interactive image cards  
   Each image renders inside a card with an overlay and a download button.

5. Download flow  
   The download button opens the Unsplash download link in a new tab.

## Tech Stack

1. HTML
2. CSS
3. JavaScript (vanilla)
4. Unsplash REST API

## How it works (high level)

1. On initial page load (DOMContentLoaded), the app requests a random image batch and renders it.
2. When the user clicks the search button, the app calls the search endpoint using the typed keyword and re renders the grid.
3. When the user clicks a category, the app calls the same search endpoint with the category label and re renders the grid.
4. Images are rendered using JavaScript DOM APIs (createElement, classList, append), not template strings.

## API Endpoints Used

1. Random Photos  
   GET https://api.unsplash.com/photos/random?count=50&client_id=YOUR_ACCESS_KEY

2. Search Photos  
   GET https://api.unsplash.com/search/photos?query=KEYWORD&per_page=20&client_id=YOUR_ACCESS_KEY

## Project Structure (typical)

1. index.html  
   Page layout, search input, category bar, container for images

2. style.css  
   Grid layout, card styles, overlay styling, responsive UI

3. script.js  
   API calls, event listeners, DOM rendering logic

## Running locally

1. Clone the repository
2. Open the project folder
3. Run using any local server (recommended)  
   Example: VS Code Live Server
4. Open index.html in the browser

## Configuration (important)

Right now, the Unsplash access key is used directly in the fetch URL as client_id.

For a cleaner and safer approach, move the key into a separate config file or environment based setup (especially if you later add a backend). For a simple front end only demo, a common approach is:

1. Create a file named config.js
2. Store your access key there
3. Reference it in script.js when building the request URL

## Notes about Unsplash guidelines

If you expand this project, consider using the official download tracking endpoint (download_location) before redirecting users to the final download, as recommended by Unsplash API guidelines.

## Next Improvements (planned)

1. ImageKit integration for optimization  
   Deliver resized and compressed images  
   Automatic modern formats where applicable  
   Better performance on slower networks

2. Better UX  
   Loading states (skeletons)  
   Empty state when no results are found  
   Error handling UI for API failures

3. Pagination or infinite scroll  
   Improve browsing for large result sets

4. Photographer credits  
   Display photographer name and link to the profile

## Credits

Images provided by Unsplash via the Unsplash API.

## License

This project is for learning and demo purposes. Add a license file if you plan to make it reusable as a template.
