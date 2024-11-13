import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native';
import CustomCheckbox from '../components/CheckBox';
import CountryPicker from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { firebase } from '../firebaseConfig';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters'

const SignUp = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState('IN');
  const [email, setEmail] = useState('');
  const [callingCode, setCallingCode] = useState('91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmation, setConfirmation] = useState(null); // Store the confirmation object

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const phoneNumberRegex = /^\+?\d{1,4}[\s-]?(\(?\d{3}\)?[\s-]?)?[\d\s-]{9,12}$/;

  const handleEmailChange = (text) => {
    setEmail(text);
    if (!emailRegex.test(text)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
     if (!passwordRegex.test(text)) {
      setPasswordError('Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.');
    } else {
      setPasswordError('');
    }
  };

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
     if (!phoneNumberRegex.test(text)) {
      setPhoneError('Please enter a valid phone number.');
    } else {
      setPhoneError('');
    }
  };

  // Send OTP function using Firebase
  // const sendOTP = async (phoneNumber) => {
  //   try {
  //     // Ensure the phone number is in the correct format
  //     const fullPhoneNumber = `${phoneNumber}`;
  //     console.log(fullPhoneNumber);

  //     const confirmation = await firebase.auth().signInWithPhoneNumber(fullPhoneNumber);
  //     setConfirmation(confirmation); // Store confirmation object for OTP verification
  //     console.log('OTP sent to:', fullPhoneNumber);
  //     return true; // Return true if OTP is sent successfully
  //   } catch (error) {
  //     console.error('Error sending OTP:', error.message);  // Log the exact error message
  //     return false; // Return false if OTP failed to send
  //   }
  // };

  const handleCreateUser = async () => {
    try {
      if (!email){
        setEmailError('Email is require');
      }

      if (!password){
        setPasswordError('Password is require');
      }
      if (!phoneNumber){
        setPhoneError('Number is require');
      }
      if (!emailError && !passwordError && !phoneError) {
        // Step 1: Create user with email and password
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const { uid } = userCredential.user;
        // Combine phone number with the country code
        const fullPhoneNumber = `+${callingCode}${phoneNumber}`;
        console.log('phone numer : ' , fullPhoneNumber);
        navigation.navigate('Otp', { uid, phoneNumber: fullPhoneNumber, password });

        // // Step 2: Send OTP to the phone number
        // const otpSent = await sendOTP(fullPhoneNumber);

        // if (otpSent) {
        //   // OTP sent successfully, navigate to the OTP verification page
        //   Alert.alert('Success', 'User created. Please verify your phone number with the OTP sent.');

        // } else {
        //   // OTP failed to send, show error
        //   Alert.alert('Error', 'Failed to send OTP. Please try again.');
        // }
      } else {
        console.log('Some inputs are invalid');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      Alert.alert('Error', error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../assests/logo/logo.png')} style={styles.image} />
      </View>
      <View style={styles.Header}>
        <Text style={styles.Text1}>Create Account</Text>
        <Text style={styles.Text}>Stay updated in your professional world</Text>
      </View>
      <View style={styles.Input}>
        <Text style={styles.email}>Email</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Example@mail.com"
          value={email}
          onChangeText={handleEmailChange}
          placeholderTextColor="#94A3B8"
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <Text style={styles.email}>Phone</Text>
        <View style={styles.phonecontainer}>
          <View style={styles.phone}>
            <View style={styles.phoneinputContainer}>
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withAlphaFilter
                withCallingCode
                withEmoji
                onSelect={(country) => {
                  setCountryCode(country.cca2);
                  setCallingCode(country.callingCode[0]);
                }}
                containerButtonStyle={[styles.countryPickerButton, styles.input, styles.inputField]}
              />
            </View>
            <TextInput
              style={styles.textinput}
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              placeholder="700 200 202"
              placeholderTextColor="#94A3B8"
            />
          </View>
        </View>
        {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}

        <Text style={styles.email}>Password</Text>
        <View style={styles.Passwordcontainer}>
          <View style={styles.PasswordinputContainer}>
            <TextInput
              style={styles.Passwordinput}
              placeholder="********"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor="#94A3B8"
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
              <Icon name={isPasswordVisible ? 'visibility-off' : 'visibility'} size={24} color="#0966C3" />
            </TouchableOpacity>
          </View>
        </View>
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

        <View style={styles.Checkbox}>
          <CustomCheckbox />
          <View style={styles.CheckboxText}>
            <Text style={styles.text}>
              I agree to the Dama Kenya
              <Text style={styles.link} onPress={() => navigation.navigate('Privacy')}> Privacy Policy</Text>
              <Text style={styles.text}> and </Text>
              <Text style={styles.link} onPress={() => navigation.navigate('Terms')}>Terms and Conditions</Text>
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Pressable onPress={handleCreateUser}>
          <View style={styles.button}>
            <Text style={styles.buttontext}>Create Account</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => {}}>
          <View style={styles.Linkedin}>
            <Image source={require('../assests/logo/linkdin.png')} style={styles.logo} />
            <Text style={styles.Linkedintext}>Sign in with LinkedIn</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};


export default SignUp;

const styles = StyleSheet.create(
    {
      container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: wp('40%'),   // Responsive width
        height: hp('7%'),   // Responsive height
        justifyContent: 'center',
        alignSelf: 'center',
        resizeMode: 'center',
        marginTop: hp('4%'), // Responsive margin
    },
    Header: {
        marginLeft: wp('6%'), // Responsive margin
        marginTop: hp('3%'),
    },
    Text1: {
        fontSize: moderateScale(24), // Responsive font size
        color: '#000',
        fontWeight: '600',
        fontFamily: 'inter',
        marginLeft: wp('2.5%'),
    },
    Text: {
        color: 'black',
        fontSize: moderateScale(14),
        fontFamily: 'inter',
        fontWeight: '500',
        marginLeft: wp('2.5%'),
    },
    Input: {
        marginTop: hp('3%'),
    },
    email: {
        color: 'black',
        marginLeft: wp('10%'),
        height: hp('3%'),
        fontSize: moderateScale(16),
        fontWeight: '500',
        fontFamily: 'inter',
    },
    TextInput: {
        borderWidth: 1,
        width: wp('80%'),
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp('1%'),
        marginBottom: hp('1%'),
        borderColor: '#CBD5E1',
        borderRadius: moderateScale(5),
        height: hp('6%'),
        paddingLeft: wp('4%'),
        color: 'black',
    },
    button: {
        backgroundColor: '#0966C3',
        height: hp('5.5%'),
        borderRadius: moderateScale(5),
        marginTop: hp('2.5%'),
        width: wp('80%'),
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttontext: {
        color: 'white',
        fontSize: moderateScale(16),
        padding: hp('1%'),
        alignSelf: 'center',
        fontWeight: '500',
        fontFamily: 'inter',
    },
    Linkedin: {
        marginTop: hp('1.5%'),
        width: wp('80%'),
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: moderateScale(5),
        borderColor: '#CBD5E1',
        height: hp('6%'),
        flexDirection: 'row',
        padding: hp('1%'),
    },
    Linkedintext: {
        color: 'black',
        fontSize: moderateScale(16),
        alignSelf: 'center',
        marginLeft: wp('2.5%'),
    },
    Checkbox: {
        flexDirection: 'row',
        height: hp('6%'),
        width: wp('80%'),
        marginHorizontal: wp('10%'),
        marginVertical: hp('1%'),
    },
    term: {
        flexDirection: 'row',
    },
    CheckboxText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: moderateScale(14),
        color: '#000',
    },
    link: {
        color: '#007BFF',
    },
    logo: {
        height: hp('3%'),
        width: wp('5%'),
        resizeMode: 'center',
        marginTop: hp('1%'),
    },
    press: {
        borderWidth: 1,
        justifyContent: 'center',
        marginLeft: wp('5%'),
    },
    phonecontainer: {
        backgroundColor: '#fff',
        padding: hp('1%'),
    },
    phone: {
        flexDirection: 'row',
        height: hp('6%'),
        width: wp('80%'),
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: moderateScale(5),
    },
    phonetextinput: {
        height: hp('5%'),
        width: wp('75%'),
        alignSelf: 'center',
        color: 'black',
    },
    phoneinputContainer: {
        alignSelf: 'center',
        marginLeft: wp('4%'),
    },
    Passwordcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: hp('2%'),
        backgroundColor: 'white',
        marginVertical: hp('2%'),
    },
    PasswordinputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp('80%'),
        height: hp('6%'),
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: moderateScale(5),
        paddingLeft: wp('4%'),
    },
    Passwordinput: {
        flex: 1,
        padding: hp('1%'),
        borderRadius: moderateScale(5),
        color: 'black',
        width: wp('80%'),
        height: hp('6%'),
    },
    iconContainer: {
        padding: hp('1%'),
    },
    textinput: {
        height: hp('6%'),
        width: wp('75%'),
    },
    error: {
        color: 'red',
        marginBottom: hp('1%'),
        marginLeft: wp('10%'),
    },
});
