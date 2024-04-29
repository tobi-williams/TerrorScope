import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import '../styling/DetailsBody.css';
require('../credentials');


function DetailsBody({ data }) {
  const containerStyle = {
    width: '90%',
    height: '1000px'
  };
  
  const center = {
    lat: Number(data[0].latitude),
    lng: Number(data[0].longitude)
  };

  return (
    <div className='details-container'>
      <p>Date: {data[0].date}</p>
      <p>Location: {data[0].location}</p>
      <p>Property Damage? (Damage Extent): {data[0].damage}</p>
      <p>Number Killed (Wounded): {data[0].numberKilled}</p>
      <p>Damage Summary: {data[0].damageSummary}</p>
      <p>Attack Type: {data[0].attackType}</p>
      <p>Number of Perpetrators (Perpetrators Captured): {data[0].numberOfPerpetrators}</p>
      <p>Claimed? (Method of Claim): {data[0].methodOfClaim}</p>
      <p>Perpetrator Group: {data[0].perpetratorGroup}</p>
      <p>Target: {data[0].target}</p>
      <p>Weapons Used: {data[0].weaponsUsed}</p>
      <p>Weapon Detail: {data[0].weaponDetail}</p>
      <p>Motive: {data[0].motive}</p>
      <p>Summary: {data[0].summary}</p>

      <div className='map-container'>
        <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            >
                <MarkerF position={center} />
            </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default DetailsBody;