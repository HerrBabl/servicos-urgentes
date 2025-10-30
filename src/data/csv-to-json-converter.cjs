// CSV to JSON Converter for Emergency Services Directory
// Place your CSV files in the same directory as this script

const fs = require('fs');

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

function csvToJson(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = parseCSVLine(lines[i]);
    const obj = {};
    
    headers.forEach((header, index) => {
      let value = values[index] ? values[index].trim() : '';
      
      // Convert specific fields to appropriate types
      if (header === 'star_rating') {
        // Remove quotes and handle Brazilian decimal format
        const cleanValue = value.replace(/"/g, '').replace(',', '.');
        obj[header] = parseFloat(cleanValue) || 0;
      } else if (header === 'total_reviews') {
        obj[header] = parseInt(value) || 0;
      } else if (header === 'is_24h' || header === 'Identifies as women-owned' || header === 'LGBTQ+ friendly') {
        obj[header] = value.toLowerCase() === 'true' || value.toLowerCase() === 'sim' || value === '1' || value.toLowerCase() === 'y';
      } else {
        obj[header] = value;
      }
    });
    
    // Generate WhatsApp link from phone number
    if (obj.phone_number) {
      const cleanPhone = obj.phone_number.replace(/\D/g, '');
      if (cleanPhone.length >= 10) {
        obj.whatsapp = `https://wa.me/55${cleanPhone}`;
      }
    }
    
    result.push(obj);
  }
  
  return result;
}

// Process each service type
const serviceTypes = ['encanadores', 'eletricistas', 'chaveiros', 'ar_condicionado'];

serviceTypes.forEach(serviceType => {
  try {
    const csvContent = fs.readFileSync(`${serviceType}.csv`, 'utf-8');
    const jsonData = csvToJson(csvContent);
    
    // Write JSON file
    fs.writeFileSync(
      `${serviceType}.json`,
      JSON.stringify(jsonData, null, 2),
      'utf-8'
    );
    
    // Also create a JavaScript module for Astro
    const jsContent = `export const ${serviceType} = ${JSON.stringify(jsonData, null, 2)};`;
    fs.writeFileSync(
      `${serviceType}.js`,
      jsContent,
      'utf-8'
    );
    
    console.log(`✅ Converted ${serviceType}.csv → ${serviceType}.json and ${serviceType}.js`);
    console.log(`   Found ${jsonData.length} businesses`);
  } catch (error) {
    console.error(`❌ Error processing ${serviceType}:`, error.message);
  }
});

console.log('\n✨ Conversion complete! Place the .js files in your Astro src/data/ directory');
