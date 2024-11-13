import React, { useEffect } from 'react';
import {View,Image,StyleSheet,Modal,Text} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Confirmpayment = ({ navigation }) =>{
    useEffect(()=>{
        const timer = setTimeout(()=>{
            navigation.navigate('Login');
        },2000);
        return () => clearTimeout(timer);
    },[navigation]);
    return(
        <Modal
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.sidebar}>

            <Image
              source={require('../assests/Check.png')}
              style={styles.sidebarImage}
            />
            <Text style={styles.payment}>Payment Complete</Text>
            <Text style={styles.email}>We have send you an email with subscription information</Text>
          </View>
        </View>
      </Modal>
       );
};
export default Confirmpayment;
const styles = StyleSheet.create(
    {
        modalContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: 10,
            width: wp('100%'),  // Full width of the screen
          },
          sidebarImage: {
            width: wp('20%'),  // Responsive width for image
            justifyContent: 'center',
            alignSelf: 'center',
            height: wp('20%'),  // Responsive height for image
            resizeMode: 'center',
          },
          payment: {
            fontSize: wp('4%'),  // Responsive font size
            alignSelf: 'center',
            color: 'black',
            fontFamily: 'inter',
            fontWeight: '500',
          },
          email: {
            alignSelf: 'center',
            marginBottom: hp('3%'),  // Responsive margin bottom
            marginHorizontal: wp('10%'),  // Responsive horizontal margin
            color: '#64748B',
            fontFamily: 'inter',
            fontWeight: '500',
            fontSize: wp('3.2%'),  // Responsive font size
          },
          sidebar: {
            backgroundColor: 'white',
            padding: wp('5%'),  // Responsive padding for sidebar
          },
    });
