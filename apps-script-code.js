function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  // Convert to JSON format
  const recipes = rows.map(row => {
    const recipe = {};
    headers.forEach((header, index) => {
      recipe[header] = row[index];
    });
    return recipe;
  });
  
  // Handle query parameters
  const action = e.parameter.action;
  const id = e.parameter.id;
  
  if (action === 'search') {
    const query = e.parameter.q ? e.parameter.q.toLowerCase() : '';
    const filtered = recipes.filter(recipe => 
      recipe.Recipe_Name.toLowerCase().includes(query) ||
      recipe.Cuisine.toLowerCase().includes(query) ||
      recipe.Type.toLowerCase().includes(query) ||
      recipe.Tags.toLowerCase().includes(query)
    );
    return ContentService
      .createTextOutput(JSON.stringify(filtered))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  if (action === 'recipe' && id) {
    const recipe = recipes[parseInt(id)];
    return ContentService
      .createTextOutput(JSON.stringify(recipe || {}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Default: return all recipes
  return ContentService
    .createTextOutput(JSON.stringify(recipes))
    .setMimeType(ContentService.MimeType.JSON);
}

function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}