// utils/getUniqueSelectors.js

/**
 * Extracts unique function selectors from a facet contract
 * and ensures no duplicate selectors are added to the diamond.
 *
 * @param {Contract} facet - ethers.Contract instance of the deployed facet
 * @param {Set<string>} seenSelectors - a Set to track previously added selectors
 * @returns {string[]} Array of unique selectors from this facet
 */
function getUniqueSelectors(facet, seenSelectors) {
  const selectors = [];

  for (const fn of Object.keys(facet.interface.functions)) {
    const selector = facet.interface.getSighash(fn);
    if (!seenSelectors.has(selector)) {
      selectors.push(selector);
      seenSelectors.add(selector);
    }
  }

  return selectors;
}

module.exports = { getUniqueSelectors };
