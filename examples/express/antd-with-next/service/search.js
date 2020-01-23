import clientRequest from "../utils/request";

export async function searchResultService(params) {
  return clientRequest.get("/api/search", params);
}
