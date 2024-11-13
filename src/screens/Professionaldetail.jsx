import React , {useState} from 'react';
import {View,Text,TextInput,StyleSheet,Pressable,ScrollView , Alert} from 'react-native';
import {firebase} from '../firebaseConfig';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';
const ProfessionalDetail = ({navigation , route}) =>{
    const { uid } = route.params;
    const [tittle, setTittle] = useState('');
    const [company, setCompany] = useState('');
    const [bio, setBio] = useState('');

    const [titleError, settitleError] = useState('');
    const [companyError, setcompanyError] = useState('');

    const [bioError, setbioError] = useState('');
    const Bioregex = /^[A-Za-z]+(?: [A-Za-z]+){4,}$/;

    const titleregex = /^[A-Za-z]{3,}$/;
    const companyregex =  /^[A-Za-z]+(?: [A-Za-z]+){1,}$/;




const handleBio = (text) =>{
    setBio(text);
    if(!Bioregex.test(text)){
        setbioError('Minimun 5 words');
   }else{
    setbioError('');
   }
};

const handleTitle = (text) =>{
    setTittle(text);
    if(!titleregex.test(text)){
        settitleError('Minimun 3 words');
   }else{
    settitleError('');
   }
};

const handleCompany = (text) =>{
    setCompany(text);
    if(!companyregex.test(text)){
        setcompanyError('Minimun 3 words');
   }else{
    setcompanyError('');
   }
};


    const handleSaveUserDetails = async () => {
        try {
            if (!bio) {
                setbioError(' Bio  is required');
              }
              if (!company) {
                setcompanyError('Company is required');
                }
                if (!tittle) {
                    settitleError('Title  is required');
                    }
            if(tittle && company &&  bio && !titleError && !companyError && !bioError){
          // Step 2: Add additional user details to Firestore
          await firebase.firestore().collection('users').doc(uid).update({
            tittle,
            company,
            bio,
          });
          navigation.navigate('Welcome');
        }

        } catch (error) {
          console.error('Error saving user details:', error);
          Alert.alert('Error', error.message);
        }
      };

    return(
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.steps}>Step 2 of 2</Text>
                <Text style={styles.headertext}>Fill in Professional details</Text>
                <Text style={styles.headertext1}>We need your professional information to set up your profile</Text>
            </View>
            <View style={styles.Input}>
        <Text style={styles.email}>Tittle</Text>
        <TextInput style={styles.TextInput} placeholder="Accountant"  placeholderTextColor="#94A3B8"
        value={tittle} onChangeText={handleTitle}/>
        {titleError ? <Text style={styles.error}>{titleError}</Text> : null}
       <Text style={styles.email}>Company / Institution</Text>
       <TextInput style={styles.TextInput} placeholder="Karatasi Brands" placeholderTextColor="#94A3B8"
       value={company} onChangeText={handleCompany} />
       {companyError ? <Text style={styles.error}>{companyError}</Text> : null}
        <Text style={styles.email}>Brief Bio</Text>
        <TextInput style={styles.TextInput1} placeholder="Description here..."
        multiline
        numberOfLines={8}
        textAlignVertical="top"
        placeholderTextColor="#94A3B8"
        value={bio}
        onChangeText={handleBio}
        />
        {bioError ? <Text style={styles.error}>{bioError}</Text> : null}
         </View>
        <View>
        <Pressable onPress={handleSaveUserDetails}>
                <View  style={styles.button} >
                <Text style={styles.buttontext}>Finish</Text>
                </View>
                </Pressable>
                <Pressable onPress={()=> navigation.goBack()}>
                <View  style={styles.Linkedin} >
                <Text style={styles.Linkedintext}>Back</Text>
                </View>
                </Pressable>
        </View>
        </ScrollView>
    );
};
export default  ProfessionalDetail;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        marginTop: hp('2%'), // Responsive marginTop
        marginLeft: wp('10%'), // Responsive marginLeft
    },
    headertext: {
        fontWeight: '600',
        fontFamily: 'inter',
        color: 'black',
        fontSize: moderateScale(24), // Responsive font size
        marginTop: hp('2%'), // Responsive marginTop
    },
    headertext1: {
        fontSize: moderateScale(14), // Responsive font size
        fontWeight: '500',
        fontFamily: 'inter',
        marginTop: hp('1%'), // Responsive marginTop
        color: 'black',
        width: wp('80%'), // Responsive width
    },
    Input: {
        marginVertical: hp('2%'), // Responsive vertical margin
    },
    email: {
        color: 'black',
        height: hp('3%'), // Responsive height
        fontSize: moderateScale(16), // Responsive font size
        fontWeight: '500',
        fontFamily: 'inter',
        marginLeft: wp('10%'), // Responsive marginLeft
    },
    TextInput: {
        borderWidth: 1,
        width: wp('80%'), // Responsive width
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp('1%'), // Responsive marginTop
        marginBottom: hp('2%'), // Responsive marginBottom
        borderColor: '#CBD5E1',
        borderRadius: 5,
        height: hp('6%'), // Responsive height
        paddingLeft: wp('4%'), // Responsive paddingLeft
        color: 'black',
    },
    button: {
        backgroundColor: '#0966C3',
        height: hp('6%'), // Responsive height
        borderRadius: 5,
        marginTop: hp('2%'), // Responsive marginTop
        width: wp('80%'), // Responsive width
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttontext: {
        color: 'white',
        fontSize: moderateScale(16), // Responsive font size
        padding: wp('2%'), // Responsive padding
        alignSelf: 'center',
        fontWeight: '500',
        fontFamily: 'inter',
    },
    TextInput1: {
        borderWidth: 1,
        width: wp('80%'), // Responsive width
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp('1%'), // Responsive marginTop
        marginBottom: hp('2%'), // Responsive marginBottom
        borderColor: '#CBD5E1',
        borderRadius: 5,
        padding: wp('4%'), // Responsive padding
        color: 'black',
        height: hp('20%'), textAlignVertical: 'top',
    },
    Linkedin: {
        marginTop: hp('1%'), // Responsive marginTop
        width: wp('80%'), // Responsive width
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CBD5E1',
        height: hp('6%'), // Responsive height
        flexDirection: 'row',
        padding: wp('3%'), // Responsive padding
    },
    Linkedintext: {
        color: 'black',
        fontSize: moderateScale(16), // Responsive font size
        fontWeight: '500',
        fontFamily: 'inter',
        alignSelf: 'center',
        marginLeft: wp('3%'), // Responsive marginLeft
    },
    steps: {
        color: '#64748B',
        fontSize: moderateScale(16), // Responsive font size
    },
    error: {
        color: 'red',
        marginBottom: hp('1%'),
        marginLeft: wp('10%'),
    },
});
