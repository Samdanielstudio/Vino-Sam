import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());

// Path to data file
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'rsvps.json');

// Ensure data directory and file exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([], null, 2), 'utf8');
}

// Helper to read RSVPs
const readRSVPs = () => {
  try {
    const rawData = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading RSVPs file:', error);
    return [];
  }
};

// Helper to write RSVPs
const writeRSVPs = (rsvps) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(rsvps, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing RSVPs file:', error);
    return false;
  }
};

// ---------------- API ENDPOINTS ----------------

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    server: 'Vinoliya & Samdaniel Wedding RSVP API',
    googleSheetUrl: 'https://docs.google.com/spreadsheets/d/1quzVgJ3Vntt7N8pMxsioeyGEKjovaFfMBAQX65xPfso/edit?usp=sharing',
    timestamp: new Date().toISOString()
  });
});

// Config Endpoint
app.get('/api/config', (req, res) => {
  res.json({
    googleSheetUrl: 'https://docs.google.com/spreadsheets/d/1quzVgJ3Vntt7N8pMxsioeyGEKjovaFfMBAQX65xPfso/edit?usp=sharing',
    googleSheetWebhookUrl: process.env.GOOGLE_SHEET_WEBHOOK_URL || null
  });
});

// Bulk Import Endpoint (Load Google Sheet entries or JSON array into backend database)
app.post('/api/import', (req, res) => {
  const { entries } = req.body;

  if (!Array.isArray(entries)) {
    return res.status(400).json({
      success: false,
      message: 'Expected an array of entries to import.'
    });
  }

  const existingRSVPs = readRSVPs();

  const importedRSVPs = entries.map((entry, index) => ({
    id: entry.id || ('rsvp_import_' + Date.now() + '_' + index),
    name: entry.name || entry.FullName || entry['Guest Name'] || 'Guest ' + (index + 1),
    phone: entry.phone || entry.Phone || entry['Phone Number'] || '',
    email: entry.email || entry.Email || '',
    attending: entry.attending || entry.Attending || 'yes',
    guestsCount: Number(entry.guestsCount || entry.Guests || entry['Number of Guests']) || 1,
    events: Array.isArray(entry.events) ? entry.events : ['reception', 'marriage'],
    message: entry.message || entry.Message || entry.Wishes || '',
    createdAt: entry.createdAt || new Date().toISOString()
  }));

  const updatedRSVPs = [...existingRSVPs, ...importedRSVPs];

  if (writeRSVPs(updatedRSVPs)) {
    console.log(`[RSVP IMPORT] Successfully imported ${importedRSVPs.length} entries.`);
    return res.status(201).json({
      success: true,
      message: `Successfully imported ${importedRSVPs.length} RSVP entries.`,
      importedCount: importedRSVPs.length,
      totalCount: updatedRSVPs.length
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'Failed to write imported RSVPs to storage.'
    });
  }
});

// Submit RSVP Endpoint
app.post('/api/rsvp', async (req, res) => {
  const { name, phone, email, attending, guestsCount, events, message } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Name is required to submit an RSVP.'
    });
  }

  const rsvps = readRSVPs();

  const newRSVP = {
    id: 'rsvp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    name: name.trim(),
    phone: phone ? phone.trim() : '',
    email: email ? email.trim() : '',
    attending: attending !== undefined ? attending : 'yes',
    guestsCount: Number(guestsCount) || 1,
    events: Array.isArray(events) ? events : ['reception', 'marriage'],
    message: message ? message.trim() : '',
    createdAt: new Date().toISOString()
  };

  rsvps.push(newRSVP);

  if (writeRSVPs(rsvps)) {
    console.log(`[RSVP SUCCESS] Received RSVP from ${newRSVP.name} (${newRSVP.attending === 'yes' ? 'Attending' : 'Not Attending'})`);

    // Optional: Forward to Google Sheet Webhook if configured
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRSVP)
        }).catch(err => console.error("Google Sheet webhook error:", err));
      } catch (err) {
        console.error("Google Sheet sync error:", err);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your RSVP has been confirmed.',
      rsvp: newRSVP
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'Failed to save RSVP due to a server error.'
    });
  }
});

// Get All RSVPs Endpoint (Admin View)
app.get('/api/rsvps', (req, res) => {
  const rsvps = readRSVPs();
  res.json({
    success: true,
    googleSheetUrl: 'https://docs.google.com/spreadsheets/d/1quzVgJ3Vntt7N8pMxsioeyGEKjovaFfMBAQX65xPfso/edit?usp=sharing',
    totalCount: rsvps.length,
    rsvps
  });
});

// Get RSVP Summary Stats Endpoint
app.get('/api/rsvps/stats', (req, res) => {
  const rsvps = readRSVPs();
  
  const attendingList = rsvps.filter(r => r.attending === 'yes');
  const totalAttendingGuests = attendingList.reduce((sum, r) => sum + (Number(r.guestsCount) || 1), 0);
  const receptionAttending = attendingList.filter(r => r.events && r.events.includes('reception')).length;
  const marriageAttending = attendingList.filter(r => r.events && r.events.includes('marriage')).length;

  res.json({
    success: true,
    googleSheetUrl: 'https://docs.google.com/spreadsheets/d/1quzVgJ3Vntt7N8pMxsioeyGEKjovaFfMBAQX65xPfso/edit?usp=sharing',
    stats: {
      totalSubmissions: rsvps.length,
      attendingSubmissions: attendingList.length,
      notAttendingSubmissions: rsvps.length - attendingList.length,
      totalGuests: totalAttendingGuests,
      receptionCount: receptionAttending,
      marriageCount: marriageAttending
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`💒 RSVP Backend Server running on http://localhost:${PORT}`);
  console.log(`Target Google Sheet: https://docs.google.com/spreadsheets/d/1quzVgJ3Vntt7N8pMxsioeyGEKjovaFfMBAQX65xPfso/edit?usp=sharing`);
  console.log(`API Endpoints:`);
  console.log(`- POST http://localhost:${PORT}/api/rsvp`);
  console.log(`- POST http://localhost:${PORT}/api/import`);
  console.log(`- GET  http://localhost:${PORT}/api/rsvps`);
  console.log(`- GET  http://localhost:${PORT}/api/rsvps/stats`);
  console.log(`- GET  http://localhost:${PORT}/api/health`);
  console.log(`=================================================`);
});
