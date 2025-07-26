# RocketHaus Recipes Mobile App - Project Context

## Project Overview
A mobile-optimized Progressive Web App (PWA) for browsing and searching recipes, built with vanilla HTML/CSS/JavaScript frontend and Google Sheets as a backend CMS.

## Architecture
- **Frontend**: Static HTML/CSS/JavaScript hosted on GitHub Pages
- **Backend**: Google Apps Script web app providing REST API
- **Database**: Google Sheets (easy content management)
- **Hosting**: GitHub Pages (free static hosting)
- **PWA**: Service worker for offline functionality

## Current Implementation

### Data Structure
The recipe database uses these columns in Google Sheets:
- `Recipe_Name` - Name of the recipe
- `Cuisine` - Type of cuisine (Mediterranean, Italian, American, etc.)
- `Type` - Category (Spice Blend, Stew, Pasta, Soup, etc.)
- `Prep_Time` - Preparation time in minutes
- `Cook_Time` - Cooking time in minutes  
- `Total_Time` - Total time in minutes
- `Servings` - Number of servings
- `Source` - Recipe source (URL, page number, or blank)
- `Tags` - Pipe-separated tags (21DSD|Vegetarian|One Pot|etc.)
- `Ingredients` - Comma-separated ingredients list
- `Instructions` - Numbered step instructions
- `Variations_Tips` - Additional notes and variations

### Key Features Implemented
- ✅ Responsive mobile-first design
- ✅ Real-time search across recipes, ingredients, and tags
- ✅ Filter by cuisine type and recipe category
- ✅ Full-page recipe detail view (cooking-safe, no accidental closure)
- ✅ Progressive Web App (installable, offline-capable)
- ✅ Touch-optimized interface
- ✅ Fast loading with minimal dependencies
- ✅ Clean recipe card display (removed prep/cook times)
- ✅ Prominent close button for recipe details

### File Structure
```
/
├── index.html          # Main app interface
├── styles.css          # Mobile-optimized CSS
├── app.js             # Core application logic
├── manifest.json      # PWA manifest
├── sw.js             # Service worker for offline
├── apps-script-code.js # Google Apps Script API code
├── RecipeDatabase.csv # Sample data structure
└── README.md         # Documentation
```

### Current API Endpoints
Google Apps Script provides these endpoints:
- `GET /` - Returns all recipes as JSON
- `GET /?action=search&q=query` - Search recipes
- `GET /?action=recipe&id=index` - Get specific recipe

### Deployment Status
- **Repository**: https://github.com/mritty85/recipe-app
- **Live App**: https://mritty85.github.io/recipe-app
- **Google Apps Script URL**: https://script.google.com/macros/s/AKfycby3dnWwo1wELZqjkT0NvOJzlW5hwB88IdY-MLDIXb5PxDGWBODgGS-kNGy-wScSlkoemQ/exec

## Technology Stack
- **Frontend**: Vanilla JavaScript (no frameworks)
- **CSS**: Custom responsive design with CSS Grid/Flexbox
- **Backend**: Google Apps Script (serverless)
- **Data**: Google Sheets API
- **Build**: None required (static files)
- **Deploy**: Git push triggers GitHub Pages deployment

## Future Enhancement Ideas

### Design & UX
- [ ] Recipe images/photos
- [ ] Dark mode toggle
- [ ] Recipe rating system
- [ ] Favorite recipes functionality
- [ ] Recipe sharing (social links)
- [ ] Print-friendly recipe view
- [ ] Recipe nutrition information display
- [ ] Advanced search filters (dietary restrictions, cook time ranges)

### Functionality
- [ ] Recipe collections/meal planning
- [ ] Shopping list generation from recipes
- [ ] Recipe scaling (adjust servings)
- [ ] Recipe notes/personal modifications
- [ ] Recipe import from URLs
- [ ] Voice search capability
- [ ] Barcode scanning for ingredients

### Technical Improvements
- [ ] Image optimization and lazy loading
- [ ] Enhanced caching strategies
- [ ] Performance monitoring
- [ ] Analytics integration
- [ ] Error handling improvements
- [ ] Loading states and skeleton screens
- [ ] Internationalization (multiple languages)

### Backend Enhancements
- [ ] Recipe categorization/tagging improvements
- [ ] Bulk recipe import/export
- [ ] Recipe versioning
- [ ] User-generated content (if auth added)
- [ ] Recipe recommendation engine
- [ ] Integration with recipe APIs

## Development Notes
- Built mobile-first with touch interactions in mind
- Uses semantic HTML for accessibility
- CSS Grid for responsive recipe card layout
- Service worker caches static assets for offline use
- Google Apps Script handles CORS automatically
- No build process required - simple deployment pipeline
- Recipe detail uses edge-to-edge full-page view for cooking safety
- Source URLs display as "Recipe Source" links for cleaner presentation
- Only explicit close button can dismiss recipe view (no click-outside)

## Key Design Decisions
1. **Vanilla JavaScript**: Keeps bundle size minimal, fast loading
2. **Google Sheets**: Non-technical users can easily manage recipes
3. **GitHub Pages**: Free hosting with automatic deployments
4. **PWA**: Installable, works offline, feels native on mobile
5. **Single Page App**: Smooth navigation without page reloads

## Performance Characteristics
- Initial load: ~50KB total (HTML/CSS/JS)
- Recipe data: Fetched once, cached in memory
- Images: None currently (keeps it fast)
- Offline: Full functionality available after first load
- Mobile-optimized: Touch targets, readable fonts, fast scrolling

This foundation provides excellent scalability for future enhancements while maintaining simplicity and performance.