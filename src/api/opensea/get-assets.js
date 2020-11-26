import openseaApi from "./index";
import { ACCOUNT_ADDRESS } from "@/config";
/**
 * get assets from remote opensea api
 * @param {number} offset
 * @returns {Promise}
 */
export default ({ offset = 0 }) => {
  return openseaApi.get("/assets/", {
    params: {
      owner: ACCOUNT_ADDRESS,
      offset
    }
  });
};
