const assert = require('assert');
const Vision = require('../src/vision');

describe('Vision', () => {
  const imageUri = 'https://pbs.twimg.com/media/DR-kkH4XcAAQ-vc.jpg';
  const vision = new Vision(imageUri);

  describe('detectSymbol', () => {
    it('should detect symbol', async () => {
      assert.equal(await vision.detectSymbol(), 'TRON');
    }).timeout(5000);
  });
});
