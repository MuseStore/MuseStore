import { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image, StatusBar } from 'react-native';
import firebase from 'firebase/compat/app';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import HomeScreen from "./screens/home";
import AuthScreen from "./screens/auth"

export default function App() {
  StatusBar.setBarStyle("dark-content")

  const firebaseConfig = {
    apiKey: "AIzaSyDjVv4UHTge6-hdJ9kdTYZZ55b_yaTlZxM",
    authDomain: "musestore-678bd.firebaseapp.com",
    projectId: "musestore-678bd",
    storageBucket: "musestore-678bd.appspot.com",
    messagingSenderId: "152799162708",
    appId: "1:152799162708:web:626f9271281f65b51458c1",
    measurementId: "G-4G63EYH7JX"
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  } else {
    firebase.app()
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component = {AuthScreen} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  ) 
}
