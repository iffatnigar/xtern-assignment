import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeatherIcon from 'react-native-vector-icons/Feather';

function SavedLocation() {
  const [addresses, setAddresses] = useState([]);
  const [gpsLocation, setGpsLocation] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const savedAddresses = await AsyncStorage.getItem('savedAddresses');
        if (savedAddresses) {
          setAddresses(JSON.parse(savedAddresses));
        }
      } catch (error) {
        console.error('Failed to load the addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  const renderAddressItem = ({item}) => (
    <View style={styles.addressItem}>
      <Text style={[styles.addressText, {fontWeight: '700', fontSize: 20}]}>
        {item.addressType}
      </Text>
      <Text style={styles.addressText}>House/Flat/Block: {item.houseNo}</Text>
      <Text style={styles.addressText}>Apartment/Road/Area: {item.area}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Your Location</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search your area / Pin Code / Apartment"
        />
      </View>
      <View style={styles.currentLocationContainer}>
        <Text style={styles.currentLocationText}>
          <View>
            <FeatherIcon color="red" name="target" size={20} />
          </View>
          {'  '}Current Location
        </Text>
        <TouchableOpacity style={styles.enableButton}>
          <Text
            onPress={() => {
              setGpsLocation(true);
            }}
            style={styles.enableButtonText}>
            Enable
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.listContainer}
      />
    </View>
  );
}

export default SavedLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#E63F23',
    width: '100%',
    paddingVertical: 20,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: 'white',
  },
  searchContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    position: 'relative',
    paddingHorizontal: 20,
  },
  textInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 40,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
  },
  currentLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  locationIcon: {
    marginRight: 10,
  },
  currentLocationText: {
    fontSize: 18,
    color: '#E63F23',
    fontWeight: '700',
    flex: 1,
  },
  enableButton: {
    width: 100,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#E63F23',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enableButtonText: {
    color: 'black',
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 20,
  },
  addressItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addressText: {
    fontSize: 14,
    color: 'black',
  },
});
