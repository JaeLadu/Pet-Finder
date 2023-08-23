type coordenates = {
   lng: number;
   lat: number;
};

const state = {
   data: {
      userLocation: {},
   },

   setUserLocation(coordenates: coordenates) {
      this.data.userLocation = coordenates;
   },
   getUserLocation() {
      return this.data.userLocation || undefined;
   },
};
export { state };
