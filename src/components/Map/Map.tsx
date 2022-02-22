import React, { useState, useEffect, useRef, useMemo } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Dimensions } from 'react-native';
import { useTheme } from 'styled-components';
import { throttle } from 'lodash';
import styled from 'styled-components/native';
import Loader from 'components/Loader/Index';
import CustomMarker from './CustomMarker';
import Address from './Address';
import { IsIOS } from 'utils/helpers';
import { ILocationProps } from 'typings/interfaces';

const StyledMapWrapper = styled.View`
  margin: 20px 0 10px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

interface IRegion {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}

export interface IAddress {
  country: string | null;
  city: string | null;
  street: string | null;
}

export default function Map({ location, setLocation, mode = 'creation' }: ILocationProps) {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [addressData, setAddressData] = useState<IAddress | null>(null);
  const theme = useTheme();

  const mapHeight = IsIOS ? 380 : 320;

  const throttledCoords = useRef(
    throttle(async ({ latitude, longitude }) => {
      try {
        const addressDataAll = await Location.reverseGeocodeAsync({ latitude, longitude });
        const { city, country, street } = addressDataAll[0];
        setAddressData({ country, city, street });
      } catch (e) {
        console.log(e);
      }
    }, 200),
  ).current;

  const mapStyle = useMemo(() => {
    return [
      { elementType: 'geometry', stylers: [{ color: theme.colors.mainBackgroundColor }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
      },
    ];
  }, [theme]);

  useEffect(() => {
    if (!location && mode !== 'View') {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      })();
    } else {
      location && setLatitude(location.latitude);
      location && setLongitude(location.longitude);
    }
  }, [location, mode]);

  useEffect(() => {
    if (longitude && latitude) {
      throttledCoords({ latitude, longitude });
    }
  }, [longitude, latitude]);

  useEffect(() => {
    return () => {
      throttledCoords.cancel();
    };
  }, [throttledCoords]);

  const onRegionChangeHandler = (region: IRegion) => {
    if (mode === 'creation') {
      setLatitude(region.latitude);
      setLongitude(region.longitude);
      setLocation && setLocation({ latitude: region.latitude, longitude: region.longitude });
    }
  };

  if (!latitude && !longitude) {
    return <Loader />;
  }

  return (
    <StyledMapWrapper>
      <MapView
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={onRegionChangeHandler}
        style={{ width: Dimensions.get('window').width, height: mapHeight }}
        customMapStyle={mapStyle}
      >
        <Marker draggable coordinate={{ latitude, longitude }} pinColor={theme.colors.primary}>
          <CustomMarker />
        </Marker>
      </MapView>
      {addressData ? <Address address={addressData} /> : null}
    </StyledMapWrapper>
  );
}
