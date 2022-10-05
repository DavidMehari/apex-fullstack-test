const WIKI_API_URL = "https://en.wikipedia.org/api/rest_v1/page/summary/";

export const queryWikiAPI = async ( searchQuery: string ) => {
  const response = await fetch(WIKI_API_URL + searchQuery);
  if (response.ok) {
    const result = await response.json();
    return { summary: result.extract, url: result.content_urls.desktop.page};
  } else {
    return { summary: "No wikipedia article found", url: null} ;
  }
}