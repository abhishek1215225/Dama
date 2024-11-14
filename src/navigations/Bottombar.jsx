import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Event from '../screens/Events';
import NewsScreen from '../screens/NewsScreen';
import Blogscreen from '../screens/Blogscreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const Tab = createMaterialBottomTabNavigator();
const iconsize = width * 0.06;

function MyTabs() {
  return (
    <Tab.Navigator 
      activeColor="#0966C3"
      inactiveColor="#94A3B8"
      barStyle={{ backgroundColor: 'white' }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}  
        options={{ 
          tabBarIcon: ({ color }) => <Icon name="home" size={iconsize} color={color} />,
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="Blog" 
        component={Blogscreen} 
        options={{ 
          tabBarIcon: ({ color }) => <Icon1 name="article" size={iconsize} color={color} />,
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="News" 
        component={NewsScreen} 
        options={{ 
          tabBarIcon: ({ color }) => <Icon2 name="news" size={iconsize} color={color} />,
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="Resources" 
        component={ResourcesScreen} 
        options={{ 
          tabBarIcon: ({ color }) => <Icon3 name="folderopen" size={iconsize} color={color} />,
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="Event" 
        component={Event} 
        options={{ 
          tabBarIcon: ({ color }) => <Icon1 name="event" size={iconsize} color={color} />,
          headerShown: false 
        }} 
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
