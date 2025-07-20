async function main() {
  const [deployer] = await ethers.getSigners();
  const Factory = await ethers.getContractFactory("CoreGameFactory");
  const factory = await Factory.deploy();
  await factory.deployed();
  console.log("CoreGameFactory deployed to:", factory.address);
}
main();
