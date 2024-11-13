import React from 'react';
import {View,Text,TextInput,StyleSheet,Pressable,Image} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

const Otp = ({ navigation , route }) =>{
    const { uid, phoneNumber ,password } = route.params;
    return(<View style={styles.container}>
         <View style={styles.container2}>
            <Pressable onPress={()=>navigation.navigate('SingUp')}>
        <Image source={require('../assests/logo/left.png')} style={styles.left}/>
        </Pressable>
        <View style={styles.header}>
        <Text style={styles.text}>Verify Phone</Text>
        <Text style={styles.text1}>Enter OTP below to verify phone number</Text>
        </View>
        </View>
        <View style={styles.inputs}>
        <TextInput style={styles.input} placeholder="5" placeholderTextColor="#94A3B8" maxLength={1}  keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="5" placeholderTextColor="#94A3B8" maxLength={1}  keyboardType="numeric"/>
        <TextInput style={styles.input} placeholder="5" placeholderTextColor="#94A3B8" maxLength={1}  keyboardType="numeric"/>
        <TextInput style={styles.input} placeholder="5" placeholderTextColor="#94A3B8" maxLength={1}  keyboardType="numeric"/>
        </View>
        <View>
            <Pressable onPress={() => navigation.navigate('Personal',{uid,phoneNumber,password})}>
                <View  style={styles.button} >
                <Text style={styles.buttontext}>Verify</Text>
                </View>
                </Pressable>
                </View>
                <View style={styles.Resend}>
                    <Text style={styles.textresend}>Didnt receive OTP? </Text>
                    <Pressable>
                        <Text style={styles.resendTExt}> Resend</Text>
                    </Pressable>
                </View>
       </View>);
};
export default Otp;
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        header: {
            marginTop: hp('3%'), // Responsive margin
        },
        text: {
            fontSize: moderateScale(24), // Responsive font size
            fontWeight: '600',
            color: '#000',
            fontFamily: 'inter',
            marginLeft: wp('3%'),
        },
        text1: {
            color: 'black',
            fontWeight: '500',
            fontSize: moderateScale(14),
            fontFamily: 'inter',
            marginTop: hp('1%'), // Responsive margin
            marginLeft: wp('3%'),
        },
        text2:{
            color: 'black',
            fontWeight: '500',
            fontSize: moderateScale(14),
            fontFamily: 'inter',
            marginTop: hp('0.5%'), // Responsive margin
            marginLeft: wp('3%'),
        },
        inputs: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: hp('4%'), // Responsive margin
            marginHorizontal: wp('3%'),
        },
        input: {
            borderWidth: 1,
            width: wp('15%'), // Responsive width
            height: wp('15%'), // Responsive height to keep it square
            borderRadius: moderateScale(3),
            textAlign: 'center',
            borderColor: '#CBD5E1',
            color: 'black',
        },
        button: {
            backgroundColor: '#0966C3',
            height: hp('5.5%'),
            borderRadius: moderateScale(5),
            marginTop: hp('4%'),
            width: wp('80%'),
            justifyContent: 'center',
            alignSelf: 'center',
        },
        buttontext: {
            color: 'white',
            fontSize: moderateScale(16),
            padding: hp('1.5%'),
            alignSelf: 'center',
            fontWeight: '500',
            fontFamily: 'inter',
        },
        Resend: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: hp('4%'),
        },
        resendTExt: {
            color: '#0966C3',
            textDecorationLine: 'underline',
            fontSize: moderateScale(16),
            fontFamily: 'inter',
        },
        symbol: {
            fontSize: moderateScale(25),
            marginLeft: wp('7%'),
            marginTop: hp('2%'),
            fontWeight: 'bold',
            color: 'black',
        },
        left: {
            height: hp('3%'),
            width: hp('3%'),
            marginTop: hp('3%'),
            paddingLeft: wp('6%'),
        },
        textresend: {
            fontSize: moderateScale(16),
            fontFamily: 'inter',
            color: 'black',
        },
        container2: {
            paddingLeft: wp('6%'),
        },
    });
