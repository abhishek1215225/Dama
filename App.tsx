
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SingUp from './src/screens/Singup';
import Otp from './src/screens/Otp';
import PersonalDetais from './src/screens/PersonalDetails';
import ProfessionalDetail from './src/screens/Professionaldetail';
import Welcome from './src/screens/Welcome';
import Singin from './src/screens/Singin';
import Login from './src/screens/Login';
// import HomeScreen from './src/screens/HomeScreen';
import Confirmpayment from './src/components/Confirmpayment';
import Topbar from './src/components/Topbar';
import DetailsScreen from './src/screens/DetailScreen';
// import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import Icon1 from 'react-native-vector-icons/MaterialIcons';
// import Icon2 from 'react-native-vector-icons/Entypo';
// import Icon3 from 'react-native-vector-icons/AntDesign';
import Event from './src/screens/Events';
// import NewsScreen from './src/screens/NewsScreen';
// import Blogscreen from './src/screens/Blogscreen';
// import ResourcesScreen from './src/screens/ResourcesScreen';
import Terms from './src/screens/Terms';
import Privacy from './src/screens/privacy';
import About from './src/screens/About';
// import MyTabs from './src/navigations/Bottombar';
import Reservation from './src/components/Resevration';
import Message from './src/screens/Message';
import Search from './src/components/search';
import Forgot from './src/screens/ForgetScreen';
import Emailotp from './src/screens/Emailotp';
import ResetPassword from './src/screens/ResetPassword';
import './src/firebaseConfig';
const Stack = createNativeStackNavigator();
import First from './src/screens/first';
import messaging from '@react-native-firebase/messaging';
import Chat from './src/screens/chat';
import { useUser } from './src/components/context';
import HomeScreen from './src/screens/HomeScreen';
import { PermissionsAndroid, Platform } from 'react-native';


//const Tab = createMaterialBottomTabNavigator();

// function MyTabs() {
//   return (
//      <Tab.Navigator activeColor="#0966C3"
//             inactiveColor="#94A3B8"
//             barStyle={{ backgroundColor: 'white'}}>
//               <Tab.Screen name="Home" component={HomeScreen}  options={{ tabBarIcon:
//                  ({color})=>(<Icon name="home" size={20} color={color}/>),}} />
//               <Tab.Screen name="Blog" component={Blogscreen } options={{tabBarIcon:
//                 ({color})=>(<Icon1 name="article" size={20} color={color} />),}}/>
//               <Tab.Screen name="News" component={NewsScreen } options={{tabBarIcon:
//                 ({color})=>(<Icon2 name="news" size={20} color={color} />),}}/>
//               <Tab.Screen name="Resources" component={ResourcesScreen } options={{tabBarIcon:
//                 ({color})=>(<Icon3 name="folderopen" size={20} color={color} />),}}/>
//               <Tab.Screen name="Event" component={Event} options={{tabBarIcon:
//                 ({color})=>(<Icon1 name="event" size={20} color={color} />),}}/>
//             </Tab.Navigator>
//   );
// };



const App = () => {
  const { user } = useUser();

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to save photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
  
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission granted');
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const requestNotificationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Notification Permission',
        message: 'This app needs access to notifications to receive updates.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to take pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
  
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };


  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted:', authStatus);
      } else {
        console.log('Notification permission denied');
      }
    } catch (error) {
      console.error('Permission request error:', error);
    }
  };

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      // Optionally: Send this token to your backend or save it locally
    } catch (error) {
      console.error('Error fetching FCM token:', error);
    }
  };

  

  useEffect(()=>{
    requestUserPermission();
    getToken();
    requestNotificationPermission();
    requestCameraPermission();
    requestStoragePermission();

  },[]);
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Singin">
      {user ? (
        <>
         {/* <Stack.Screen name="MyTab" component={MyTabs} options={{headerShown:false}}/>  */}
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="First" component={First} options={{headerShown:false}}/>
        <Stack.Screen name="Chat" component={Chat} options={{headerShown:false}}/>
        <Stack.Screen name="Event" component={Event} options={{headerShown:false}}/>
        <Stack.Screen name="Topbar" component={Topbar} options={{headerShown:false}}  />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{headerShown:false}} />
        <Stack.Screen name="About" component={About} options={{headerShown:false}} />
        <Stack.Screen name="Reservation" component={Reservation} options={{headerShown:false}}/>
        <Stack.Screen name="Message" component={Message} options={{headerShown:false}}/>
        <Stack.Screen name="Search" component={Search} options={{headerShown:false}}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown:false}}/>
        </>
      ) : (
        <>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Singin" component={Singin} options={{headerShown:false}}/>
        <Stack.Screen name="SingUp" component={SingUp} options={{headerShown:false}} />
        <Stack.Screen name="Otp" component={Otp} options={{headerShown:false}}  />
        <Stack.Screen name="Professional" component={ProfessionalDetail} options={{headerShown:false}}  />
        <Stack.Screen name="Personal" component={PersonalDetais} options={{headerShown:false}}  />
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}  />
        <Stack.Screen name="Confirmpayment" component={Confirmpayment} options={{headerShown:false}}  />
        <Stack.Screen name="Terms" component={Terms} options={{headerShown:false}}/>
        <Stack.Screen name="Privacy" component={Privacy} options={{headerShown:false}}/>
        <Stack.Screen name="Forgot" component={Forgot} options={{headerShown:false}}/>
        <Stack.Screen name="Emailotp" component={Emailotp} options={{headerShown:false}}/>


</>


     )}

          </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;

