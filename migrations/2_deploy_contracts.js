var Pixels = artifacts.require("./Pixels.sol");
// var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(Pixels);
};
