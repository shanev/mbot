const fs = require('fs');
const vision = require('@google-cloud/vision');

// Hack around Google API's requirement of having a locally stored API keyfile.
// Store encoded version in environment variable, then decode that to a local file.
const googleKey = Buffer.from(process.env.GOOGLE_API_KEY_ENCODED, 'base64').toString('ascii');
const keyFilename = 'mbot-keyfile.json';
fs.writeFile(keyFilename, googleKey, (err) => {
  if (err) {
    console.error(err);
  }
});

// Creates a client
const client = new vision.ImageAnnotatorClient({ keyFilename });

class Vision {
  constructor(imageUri) {
    this.imageUri = imageUri
  }

  async detectSymbol() {
    const text = await this._detectText();
    const match = text.match(/[A-Z0-9]{3,5}/);
    if (match != null) {
      return match[0];
    } else {
      return null;
    }
  }

  async _detectText() {
    try {
      const results = await client.textDetection(this.imageUri);
      return results[0].fullTextAnnotation.text;
    } catch(err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = Vision;
