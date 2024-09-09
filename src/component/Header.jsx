import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

function Header() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.profileImage}>
          <FeatherIcon color="white" name="user" size={40} />
        </View>
      </View>

      <View style={styles.centerContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.welcomeText}>Welcome, Guest </Text>
          <Text style={styles.loginText}>(Login)</Text>
        </View>
        <View style={styles.locationContainer}>
          <View style={{}}>
            <FeatherIcon color="red" name="map-pin" size={20} />
          </View>
          <Text style={styles.locationText}> Deliver to 400071 </Text>
          <View style={{}}>
            <FeatherIcon color="black" name="chevron-down" size={20} />
          </View>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.searchIcon}>
          <FeatherIcon color="black" name="search" size={40} />
        </View>
        <View style={styles.logo}>
          <FeatherIcon color="white" name="play" size={40} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fdfcdc',
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    width: '100%',
    height: 80,
  },
  leftContainer: {
    width: 60,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#E63F23',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffc300',
  },
  searchIcon: {
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#E63F23',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    marginHorizontal: 10,
    // backgroundColor: 'red',
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  loginText: {
    fontSize: 14,
    color: '#777',
    color: '#E63F23',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    marginLeft: 5,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 35,
    height: 35,
    marginLeft: 20,
  },
});

export default Header;
