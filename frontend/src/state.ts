const backendUrl = process.env.BACKEND_URL;

interface coordenates {
   lng: number;
   lat: number;
}
interface userData {
   location?: coordenates;
   token?: string;
   mail?: string;
}

const state = {
   data: {},
   subscribed: [],

   subscribe(functionToRepeat: any) {
      const subscribed = this.subscribed.find(functionToRepeat);
      if (!subscribed) this.subscribed.push(functionToRepeat);
   },
   getUserData(): userData {
      return this.data.userData;
   },
   setUserData(data: userData) {
      const oldData = this.data.userData;
      const newData = { ...oldData, ...data };
      this.data.userData = newData;
      this.subscribed.forEach((fun: any) => {
         fun();
      });
      return;
   },
   async getUserReports() {
      const userData = this.getUserData();

      //trae todos los reports que le pertenecen al usuario del backend
      const reportResponse = await fetch(`${backendUrl}/reports`, {
         method: "get",
         headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${userData.token}`,
         },
      });
      const reportsData = await reportResponse.json();

      //Usa los datos que devolvió el backend para crear el objeto que necesita devolverle al front
      return await Promise.all(
         await reportsData.map(async (report: any) => {
            //Usa mapbox para obtener el nombre de la ciudad usando las coordenadas
            const areaResponse = await fetch(
               `https://api.mapbox.com/geocoding/v5/mapbox.places/${report.lng},${report.lat}.json?access_token=pk.eyJ1IjoiamFlbGFkdSIsImEiOiJjbGpsbXB4NzEwMmNtM2VuaTFnaWVpOXNhIn0.izRPV_1_x5v_347iKQPD3A`
            );
            const areaData = await areaResponse.json();

            return {
               id: report.id,
               name: report.name,
               imageURL: report.imageUrl,
               area: areaData.features[2].place_name,
               owned: true,
            };
         })
      );
   },
   async getPetsInArea() {
      const location = this.data.userData.location;
      const response = await fetch(
         `${backendUrl}/reports/location?lat=${location.lat}&lng=${location.lng}`
      );
      const data = await response.json();
      this.data.petsInArea = data;
      return data;
   },
   async signup(mail: string, password: string) {
      try {
         const response = await fetch(`${backendUrl}/auth/signup`, {
            method: "post",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ mail, password }),
         });

         const data = await response.json();
         if (response.ok) {
            this.setUserData({ token: data.token, mail: mail });
            return { ok: true };
         } else {
            return { error: data.message, ok: false };
         }
      } catch (error) {
         return { error, ok: false };
      }
   },
   async signin(mail: string, password: string) {
      try {
         const response = await fetch(`${backendUrl}/auth/signin`, {
            method: "post",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ mail, password }),
         });

         const data = await response.json();

         if (response.ok) {
            this.setUserData({ token: data.token, mail: mail });
            return { ok: true };
         } else {
            return { error: data.message, ok: false };
         }
      } catch (error) {
         return { error, ok: false };
      }
   },
   closeSession() {
      this.setUserData({ mail: "", token: "" });
   },
   async reportPet(dataURL: string, lat: string, lng: string, name: string) {
      const userData = this.getUserData();
      const reportsData = { dataURL, lat, lng, name };
      const response = await fetch(`${backendUrl}/report`, {
         method: "post",
         headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${userData.token}`,
         },
         body: JSON.stringify(reportsData),
      });
      const data = await response.json();
      return data;
   },
};
export { state };
