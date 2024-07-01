// migrations/2_deploy_contract.js
const Pizza = artifacts.require("Pizza");

module.exports = function(deployer) {
  // Deploy the Pizza contract with an initial owner address
  const ownerAddress = "0x9D2592afF2Fe7F2Be566D0C2Df585cF228904fE2"; // Replace with your owner's address
  deployer.deploy(Pizza, ownerAddress);
};