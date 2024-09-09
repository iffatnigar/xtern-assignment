import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../component/Home';
import ManualLocation from '../component/ManualLocation';
import Location from '../component/Location';
import SavedLocation from '../component/SavedLocation';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ManualLocation"
        component={ManualLocation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Location"
        component={Location}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SavedLocation"
        component={SavedLocation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
