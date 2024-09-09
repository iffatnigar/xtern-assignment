import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from './Header';
import {useNavigation} from '@react-navigation/native';
import Banner from './Banner';
import FeatherIcon from 'react-native-vector-icons/Feather';

function Home() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = value => {
    setModalVisible(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <Banner />

        <View style={{}}>
          <View style={styles.offerRow}>
            <View style={styles.offerContainer}>
              <Text style={styles.offerTitle}>Flat 25% OFF</Text>
              <Text style={styles.offerSubtitle}>On Snacks</Text>
            </View>
            <View style={styles.offerContainer}>
              <Text style={styles.offerTitle}>Flat 15% OFF</Text>
              <Text style={styles.offerSubtitle}>On Every Order</Text>
            </View>
          </View>
          <View style={styles.offerRow}>
            <View style={styles.offerContainer}>
              <Text style={styles.offerTitle}>Flat 25% OFF</Text>
              <Text style={styles.offerSubtitle}>On Snacks</Text>
            </View>
            <View style={styles.offerContainer}>
              <Text style={styles.offerTitle}>Flat 15% OFF</Text>
              <Text style={styles.offerSubtitle}>On Every Order</Text>
            </View>
          </View>
        </View>

        {/* Give Location Permission */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => toggleModal(true)}
            accessibilityLabel="Location Permission">
            <Text style={styles.buttonText}>Location Permission</Text>
          </TouchableOpacity>
        </View>

        <Modal
          transparent
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => toggleModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                style={styles.modalImage}
                source={{
                  uri: 'https://icons.iconarchive.com/icons/flat-icons.com/flat/512/GPS-icon.png',
                }}
              />
              <Text style={styles.modalText}>Location permission is off</Text>
              <Text style={styles.modalDescription}>
                We need your location to find the nearest store & provide you a
                seamless delivery experience
              </Text>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  toggleModal(false);
                  navigation.navigate('Location');
                }}
                accessibilityLabel="Give Location Permission">
                <Text style={styles.buttonText}>Give Location Permission</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggleModal(false);
                  navigation.navigate('ManualLocation');
                }}
                style={[styles.buttonContainer, styles.secondaryButton]}>
                <Text style={styles.secondaryButtonText}>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <FeatherIcon color="red" name="search" size={20} />
                  </View>
                  {'  '}Search your Location Manually
                </Text>
              </TouchableOpacity>
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
    backgroundColor: '#fdfcdc',
  },
  scrollContainer: {
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#E63F23',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
  },
  offerRow: {
    flexDirection: 'row',
  },
  offerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 4,
    height: 200,
    width: '65%',
    borderRadius: 20,
    borderColor: '#ff7d00',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#ff7d00',
  },
  offerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#001524',
  },
  offerSubtitle: {
    fontSize: 14,
    color: 'black',
  },
  buttonWrapper: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    marginVertical: 100,
    zIndex: 99,
  },
  button: {
    backgroundColor: '#E63F23',
    width: '60%',
    height: 60,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    alignItems: 'center',
    marginTop: 500,
  },
  modalImage: {
    width: 100,
    height: 100,
    margin: 20,
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  modalDescription: {
    textAlign: 'center',
    margin: 5,
    paddingHorizontal: 15,
    fontSize: 14,
    color: 'black',
  },
  buttonContainer: {
    backgroundColor: '#E63F23',
    margin: 10,
    padding: 15,
    width: '95%',
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: '#E63F23',
    fontWeight: 'bold',
  },
});

export default Home;
