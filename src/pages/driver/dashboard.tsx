import React from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import tw from "twin.macro";

const Container = styled.div``;

const Content = styled.div`
   ${tw`py-20 bg-gray-800 overflow-hidden`}
   width:${window.innerWidth}px;
   height: 95vh;
`;
const Dashboard = () => {
   const GOOGLE_MAP_KEY = process.env.REACT_APP_GOOGLE_MAP_KEY;
   return (
      <Container>
         <Content>
            <GoogleMapReact
               defaultZoom={20}
               defaultCenter={{ lat: 59.95, lng: 30.33 }}
               bootstrapURLKeys={{ key: GOOGLE_MAP_KEY ? GOOGLE_MAP_KEY : "" }}
            ></GoogleMapReact>
         </Content>
      </Container>
   );
};

export default Dashboard;
