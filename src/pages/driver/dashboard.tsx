import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import tw from "twin.macro";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { FULL_ORDER_FRAGMENT } from "../../fragments";
import { useHistory } from "react-router-dom";
import { CookedOrdersSubscription, TakeOrderInput, TakeOrderOutput } from "../../generated/graphql";

const COOKED_ORDERS_SUBSCRIPTION = gql`
   subscription cookedOrders {
      cookedOrders {
         ...FullOrderParts
      }
   }
   ${FULL_ORDER_FRAGMENT}
`;

const TAKE_ORDER_MUTATION = gql`
   mutation takeOrder($input: TakeOrderInput!) {
      takeOrder(input: $input) {
         ok
         error
      }
   }
`;

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

const Order = styled.div`
   ${tw`max-w-screen-sm mx-auto bg-white  relative -top-10 shadow-lg py-8 px-5 `}
`;

const Title = styled.h1`
   ${tw`text-center text-3xl font-medium`}
`;

const SubTitle = styled.h1`
   ${tw`text-center  my-3  text-2xl font-medium`}
`;

const Button = styled.button`
   ${tw`text-lg font-medium focus:outline-none text-white py-4  transition-colors w-full mt-5 block text-center`}
`;

const { data: cookedOrdersData } = useSubscription<CookedOrdersSubscription>(COOKED_ORDERS_SUBSCRIPTION);

const Dashboard = () => {
   const [driverCoords, setDriverCoords] = useState<ICoords>({ lng: 0, lat: 0 });
   const [map, setMap] = useState<google.maps.Map>();
   const [maps, setMaps] = useState<any>();
   const history = useHistory();

   const triggerMutation = (orderId: number) => {
      takeOrderMutation({
         variables: {
            input: {
               id: orderId,
            },
         },
      });
   };

   const onCompleted = (data: { takeOrder: TakeOrderOutput }) => {
      if (data.takeOrder.ok) {
         history.push(`/orders/${cookedOrdersData?.cookedOrders.id}`);
      }
   };
   const [takeOrderMutation] = useMutation<{ takeOrder: TakeOrderOutput }, { input: TakeOrderInput }>(TAKE_ORDER_MUTATION, {
      onCompleted,
   });
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
      if (cookedOrdersData?.cookedOrders.id) {
         makeRoute();
      }
   }, [cookedOrdersData]);

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

   const makeRoute = () => {
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
         <Order>
            {cookedOrdersData?.cookedOrders.restaurant ? (
               <>
                  <Title>New Cooked Order</Title>
                  <SubTitle>Pick it up soon!</SubTitle>
                  <Button onClick={() => triggerMutation(cookedOrdersData?.cookedOrders.id)}>Accept Challenge &rarr;</Button>
               </>
            ) : (
               <>
                  <Title>No Orders yet...</Title>
               </>
            )}
         </Order>
      </Container>
   );
};

export default Dashboard;
