import React, { useState } from 'react';
import {View,Text,TextInput,StyleSheet,Pressable,Image,Alert,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');

import { firebase } from '../firebaseConfig'; // Ensure the path is correct

const Forgot = ({ navigation }) =>{
    const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      Alert.alert('Email Sent', 'A password reset link has been sent to your email.');
     navigation.goBack();
        } catch (error) {
      console.error('Error sending password reset email:', error);
      Alert.alert('cehck  your email', 'Please check your email address and try again.');
    }
  };
    return(<View style={styles.container}>
         <View style={styles.container2}>
            <Pressable onPress={()=>navigation.goBack()}>
        <Image source={require('../assests/logo/left.png')} style={styles.left}/>
        </Pressable>
        <View style={styles.header}>
        <Text style={styles.text}>Forgot Your Password?</Text>
        <Text style={styles.text1}>Enter your Email  Address to retrieve your password</Text>
        </View>
        </View>
        <View style={styles.inputs}>
            <Text style={styles.email} >Email </Text>

        <TextInput style={styles.input} placeholder="Example@gmail.com" placeholderTextColor="#94A3B8"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail} />
        </View>
        <View>
            <Pressable onPress={handleForgotPassword}>
                <View  style={styles.button} >
                <Text style={styles.buttontext}>Send</Text>
                </View>
                </Pressable>
                </View>
       </View>);
};
export default Forgot;
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
          },
          header: {
            marginTop: height * 0.03, // 3% of screen height
          },
          text: {
            fontSize: width * 0.06, // 6% of screen width
            fontWeight: '600',
            color: '#000',
            fontFamily: 'inter',
            marginLeft: width * 0.02,
          },
          text1: {
            color: 'black',
            fontWeight: '500',
            fontSize: width * 0.04, // 4% of screen width
            fontFamily: 'inter',
            marginTop: height * 0.008, // 2% of screen height
            width: width * 0.8, // 80% of screen width
            marginLeft: width * 0.02,
          },
          inputs: {
            marginTop: height * 0.03, // 3% of screen height
          },
          input: {
            borderWidth: 1,
            width: width * 0.85, // 85% of screen width
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: height * 0.01, // 1% of screen height
            marginBottom: height * 0.02, // 2% of screen height
            borderColor: '#CBD5E1',
            borderRadius: 5,
            height: height * 0.06, // 6% of screen height
            paddingLeft: width * 0.04, // 4% of screen width
            color: 'black',
          },
          button: {
            backgroundColor: '#0966C3',
            height: height * 0.06, // 6% of screen height
            borderRadius: 5,
            marginTop: height * 0.04, // 4% of screen height
            width: width * 0.85, // 85% of screen width
            justifyContent: 'center',
            alignSelf: 'center',
          },
          buttontext: {
            color: 'white',
            fontSize: width * 0.04, // 4% of screen width
            padding: height * 0.01, // 2% of screen height
            alignSelf: 'center',
            fontWeight: '500',
            fontFamily: 'inter',
          },
          Resend: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: height * 0.04, // 4% of screen height
          },
          resendTExt: {
            color: '#0966C3',
            textDecorationLine: 'underline',
            fontSize: width * 0.04, // 4% of screen width
            fontFamily: 'inter',
          },
          symbol: {
            fontSize: width * 0.07, // 7% of screen width
            marginLeft: width * 0.08, // 8% of screen width
            marginTop: height * 0.03, // 3% of screen height
            fontWeight: 'bold',
            color: 'black',
          },
          left: {
            height: height * 0.04, // 4% of screen height
            width: height * 0.04, // 4% of screen height
            marginTop: height * 0.03, // 3% of screen height
            paddingLeft: width * 0.06, // 6% of screen width
          },
          textresend: {
            fontSize: width * 0.04, // 4% of screen width
            fontFamily: 'inter',
            color: 'black',
          },
          container2: {
            paddingLeft: width * 0.06, // 6% of screen width
          },
          email: {
            color: 'black',
            marginLeft: width * 0.08, // 7% of screen width
            height: height * 0.03, // 3% of screen height
            fontSize: width * 0.04, // 4% of screen width
            fontWeight: '500',
            fontFamily: 'inter',

          },
    });
