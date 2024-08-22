import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


const useMaps = () => {
  
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "YOUR_API_KEY",
        libraries: ['places'],
    });

    
}

export default useMaps;
 