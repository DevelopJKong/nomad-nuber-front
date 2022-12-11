import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import tw from "twin.macro";

interface ICoords {
   lat: number;
   lng: number;
}

interface IDriverProps {
   lat: number;
   lng: number;
   $hover?: any;
}

const Container = styled.div``;

const Content = styled.div`
   ${tw`overflow-hidden`}
   width:${window.innerWidth}px;
   height: 50vh;
`;

const MapContent = styled.div<IDriverProps>`
   ${tw`h-10 w-10 bg-white rounded-full flex justify-center items-center text-lg`}
`;

const Button = styled.button``;

const Dashboard = () => {
   const [driverCoords, setDriverCoords] = useState<ICoords>({ lng: 0, lat: 0 });
   const [map, setMap] = useState<google.maps.Map>();
   const [maps, setMaps] = useState<any>();
   const onSuccess = ({ coords: { latitude, longitude } }: any) => {
      setDriverCoords({ lat: latitude, lng: longitude });
   };
   const onError = (error: any) => {
      console.log(error);
   };
   useEffect(() => {
      navigator.geolocation.watchPosition(onSuccess, onError, {
         enableHighAccuracy: true,
      });
   }, []);

   useEffect(() => {
      if (map && maps) {
         map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
         const geocoder = new google.maps.Geocoder();
         geocoder.geocode({ location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng) }, (result, status) => {
            console.log(result, status);
         });
      }
   }, [driverCoords.lat, driverCoords.lng]);

   const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
      setMap(map);
      setMaps(maps);
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
   };

   const onGetRouteClick = () => {
      if (map) {
         const directionsService = new google.maps.DirectionsService();
         const directionsRenderer = new google.maps.DirectionsRenderer({
            polylineOptions: {
               strokeColor: "#000",
               strokeOpacity: 1,
            },
         });
         directionsRenderer.setMap(map);
         directionsService.route(
            {
               origin: { location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng) },
               destination: { location: new google.maps.LatLng(driverCoords.lat + 0.05, driverCoords.lng + 0.05) },
               travelMode: google.maps.TravelMode.DRIVING,
            },
            (result) => {
               directionsRenderer.setDirections(result);
            },
         );
      }
   };

   const GOOGLE_MAP_KEY = process.env.REACT_APP_GOOGLE_MAP_KEY;
   return (
      <Container>
         <Content>
            <GoogleMapReact
               yesIWantToUseGoogleMapApiInternals
               onGoogleApiLoaded={onApiLoaded}
               defaultZoom={16}
               defaultCenter={{ lat: 59.95, lng: 30.33 }}
               bootstrapURLKeys={{ key: GOOGLE_MAP_KEY ? GOOGLE_MAP_KEY : "" }}
            >
               <MapContent lat={driverCoords.lat} lng={driverCoords.lng}>
                  💕
               </MapContent>
            </GoogleMapReact>
         </Content>
         <Button onClick={onGetRouteClick}>GET ROUTE</Button>
      </Container>
   );
};

export default Dashboard;
