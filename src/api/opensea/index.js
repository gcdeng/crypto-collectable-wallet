import axios from "axios";
import { OPENSEA_BASE_URL } from "@/config";

export default axios.create({
  baseURL: OPENSEA_BASE_URL
});
