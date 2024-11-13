import React, { useEffect } from 'react';
import {View,Image,StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';
const Singin = ({ navigation }) =>{
    useEffect(()=>{
        const timer = setTimeout(()=>{
            navigation.navigate('Login');
        },5000);
        return () => clearTimeout(timer);
    },[navigation]);
    return(
            <View style={styles.container}>
    <Image source={require('../assests/logo/logo.png')} style={styles.image}/>
      </View>
       );
};
export default Singin;
const styles = StyleSheet.create(
    { container: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: wp('40%'),            // Responsive width based on screen width
        justifyContent: 'center',
        alignSelf: 'center',
        height: hp('8%'),             // Responsive height based on screen height
        resizeMode: 'center',
        marginTop: hp('4.5%'),        // Responsive margin
    },
    });
