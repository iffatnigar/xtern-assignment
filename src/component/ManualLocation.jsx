import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import Banner from './Banner';
import Header from './Header';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function ManualLocation() {
  const navigation = useNavigation();

  const [houseNo, setHouseNo] = useState('');
  const [area, setArea] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [addressType, setAddressType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const navigate = screen => {
    navigation.navigate(screen);
  };

  const btnText = [
    {id: 1, name: 'Home'},
    {id: 2, name: 'Work'},
  ];

  const saveAddress = async () => {
    if (houseNo && area && addressType) {
      const addressData = {
        houseNo,
        area,
        addressType,
        latitude: null,
        longitude: null,
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
        navigate('SavedLocation');
      } catch (error) {
        console.error('Failed to save the address:', error);
      }
    } else {
      Alert.alert('Please fill in all the fields');
      console.warn('Please fill in all the required fields.');
    }
  };

  return (
    <SafeAreaView>
      <Header />
      <ScrollView>
        <Banner />
        <View style={{}}></View>
        <Modal transparent visible={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.addressContainer}>
                <Text style={styles.addressTitle}>
                  <View style={styles.profileImage}>
                    <FeatherIcon color="red" name="map-pin" size={25} />
                  </View>
                  {'  '}Raj Infrabuilds
                </Text>
                <Text style={styles.addressText}>
                  near Shitla Devi Mandir , Chembur Colony , Chembur Mumbai
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder="HOUSE / FLAT / BLOCK NO."
                  value={houseNo}
                  onChangeText={text => setHouseNo(text)}
                />
                <Text style={styles.divider}></Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="APARTMENT / ROAD / AREA"
                  value={area}
                  onChangeText={setArea}
                />
                <Text style={styles.divider}></Text>
              </View>
              <Text style={styles.saveAsText}>SAVE AS</Text>
              <View style={styles.saveOptions}>
                {btnText.map((item, index) => {
                  const isSelected = selectedIndex === index;

                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.optionButton,
                        {
                          backgroundColor: isSelected ? '#E63F23' : 'white',
                          borderColor: isSelected ? '#E63F23' : 'black',
                        },
                      ]}
                      onPress={() => {
                        setSelectedIndex(index);
                        setAddressType(item.name);
                      }}>
                      <Text
                        style={[
                          styles.optionText,
                          {color: isSelected ? '#FFF' : 'black'},
                        ]}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={styles.saveButtonContainer}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={saveAddress}>
                  <Text style={styles.saveButtonText}>Save & Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    height: 600,
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 300,
  },
  addressContainer: {
    marginBottom: 20,
  },
  addressTitle: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputField: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    // marginVertical: 10,
  },
  saveAsText: {
    marginVertical: 24,
    fontSize: 16,
    color: 'black',
  },
  saveOptions: {
    flexDirection: 'row',
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
  },
  selectedButton: {
    backgroundColor: 'red',
  },
  unselectedButton: {
    backgroundColor: 'white',
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
  saveButtonContainer: {
    marginTop: 40,
  },
  saveButton: {
    paddingVertical: 15,
    backgroundColor: '#E63F23',
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: 'white',
  },
});
