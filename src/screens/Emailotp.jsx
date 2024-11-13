import React from 'react';
import {View,Text,TextInput,StyleSheet,Pressable,Image} from 'react-native';

const Emailotp = ({ navigation }) =>{
    return(<View style={styles.container}>
         <View style={styles.container2}>
            <Pressable onPress={()=>navigation.goBack()}>
        <Image source={require('../assests/logo/left.png')} style={styles.left}/>
        </Pressable>
        <View style={styles.header}>
        <Text style={styles.text}>Verify Email</Text>
        <Text style={styles.text1}>Enter OTP below to verify Email </Text>
        </View>
        </View>
        <View style={styles.inputs}>
        <TextInput style={styles.input} placeholder="5" placeholderTextColor="#94A3B8" maxLength={1}  keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="5" placeholderTextColor="#94A3B8" maxLength={1}  keyboardType="numeric"/>
        <TextInput style={styles.input} placeholder="5" placeholderTextColor="#94A3B8" maxLength={1}  keyboardType="numeric"/>
        <TextInput style={styles.input} placeholder="5" placeholderTextColor="#94A3B8" maxLength={1}  keyboardType="numeric"/>
        </View>
        <View>
            <Pressable onPress={() => navigation.navigate('ResetPassword')}>
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
export default Emailotp;
const styles = StyleSheet.create(
    {
        container:{
            flex:1,
        },
        header:{
            marginTop:25,
        },
        text:{
            fontSize:24,
            fontWeight:'600',
            color:'#000',
            fontFamily:'inter',

        },
        text1:{
            color:'black',
            fontWeight:'500',
            fontSize:14,
            fontFamily:'inter',
            marginTop:8,
        },
        inputs:{
            flexDirection:'row',
            justifyContent:'space-evenly',
            marginTop:30,
        },
        input:{
            borderWidth:1,
            width:60,
            height:60,
            borderRadius:3,
            textAlign:'center',
            borderColor:'#CBD5E1',
            color:'black',
        },
        button:{
            backgroundColor:'#0966C3',
            height:44,
            borderRadius:5,
            marginTop:30,
            width:312,
            justifyContent:'center',
            alignSelf:'center',
        },
        buttontext:{
            color:'white',
            fontSize:16,
            padding:9,
            alignSelf:'center',
            fontWeight:'500',
            fontFamily:'inter',
        },
        Resend:{
            flexDirection:'row',
            justifyContent:'center',
            marginTop:30,
        },
        resendTExt:{
            color:'#0966C3',
            textDecorationLine:'underline',
            fontSize:16,
            fontFamily:'inter',
        },
        symbol:{
            fontSize:25,
            marginLeft:30,
            marginTop:20,
            fontWeight:'bold',
            color:'black',
        },
        left:{
            height:24,
            width:24,
            marginTop:25,
            paddingLeft:24,
        },
        textresend:{
            fontSize:16,
            fontFamily:'inter',
            color:'black',
        },
        container2:{
            paddingLeft:24,

        },
    });
