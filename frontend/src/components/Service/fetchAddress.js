function getPosition() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  
  async function getAddress({ latitude, longitude }) {
    try {
      const res = await fetch(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${'667e8c17d1c1a074666168pqhe0acee'}`
      );
  console.log(res,'❤️❤️')
      if (!res.ok) {
        throw new Error(`Failed to fetch address. Status: ${res.status}`);
      }
  
      const data = await res.json();
    
  
    
      return data;
    } catch (error) {
      console.error("Error fetching address:", error);
      throw error;
    }
  }
  
  
  export const fetchAddress = async function () {
  
      const positionObj = await getPosition();
    
      const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };


      const addressObj = await getAddress(position);
      const address =addressObj.display_name ;
    
     return {address,position};
  };
  