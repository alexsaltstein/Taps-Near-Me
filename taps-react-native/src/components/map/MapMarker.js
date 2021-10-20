import React from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import { Marker } from 'react-native-maps';
import markerIcon from '../../../assets/map/marker.png';
import { COLORS } from '../../styles/COLORS';

const MapMarker = ({ marker, index, page, scrollToPosition }) => {
  return (
    <Marker
      key={index}
      coordinate={{ latitude: marker.lat, longitude: marker.lng }}
      onPress={()=>{scrollToPosition(index)}}
    >
      <TouchableOpacity style={{ padding: 10, alignItems: 'center' }}
        onPress={() => {console.log('touchd'); }}>
        <Text style={{ fontFamily: 'open-sans-semi', backgroundColor: page === index ? COLORS.purple : COLORS.transparent, paddingVertical: page === index ? 2 : 0, paddingHorizontal: 5, color: page === index ? COLORS.white : COLORS.purple, borderRadius: 5, overflow: 'hidden' }}>{marker.title}</Text>
        <Image source={markerIcon} style={{ width: 40, height: 40, marginTop: 2 }} />
      </TouchableOpacity>
    </Marker>
  )
}

export default MapMarker;