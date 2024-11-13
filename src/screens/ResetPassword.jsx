import React from 'react';
import {View,Text,StyleSheet,Pressable,Image} from 'react-native';
import PasswordInputExample from '../components/passwordtab';

const ResetPassword = ({ navigation }) =>{

    
    return(<View style={styles.container}>
         <View style={styles.container2}>
            <Pressable onPress={()=>navigation.goBack()}>
        <Image source={require('../assests/logo/left.png')} style={styles.left}/>
        </Pressable>
        <View style={styles.header}>
        <Text style={styles.text}>Reset Your Password</Text>
        <Text style={styles.text1}>Your  Email has been verified!</Text>
        <Text style={styles.text2}> Set Your New Password</Text>
        </View>
        </View>
        <View style={styles.inputs}>
            <Text style={styles.email} >New Password </Text>

        <PasswordInputExample/>
        </View>
        <View style={styles.inputs2}>
            <Text style={styles.email} >Confirm Password </Text>

            <PasswordInputExample />

               </View>
        <View>
            <Pressable onPress={() => navigation.navigate('Login')}>
                <View  style={styles.button} >
                <Text style={styles.buttontext}>Update</Text>
                </View>
                </Pressable>
                </View>
       </View>);
};
export default ResetPassword;
const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor:'white',
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
            width:300,
        },
        text2:{
            color:'black',
            fontWeight:'500',
            fontSize:14,
            fontFamily:'inter',
            width:300,
        },
        inputs:{
            marginTop:20,
        },
        inputs2:{
            marginTop:10,
        },
        input:{
            borderWidth:1,
            width:312,
            justifyContent:'center',
            alignSelf:'center',
            marginTop:5,
            marginBottom:10,
            borderColor:'#CBD5E1',
            borderRadius:5,
            height:48,
            paddingLeft:15,
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
            height:30,
            width:30,
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
        email:{
            color:'black',
            marginLeft:26,
            height:24,
            fontSize:16,
            fontWeight:'500',
            fontFamily:'inter',
        },
    });
