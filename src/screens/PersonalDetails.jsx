import React,{useState} from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, Image ,Alert } from 'react-native';
import Country from '../components/country';
import Nationality from  '../components/nationality';
import {firebase} from  '../firebaseConfig';
import Icon from 'react-native-vector-icons/EvilIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';



const PersonalDetails = ({ navigation ,route }) => {
    const { uid, phoneNumber,password } = route.params;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [country, setCountry] = useState('Kenya');
    const [nationality, setNationality] = useState('kenyan');

    const [firstNameerror, setfirstNameerror] = useState('');
    const [lastNameerror, setlastNameerror] = useState('');

    const [countryerror, setcountryerror] = useState('');
    const [nationalityerror, setnationalityerror] = useState('');

    const firstNameregex = /^[A-Za-z]{3,}$/;
    const lastNameregex = /^[A-Za-z]{2,50}$/;

   const handlefirstname = (text) =>{
    setFirstName(text);
    if(!firstNameregex.test(text)){
        setfirstNameerror('Minimun 3 words');
   }else{
    setfirstNameerror('');
   }
};

const handlelastname = (text) =>{
    setLastName(text);
     if(!lastNameregex.test(text)){
        setlastNameerror('Minimun 2 words');
   }else{
    setlastNameerror('');
   }
};


     const handleSaveUserDetails = async () => {
        try {
            if (!lastName) {
                setlastNameerror('Last name is required');
              }
              if (!firstName) {
                setfirstNameerror('First name is required');
              }


       if(firstName && lastName &&  !firstNameerror && !lastNameerror ){
          await firebase.firestore().collection('users').doc(uid).set({
            phoneNumber,
            firstName,
            lastName,
            middlename,
            nationality,
            country,
            password,
            uid,
          });
          navigation.navigate('Professional',{uid });
          console.log('user add successfully');

        }
        else{
        }
        } catch (error) {
          console.error('Error saving user details:', error);
          Alert.alert('Error', error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.steps}>Step 1 of 2</Text>
                <Text style={styles.headertext}>Fill in your personal details</Text>
                <Text style={styles.headertext1}>We need your personal information to set up your profile</Text>
            </View>
            <View style={styles.profileContainer}>
                <Text style={styles.text}>Profile Picture</Text>
                <View style={styles.imageContainer}>
                    <Image source={require('../assests/personal.png')} style={styles.image} />
                    <Pressable style={styles.editIconContainer}>
                    <Icon name="pencil" size={24} color="#000" />
                    </Pressable>
                </View>
            </View>
            <View style={styles.Input}>
                <Text style={styles.email}>First name</Text>
                <TextInput style={styles.TextInput} placeholder="John" placeholderTextColor="#94A3B8"
                 value={firstName} onChangeText={handlefirstname} />
                   {firstNameerror ? <Text style={styles.error}>{firstNameerror}</Text> : null}
                <Text style={styles.email}>Middle name</Text>
                <TextInput style={styles.TextInput} placeholder="Junior" placeholderTextColor="#94A3B8"
                 value={middlename} onChangeText={setMiddlename}/>
                <Text style={styles.email}>Last name</Text>
                <TextInput style={styles.TextInput} placeholder="Doe" placeholderTextColor="#94A3B8"
                 value={lastName} onChangeText={handlelastname}/>
                   {lastNameerror ? <Text style={styles.error}>{lastNameerror}</Text> : null}
                <Text style={styles.email}>Nationality</Text>
               <Nationality    selectedNationality={nationality}
                setSelectedNationality={setNationality}/>
                {nationalityerror ? <Text style={styles.error}>{nationalityerror}</Text> : null}
                <Text style={styles.email}>Country</Text>
               <Country  selectedCountry={country} setSelectedCountry={setCountry} />
               {countryerror ? <Text style={styles.error}>{countryerror}</Text> : null}
            </View>
            <View>
                <Pressable onPress={handleSaveUserDetails}>
                    <View style={styles.button}>
                        <Text style={styles.buttontext}>Continue</Text>
                    </View>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default PersonalDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        marginTop: hp('2.5%'),
        marginLeft: wp('6%'),
        marginRight: wp('6%'),
        width: wp('80%'), // Responsive width
    },
    headertext: {
        fontWeight: '600',
        fontFamily: 'inter',
        color: 'black',
        fontSize: moderateScale(24), // Responsive font size
        marginTop: hp('2.5%'),
        marginLeft: wp('5%'),
    },
    headertext1: {
        fontSize: moderateScale(14),
        fontWeight: '500',
        fontFamily: 'inter',
        marginTop: hp('1%'),
        color: 'black',
        width: wp('80%'),
        marginLeft: wp('5%'),
    },
    text: {
        fontSize: moderateScale(16),
        marginTop: hp('2%'),
        fontFamily: 'inter',
        fontWeight: '500',
        color: 'black',
        marginLeft: wp('1%'),
    },
    profileContainer: {
        marginTop: hp('1%'),
        marginLeft: wp('10%'),
    },
    imageContainer: {},
    image: {
        height: wp('22%'), // Responsive height to keep it square
        width: wp('22%'),
        borderRadius: wp('50%'),
        marginTop: hp('1.5%'),
    },
    editIconContainer: {
        position: 'absolute',
        bottom: hp('1%'),
        backgroundColor: 'white',
        borderRadius: wp('50%'),
        height: hp('3%'),
        width: hp('3%'),
        justifyContent: 'center',
        borderWidth: 1,
        left: wp('18%'),
    },
    Input: {
        marginTop: hp('2%'),
        marginBottom: hp('6%'),
    },
    email: {
        color: 'black',
        height: hp('3%'),
        fontSize: moderateScale(16),
        fontWeight: '500',
        fontFamily: 'inter',
        marginLeft: wp('10%'),
        marginVertical:hp('1%'),
    },
    TextInput: {
        borderWidth: 1,
        width: wp('80%'),
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp('0.5%'),
        marginBottom: hp('1%'),
        borderColor: '#CBD5E1',
        borderRadius: moderateScale(5),
        height: hp('6%'),
        paddingLeft: wp('4%'),
        color: 'black',
        fontSize: moderateScale(16),
    },
    button: {
        backgroundColor: '#0966C3',
        height: hp('5.5%'),
        borderRadius: moderateScale(5),
        marginTop: hp('2.5%'),
        width: wp('80%'),
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: hp('4%'),
    },
    buttontext: {
        color: 'white',
        fontSize: moderateScale(16),
        padding: hp('1.5%'),
        alignSelf: 'center',
        fontWeight: '500',
        fontFamily: 'inter',
    },
    steps: {
        color: '#64748B',
        fontSize: moderateScale(16),
    },
    logo: {
        height: hp('2.5%'),
        width: hp('2.5%'),
        resizeMode: 'center',
        position: 'absolute',
        margin: hp('0.25%'),
    },
    error: {
        color: 'red',
        marginBottom: hp('1%'),
        marginLeft: wp('10%'),
    },
});
