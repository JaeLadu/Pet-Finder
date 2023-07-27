import algoliasearch from "algoliasearch";

const appID = process.env.ALGOLIA_APP_ID || "";
const apiKey = process.env.ALGOLIA_API_KEY || "";
const client = algoliasearch(appID, apiKey);
const reports = client.initIndex("Reports");

export { reports };
