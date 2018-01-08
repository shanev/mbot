const assert = require('assert');
const Vision = require('../src/vision');

describe('Vision', () => {
  describe('detectSymbol', () => {
    it('should detect symbol for TRON', async () => {
      const imageUri = 'https://pbs.twimg.com/media/DR-kkH4XcAAQ-vc.jpg';
      const vision = new Vision(imageUri);
      assert.equal(await vision.detectSymbol(), 'TRX');
    }).timeout(20000);

    it('should detect symbol for Factom', async () => {
      const imageUri = 'https://pbs.twimg.com/media/DSdsmtfUMAAtWLx.jpg';
      const vision = new Vision(imageUri);
      assert.equal(await vision.detectSymbol(), 'FCT');
    }).timeout(20000);

    it('should detect symbol for Dodge', async () => {
      const imageUri = 'https://pbs.twimg.com/media/DTBhOA_VQAE-h26.jpg';
      const vision = new Vision(imageUri);
      assert.equal(await vision.detectSymbol(), 'DOGE');
    }).timeout(20000);
  });
});
