// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

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
