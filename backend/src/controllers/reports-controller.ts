import { reports } from "../lib/algolia";

type Area = {
   lat: number;
   lng: number;
};
//ARREGLAR no devuelve los reports cercanos
function getReportsInArea(location: Area) {
   return reports
      .search("query", {
         aroundLatLng: `${location.lat}, ${location.lng}`,
         aroundRadius: 5000,
      })
      .then(({ hits }) => {
         console.log(hits);

         return hits;
      });
}

export { getReportsInArea };
