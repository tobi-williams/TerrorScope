//import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import '../styling/DetailsBody.css';

const containerStyle = {
  width: '90%',
  height: '1000px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function EventDetails({ data }) {
//   const [eventData, setEventData] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEventData = async () => {
//       try {
//         const response = await axios.get(`https://yourapi.com/events/${match.params.id}`);
//         setEventData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching event data:', error);
//         setLoading(false);
//       }
//     };

//     fetchEventData();
//   }, [match.params.id]);

//   if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* <h1>Event Details</h1> */}
      <p>Date: {/*{eventData.date}*/}</p>
      <p>Location: {/*{eventData.location}*/}</p>
      <p>Damage: {/*{eventData.damage}*/}</p>
      <p>Number Killed: {/*{eventData.numberKilled}*/}</p>
      <p>Damage Summary: {/*{eventData.damageSummary}*/}</p>
      <p>Attack Type: {/*{eventData.attackType}*/}</p>
      <p>Number of Perpetrators: {/*{eventData.numberOfPerpetrators}*/}</p>
      <p>Method of Claim: {/*{eventData.methodOfClaim}*/}</p>
      <p>Perpetrator Group: {/*{eventData.perpetratorGroup}*/}</p>
      <p>Target: {/*{eventData.target}*/}</p>
      <p>Weapons Used: {/*{eventData.weaponsUsed}*/}</p>
      <p>Weapon Detail: {/*{eventData.weaponDetail}*/}</p>
      <p>Motive: {/*{eventData.motive}*/}</p>
      <p>Summary: {/*{eventData.summary}*/}</p>

      <div className='map-container'>
        <LoadScript googleMapsApiKey="AIzaSyBQGiETWXo3vIB7Ts333aE41C9kS9NI4VQ">
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default EventDetails;