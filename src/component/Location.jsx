import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Location() {
  const navigation = useNavigation();
  const [markerCoords, setMarkerCoords] = useState({
    latitude: 28.7040592,
    longitude: 77.1024902,
  });
  const [houseNo, setHouseNo] = useState('Raj Infrabuilds');
  const [area, setArea] = useState(
    'near Shitla Devi Mandir , Chembur Colony , Chembur Mumbai',
  );
  const [addressType, setAddressType] = useState('Work');
  const [addresses, setAddresses] = useState([]);

  const handleMarkerDragEnd = e => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setMarkerCoords({latitude, longitude});
  };

  const saveAddress = async () => {
    if (houseNo && area && addressType) {
      const addressData = {
        houseNo,
        area,
        addressType,
        latitude: markerCoords.latitude,
        longitude: markerCoords.longitude,
      };

      try {
        const savedAddresses = await AsyncStorage.getItem('savedAddresses');
        const addressesArray = savedAddresses ? JSON.parse(savedAddresses) : [];

        addressesArray.push(addressData);

        await AsyncStorage.setItem(
          'savedAddresses',
          JSON.stringify(addressesArray),
        );

        console.log('Address saved locally:', addressData);

        navigation.navigate('SavedLocation');
      } catch (error) {
        console.error('Failed to save the address:', error);
      }
    } else {
      console.warn('Please fill in all the required fields.');
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const savedAddress = await AsyncStorage.getItem('savedAddress');
        if (savedAddress) {
          setAddresses([JSON.parse(savedAddress)]);
        }
      } catch (error) {
        console.error('Failed to load the address:', error);
      }
    };

    fetchAddresses();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 50,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: 2,
          borderBottomColor: 'grey',
        }}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
          Location Information
        </Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: markerCoords.latitude,
          longitude: markerCoords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={markerCoords}
          draggable
          onDragEnd={handleMarkerDragEnd}
        />
        <Image
          style={styles.modalImage}
          source={{
            uri: 'https://www.resortsinmumbai.co.in/puri_large.JPG',
          }}
        />
      </MapView>
      <View style={styles.mapInfo}>
        <Text style={{color: 'black', margin: 10}}>
          Select Your Delivery Location
        </Text>
        <View style={styles.row}>
          <View style={{flex: 3}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.locationText,
                  {
                    textAlign: 'left',
                    marginLeft: 10,
                    fontWeight: '700',
                    fontSize: 25,
                  },
                ]}>
                {houseNo}
              </Text>
            </View>
            <Text style={{color: 'black', margin: 10, fontSize: 12}}>
              {area}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity style={styles.button2}>
              <Text style={[styles.buttonText, {color: 'black'}]}>Enable</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={saveAddress} // Corrected the function name here
          style={[styles.button, {alignSelf: 'center'}]}>
          <Text style={styles.buttonText}>Confirm & Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  map: {
    height: 580,
    width: '100%',
  },
  mapInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 5,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    marginVertical: 15,
    backgroundColor: '#E63F23',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  button2: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderColor: '#E63F23',
    borderWidth: 1,
  },
  icon: {
    fontSize: 25,
    color: 'black',
  },
  locationText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 25,
    textAlign: 'left',
    marginLeft: 10,
  },
});

export default Location;
