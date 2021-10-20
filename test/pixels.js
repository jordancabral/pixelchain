const Pixels = artifacts.require('Pixels.sol');

contract('Pixels', accounts => {
    it('Should set pixels', async ()=> {
        const pixels = await Pixels.new();
        await pixels.setPixel(0, 0, 'F0F8FF', { from: accounts[0], value: 300000 });
        await pixels.setPixel(5, 5, '000000', { from: accounts[0], value: 300000 });
        const data = await pixels.getAllPixels();
        assert(data[0][0] === 'F0F8FF');
        assert(data[5][5] === '000000');
    })
    it('Should update pixels', async ()=> {
        const pixels = await Pixels.new();
        await pixels.setPixel(0, 0, 'F0F8FF', { from: accounts[0], value: 300000 });
        await pixels.updatePixel(0, 0, '000000', { from: accounts[0]});
        const data = await pixels.getAllPixels();
        assert(data[0][0] === '000000');
    })
    it('Should fail if pixel is already set', async ()=> {
        const pixels = await Pixels.new();
        await pixels.setPixel(0, 0, 'F0F8FF', { from: accounts[0], value: 300000 });
        try {
            await pixels.setPixel(0, 0, '000000', { from: accounts[0], value: 300000 });
            assert.fail('should fail');
        } catch (err) {
            assert.include(err.message, "revert", "The error message should contain 'revert'");
        }
    })
    it('Should fail if want to set invalid pixel', async ()=> {
        const pixels = await Pixels.new();
        try {
            await pixels.setPixel(100, 100, 'F0F8FF', { from: accounts[0], value: 300000 });
            assert.fail('should fail');
        } catch (err) {
            assert.include(err.message, "revert", "The error message should contain 'revert'");
        }
    })
    it('Should fail if want to update other adress pixel', async ()=> {
        const pixels = await Pixels.new();
        try {
            await pixels.setPixel(1, 1, 'F0F8FF', { from: accounts[0], value: 300000 });
            await pixels.updatePixel(1, 1, '000000', { from: accounts[1], value: 300000 });
            assert.fail('should fail');
        } catch (err) {
            assert.include(err.message, "revert", "The error message should contain 'revert'");
        }
    })
}) 
