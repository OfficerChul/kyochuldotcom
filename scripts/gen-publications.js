/* eslint-disable */
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const PDF_PATH = path.resolve(__dirname, '../public/Kyochul_Jang___CV.pdf');
const OUT_PATH = path.resolve(__dirname, '../src/features/portfolio/components/Publications/publications.json');

function parsePublicationItem(text) {
  const stripped = text.replace(/^\s*[ivxlcdm]+\)\s*/i, '').trim();
  const normalizedEntry = stripped.replace(/,\s*(?=[A-Z])/g, ', ').replace(/\s+/g, ' ').trim();

  // Extract from pattern: "Author1, Author2, ... (YEAR). Title. Venue. URL"
  const yearMatch = normalizedEntry.match(/\((\d{4})\)/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : undefined;
  
  // Split by year to get authors part
  const parts = normalizedEntry.split(/\(\d{4}\)\.?\s*/);
  const authorsPart = parts[0] ? parts[0].trim() : '';
  const restPart = parts[1] ? parts[1].trim() : '';
  
  // Parse authors - split by comma but preserve "Last, F." format
  const authors = [];
  // Split authors by ", " but keep the format intact
  const authorParts = authorsPart.split(/,\s*(?=[A-Z][a-z])/);
  for (let i = 0; i < authorParts.length; i++) {
    const part = authorParts[i].trim();
    if (part) {
      // If the part doesn't end with a period and the next part looks like an initial, combine them
      if (i + 1 < authorParts.length && !part.endsWith('.') && /^[A-Z]\./.test(authorParts[i + 1])) {
        authors.push(part + ', ' + authorParts[i + 1].trim());
        i++; // Skip the next part as we've combined it
      } else {
        authors.push(part);
      }
    }
  }
  
  // Extract URL if present
  const urlMatch = restPart.match(/https?:\/\/[^\s]+/);
  const link = urlMatch ? urlMatch[0].trim() : undefined;
  
  // Clean rest part from URL
  const cleanRest = link ? restPart.replace(link, '').trim() : restPart;
  
  // Split remaining by periods to get title and venue
  const restParts = cleanRest.split(/\.\s+/).filter(Boolean);
  const title = restParts[0] || '';
  const venue = restParts.slice(1).join('. ').trim() || undefined;
  
  return {
    title: title.trim(),
    authors,
    venue,
    year,
    link
  };
}

function extractPublications(text) {
  const lines = text.split(/\r?\n/);
  const sectionBoundaries = [
    'Awards and Honors',
    'Awards & Honors',
    'Awards',
    'Honors',
    'Patents',
    'Work Experience',
    'Professional Experience',
    'Teaching',
    'Education',
    'Service',
    'Activities',
    'Leadership',
    'Talks',
    'Presentations',
    'Projects'
  ].map(header => header.toLowerCase());

  let inPublications = false;
  const items = [];
  let currentItem = '';

  lines.forEach(rawLine => {
    const line = rawLine.trim();

    if (!inPublications) {
      if (/^Publications?$/i.test(line)) {
        inPublications = true;
      }
      return;
    }

    if (!line) {
      return;
    }

    const normalized = line.toLowerCase();
    if (sectionBoundaries.some(header => normalized.startsWith(header))) {
      if (currentItem.trim()) {
        items.push(currentItem.trim());
      }
      currentItem = '';
      inPublications = false;
      return;
    }

    if (/^\s*[ivxlcdm]+\)/i.test(line)) {
      if (currentItem.trim()) {
        items.push(currentItem.trim());
      }
      currentItem = line;
    } else {
      currentItem = currentItem ? `${currentItem} ${line}` : line;
    }
  });

  if (currentItem.trim()) {
    items.push(currentItem.trim());
  }

  return items
    .map(item => parsePublicationItem(item))
    .filter(pub => pub.title && pub.title.length > 3);
}

(async () => {
  try {
    if (!fs.existsSync(PDF_PATH)) {
      console.warn('CV PDF not found:', PDF_PATH);
      fs.writeFileSync(OUT_PATH, '[]');
      process.exit(0);
    }
    
    const dataBuffer = fs.readFileSync(PDF_PATH);
    const parsed = await pdf(dataBuffer);
    const publications = extractPublications(parsed.text);
    
    // Ensure output directory exists
    const outDir = path.dirname(OUT_PATH);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    
    fs.writeFileSync(OUT_PATH, JSON.stringify(publications, null, 2));
    console.log(`✅ Generated ${publications.length} publications → ${OUT_PATH}`);
  } catch (e) {
    console.error('❌ Failed to generate publications:', e);
    // Don't fail the build
    try {
      fs.writeFileSync(OUT_PATH, '[]');
    } catch {}
    process.exit(0);
  }
})();
