// mine-blocks.js
async function mineBlocks(count, intervalMs = 1000) {
  for (let i = 0; i < count; i++) {
    await network.provider.send("evm_mine");
    console.log(`Mined block ${i + 1}`);
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }
}

mineBlocks(1000, 50); // mines 100 blocks, 1 every 0.5s

