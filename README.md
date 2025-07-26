# Recipe Collection Mobile App

A mobile-optimized web app for browsing and searching recipes, powered by Google Sheets and Google Apps Script.

## Features

- 📱 Mobile-responsive design
- 🔍 Search recipes by name, cuisine, or ingredients
- 🏷️ Filter by cuisine type and recipe category
- 📖 Detailed recipe view with ingredients and instructions
- 💾 Offline functionality (PWA)
- 🚀 Fast loading with Google Apps Script backend

## Setup

1. **Google Sheet Setup:**
   - Create a Google Sheet with recipe data
   - Use columns: Recipe_Name, Cuisine, Type, Prep_Time, Cook_Time, Total_Time, Servings, Source, Tags, Ingredients, Instructions, Variations_Tips

2. **Google Apps Script:**
   - Open Extensions → Apps Script from your Google Sheet
   - Copy the code from `apps-script-code.js`
   - Deploy as web app with public access
   - Copy the web app URL

3. **Frontend Configuration:**
   - Update `API_URL` in `app.js` with your Google Apps Script URL
   - Deploy to GitHub Pages or any static hosting service

## Deployment

This app is designed to be deployed on GitHub Pages:

1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Your app will be available at `https://username.github.io/repository-name`

## Technology Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Backend:** Google Apps Script
- **Data:** Google Sheets
- **Hosting:** GitHub Pages
- **PWA:** Service Worker for offline functionality

## License

MIT License