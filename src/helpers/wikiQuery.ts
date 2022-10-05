export const queryWikiAPI = async ( searchQuery: string ) => {
  const WIKI_API_URL = "https://en.wikipedia.org/api/rest_v1/page/summary/";
  const response = await fetch(WIKI_API_URL + searchQuery);
  if (response.ok) {
    const result = await response.json();
    return result.extract;
  } else {
    return "No wikipedia article found";
  }
}