# Google Sheets RSVP Integration Setup

## Step 1: Create a Google Sheet

1. Go to sheets.google.com
2. Create a new sheet called "Wedding RSVPs"
3. Add these headers in Row 1:
   `Timestamp | Name | Email | Phone | Guests | Attending | Dietary | Notes`

## Step 2: Create a Google Apps Script

1. In your sheet, go to **Extensions → Apps Script**
2. Delete any existing code and paste the following:

```javascript
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const params = e.parameter;
    
    sheet.appendRow([
      params.timestamp || new Date().toISOString(),
      params.name      || '',
      params.email     || '',
      params.phone     || '',
      params.guests    || '1',
      params.attending || 'yes',
      params.dietary   || '',
      params.notes     || '',
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 3: Deploy the Script

1. Click **Deploy → New Deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy**
6. Copy the Web App URL

## Step 4: Add URL to your project

1. Open `.env.local` in the project root
2. Replace `YOUR_SCRIPT_ID` with your actual script ID from the URL:
   ```
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   NEXT_PUBLIC_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

## Step 5: Redeploy your Next.js app

RSVPs will now automatically appear in your Google Sheet in real time! ✓
