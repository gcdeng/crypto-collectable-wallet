import openseaApi from "./index";
/**
 * get a single asset from remote opensea api
 * @param {string} assetContractAddress
 * @param {string} tokenId
 * @returns {Promise}
 */
export default ({ assetContractAddress = "", tokenId = "" }) => {
  return openseaApi.get(`/asset/${assetContractAddress}/${tokenId}/`);
};
