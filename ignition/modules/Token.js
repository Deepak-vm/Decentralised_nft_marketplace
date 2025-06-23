// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DeployModule = buildModule('TokenModule' , (m)=>{
  const marketPlace = m.contract("NFTSTORE");
  return marketPlace;
})


module.exports = DeployModule;