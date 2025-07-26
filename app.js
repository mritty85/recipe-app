class RecipeApp {
    constructor() {
        // Replace with your actual Google Apps Script web app URL
        this.API_URL = 'https://script.google.com/macros/s/AKfycby3dnWwo1wELZqjkT0NvOJzlW5hwB88IdY-MLDIXb5PxDGWBODgGS-kNGy-wScSlkoemQ/exec';
        this.recipes = [];
        this.filteredRecipes = [];
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadRecipes();
        this.populateFilters();
        this.renderRecipes();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const cuisineFilter = document.getElementById('cuisineFilter');
        const typeFilter = document.getElementById('typeFilter');
        const modal = document.getElementById('recipeModal');
        const closeBtn = document.querySelector('.close');

        searchInput.addEventListener('input', () => this.handleSearch());
        searchBtn.addEventListener('click', () => this.handleSearch());
        cuisineFilter.addEventListener('change', () => this.applyFilters());
        typeFilter.addEventListener('change', () => this.applyFilters());
        
        closeBtn.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });

        // Enter key for search
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
    }

    async loadRecipes() {
        try {
            const response = await fetch(this.API_URL);
            this.recipes = await response.json();
            this.filteredRecipes = [...this.recipes];
        } catch (error) {
            console.error('Error loading recipes:', error);
            this.showError('Failed to load recipes. Please try again later.');
        }
    }

    populateFilters() {
        const cuisines = [...new Set(this.recipes.map(r => r.Cuisine))].sort();
        const types = [...new Set(this.recipes.map(r => r.Type))].sort();

        const cuisineFilter = document.getElementById('cuisineFilter');
        const typeFilter = document.getElementById('typeFilter');

        cuisines.forEach(cuisine => {
            const option = document.createElement('option');
            option.value = cuisine;
            option.textContent = cuisine;
            cuisineFilter.appendChild(option);
        });

        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeFilter.appendChild(option);
        });
    }

    handleSearch() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        this.filteredRecipes = this.recipes.filter(recipe => 
            recipe.Recipe_Name.toLowerCase().includes(query) ||
            recipe.Cuisine.toLowerCase().includes(query) ||
            recipe.Type.toLowerCase().includes(query) ||
            recipe.Tags.toLowerCase().includes(query) ||
            recipe.Ingredients.toLowerCase().includes(query)
        );
        this.applyFilters();
    }

    applyFilters() {
        const cuisineFilter = document.getElementById('cuisineFilter').value;
        const typeFilter = document.getElementById('typeFilter').value;

        let filtered = [...this.filteredRecipes];

        if (cuisineFilter) {
            filtered = filtered.filter(recipe => recipe.Cuisine === cuisineFilter);
        }

        if (typeFilter) {
            filtered = filtered.filter(recipe => recipe.Type === typeFilter);
        }

        this.renderRecipes(filtered);
    }

    renderRecipes(recipes = this.filteredRecipes) {
        const grid = document.getElementById('recipeGrid');
        
        if (recipes.length === 0) {
            grid.innerHTML = '<div class="no-results">No recipes found. Try adjusting your search or filters.</div>';
            return;
        }

        grid.innerHTML = recipes.map((recipe, index) => `
            <div class="recipe-card" onclick="app.showRecipeDetail(${this.recipes.indexOf(recipe)})">
                <div class="recipe-title">${recipe.Recipe_Name}</div>
                <div class="recipe-meta">
                    <span>${recipe.Cuisine} • ${recipe.Type}</span>
                    <span class="recipe-time">${recipe.Total_Time} min</span>
                </div>
                <div class="recipe-meta">
                    <span>Serves: ${recipe.Servings}</span>
                    <span>Prep: ${recipe.Prep_Time}m | Cook: ${recipe.Cook_Time}m</span>
                </div>
                ${recipe.Tags ? `<div class="recipe-tags">${this.formatTags(recipe.Tags)}</div>` : ''}
            </div>
        `).join('');
    }

    formatTags(tags) {
        return tags.split('|').map(tag => 
            `<span class="tag">${tag.trim()}</span>`
        ).join('');
    }

    showRecipeDetail(index) {
        const recipe = this.recipes[index];
        const modal = document.getElementById('recipeModal');
        const detail = document.getElementById('recipeDetail');

        detail.innerHTML = `
            <div class="recipe-detail">
                <h2>${recipe.Recipe_Name}</h2>
                <div class="detail-meta">
                    <div><strong>Cuisine:</strong> ${recipe.Cuisine}</div>
                    <div><strong>Type:</strong> ${recipe.Type}</div>
                    <div><strong>Prep Time:</strong> ${recipe.Prep_Time} min</div>
                    <div><strong>Cook Time:</strong> ${recipe.Cook_Time} min</div>
                    <div><strong>Total Time:</strong> ${recipe.Total_Time} min</div>
                    <div><strong>Servings:</strong> ${recipe.Servings}</div>
                    ${recipe.Source ? `<div><strong>Source:</strong> ${this.formatSource(recipe.Source)}</div>` : ''}
                </div>
                ${recipe.Tags ? `<div><strong>Tags:</strong> ${this.formatTags(recipe.Tags)}</div>` : ''}
                
                <div class="ingredients">
                    <h3>Ingredients</h3>
                    <ul>${this.formatIngredients(recipe.Ingredients)}</ul>
                </div>
                
                <div class="instructions">
                    <h3>Instructions</h3>
                    <ol>${this.formatInstructions(recipe.Instructions)}</ol>
                </div>
                
                ${recipe.Variations_Tips ? `
                    <div class="variations">
                        <h3>Variations & Tips</h3>
                        <p>${recipe.Variations_Tips}</p>
                    </div>
                ` : ''}
            </div>
        `;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    formatSource(source) {
        if (source.startsWith('http')) {
            return `<a href="${source}" target="_blank" rel="noopener">${source}</a>`;
        }
        return source;
    }

    formatIngredients(ingredients) {
        return ingredients.split(',').map(ingredient => 
            `<li>${ingredient.trim()}</li>`
        ).join('');
    }

    formatInstructions(instructions) {
        // Split by numbered steps (1. 2. 3. etc.)
        const steps = instructions.split(/\d+\./).filter(step => step.trim());
        return steps.map(step => 
            `<li>${step.trim()}</li>`
        ).join('');
    }

    closeModal() {
        document.getElementById('recipeModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    showError(message) {
        const grid = document.getElementById('recipeGrid');
        grid.innerHTML = `<div class="no-results">${message}</div>`;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new RecipeApp();
});

// Service Worker registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}