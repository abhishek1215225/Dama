import React, { useEffect } from 'react';
import {View,Image,StyleSheet,Modal,Text} from 'react-native';
const Reservation = ({ navigation }) =>{
    useEffect(()=>{
        const timer = setTimeout(()=>{
            navigation.goBack();
        },500);
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
            <Text style={styles.payment}>Reservation Confirmed</Text>
            <Text style={styles.email}>We're thrilled to have you join us. 
                Your reservation is confirmed, and we look forward to welcoming you soon.</Text>
                <View>
                <Text style={styles.google}>Google Cloud Next 2024 Conference</Text>
                <View style={styles.date}>
                <Text style={styles.email1}>28th August 2024</Text>
                <Text style={styles.email1}>Nairobi, Kenya</Text>
                </View>
                </View>
          </View>
        </View>
      </Modal>
       );
};
export default Reservation;
const styles = StyleSheet.create(
    {
        modalContainer:{
            flex:1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: 10,
        },
        sidebarImage:{
            width:96,
            justifyContent:'center',
            alignSelf:'center',
            height:96,
            resizeMode:'center',
        },
        payment:{
            fontSize:16,
            alignSelf:'center',
            color:'black',
            fontFamily:'inter',
            fontWeight:'500',
        },
        email:{
            alignSelf:'center',
            marginBottom:20,
            marginHorizontal:70,
            color:'#64748B',
            fontFamily:'inter',
            fontWeight:'500',
            fontSize:12,
        },
        sidebar:{
            backgroundColor:'white',
        },
        google:{
            fontSize:14,
            alignSelf:'center',
            color:'black',
            fontFamily:'inter',
            fontWeight:'500',
            marginTop:10,

        },
        date:{
            flexDirection:'row',
            justifyContent:'center'

        },
        email1:{
            alignSelf:'center',
            marginBottom:20,
            marginLeft:20,
            color:'#64748B',
            fontFamily:'inter',
            fontWeight:'500',
            fontSize:12,
        },
    });
