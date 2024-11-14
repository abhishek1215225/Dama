
import React,{useState, useEffect } from 'react';
import {View,Image,StyleSheet,Text,TextInput,Pressable ,Alert,Dimensions} from 'react-native';
import { firebase}  from '../firebaseConfig';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';





const Login = ({ navigation }) =>{
    const [email, setEmail] = useState('');
    const { width, height } = Dimensions.get('window');


    const [password, setPassword] = useState('');

    const handleSubmit =  () => {


      firebase.auth().signInWithEmailAndPassword( email, password)

        .then((userCredential) => {
            const { uid } = userCredential.user;
            console.log('user id : ', uid);
        navigation.navigate('Home',{uid});
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            Alert.alert('Invalid Email', 'Invalid Email');
          } else if (error.code === 'auth/user-not-found') {
            Alert.alert('User Not Found', 'User Not Found.');
          } else if (error.code === 'auth/wrong-password') {
            Alert.alert('Incorrect Password', 'The password is incorrect.');
          } else {
            Alert.alert('Authentication Error', error.message);
          }
        });


      };


    return(<View style={styles.container}>
        <View>

    <Image source={require('../assests/logo/logo.png')} style={styles.image}/>
    </View>
       <View style={styles.Header}>
        <Text style={styles.Text1}>Sign in</Text>
        <Text style={styles.Text}>Stay updated in your professional world</Text>
       </View>
       <View style={styles.Input}>
        <Text style={styles.email}>Email</Text>
        <TextInput style={styles.TextInput} placeholder="Example@gmail.com"
        placeholderTextColor="#94A3B8"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"/>
        <Text style={styles.email}>Password</Text>
        <TextInput style={styles.TextInput} placeholder="*******" placeholderTextColor="#94A3B8"
         value={password}
         onChangeText={setPassword}
         secureTextEntry
         />
        <Pressable onPress={() => navigation.navigate('Forgot')}>
        <Text style={styles.forget}>Forgot Password ?</Text>
        </Pressable>
        </View>
        <View>
            <Pressable onPress={handleSubmit}>
                <View  style={styles.button} >
                <Text style={styles.buttontext}>Login</Text>
                </View>
                </Pressable>
                <Pressable onPress={''}>
                <View  style={styles.Linkedin} >
                <Image source={require('../assests/logo/linkdin.png')}  style={styles.logo}/>
                <Text style={styles.Linkedintext}>Sign in with LinkedIn</Text>
                </View>
                </Pressable>
                <Pressable onPress={''}>
                <View  style={styles.Linkedin} >
                <Image source={require('../assests/logo/Fingerprint.png')}  style={styles.logo}/>
                <Text style={styles.Linkedintext}>Sign in with Touch ID</Text>
                </View>
                </Pressable >
                <View style={styles.Resend}>
                    <Text style={styles.text}>Don't have an account ? </Text>
                    <Pressable onPress={()=> navigation.navigate('SingUp')}>
                        <Text style={styles.resendTExt}> Register</Text>
                    </Pressable>
                </View>
        </View>
       </View>);
};
export default Login;
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        image: {
            width: wp('42%'),  // Set to 42% of screen width
            height: hp('7.5%'),  // Set to 7.5% of screen height
            justifyContent: 'center',
            alignSelf: 'center',
            resizeMode: 'center',
            marginTop: hp('4%'),  // Margin responsive to screen height
        },
        Header: {
            marginLeft: wp('10%'),  // Responsive left margin
            height: hp('7.5%'),
            width: wp('70%'),
            marginTop: hp('3%'),
        },
        Text1: {
            fontSize: moderateScale(24),  // Scaled font size
            color: '#000',
            fontFamily: 'inter',
            fontWeight: '600',
        },
        Text: {
            color: 'black',
            fontSize: moderateScale(14),
            fontFamily: 'inter',
            fontWeight: '500',
            marginTop: hp('1%'),
        },
        Input: {
            marginTop: hp('2.5%'),
        },
        email: {
            color: 'black',
            marginLeft: wp('10%'),
            height: hp('3%'),
            fontSize: moderateScale(16),
            fontWeight: '500',
            fontFamily: 'inter',
            marginTop: hp('2%'),
            marginBottom: hp('1%'),
        },
        TextInput: {
            borderWidth: 1,
            width: wp('80%'),
            alignSelf: 'center',
            marginTop: hp('0.5%'),
            marginBottom: hp('1.25%'),
            borderColor: '#CBD5E1',
            borderRadius: 5,
            height: hp('6%'),
            paddingLeft: wp('3.5%'),
            color: 'black',
        },
        button: {
            backgroundColor: '#0966C3',
            height: hp('5.5%'),
            borderRadius: 5,
            marginTop: hp('2.5%'),
            width: wp('80%'),
            justifyContent: 'center',
            alignSelf: 'center',
        },
        buttontext: {
            color: 'white',
            fontSize: moderateScale(16),
            paddingVertical: hp('1%'),
            alignSelf: 'center',
            fontWeight: '500',
            fontFamily: 'inter',
        },
        Linkedin: {
            marginTop: hp('1.25%'),
            width: wp('80%'),
            justifyContent: 'center',
            alignSelf: 'center',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#CBD5E1',
            height: hp('6%'),
            flexDirection: 'row',
            padding: hp('1%'),
        },
        Linkedintext: {
            color: 'black',
            fontSize: moderateScale(16),
            fontWeight: '500',
            fontFamily: 'inter',
            alignSelf: 'center',
            marginLeft: wp('2.5%'),
        },
        forget: {
            color: '#0966C3',
            textAlign: 'right',
            marginRight: wp('7.5%'),
            fontSize: moderateScale(16),
            fontWeight: '500',
            fontFamily: 'inter',
        },
        Resend: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: hp('2.5%'),
            height: hp('3%'),
            width: wp('65%'),
        },
        resendText: {
            color: 'blue',
            textDecorationLine: 'underline',
        },
        text: {
            color: 'black',
            fontSize: moderateScale(16),
            fontWeight: '500',
            fontFamily: 'inter',

        },
        logo: {
            height: hp('2.5%'),
            width: hp('2.5%'),  // Adjust logo size to be proportional
            resizeMode: 'center',
            marginTop: hp('1%'),
        },
        errorText: {
            color: 'red',
            marginLeft: wp('6%'),
        },
        resendTExt:{
            color: 'blue',
            textDecorationLine: 'underline',
            fontSize: moderateScale(14),
            fontWeight: '500',
            fontFamily: 'inter',
        },
    });
