import React from 'react';
import { Text , View ,Image ,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';
const About = ({ navigation }) => {
    return(<View style={styles.container}>
         <View style={styles.firsttab}>
            <Icon name="arrowleft" size={24} color="#64748B"  onPress={()=> navigation.goBack()}/>
            <Text style={styles.title}>About Us</Text>
            </View>
            <View style={styles.modelthick}/>
            <View style={styles.secondtab}>
            <Text style={styles.title1}>About Us</Text>
            <Text style={styles.terms}>Lorem ipsum dolor sit amet consectetur. Tellus egestas senectus pellentesque 
                a sapien ultricies. Eget ultricies cursus quam auctor sed semper. Nisl elementum 
                amet natoque ipsum quis sed. Convallis vestibulum nisi neque vel massa.</Text>
            </View>
            <View style={styles.image1}>
                        <Image source={require('../assests/aboutus.png')} style={styles.image}/>
            </View>

            <View style={styles.secondtab}>
                <Text style={styles.vision}>Vision</Text>
                <Text style={styles.terms} >Lorem ipsum dolor sit amet consectetur. Tellus egestas 
                    senectus</Text>

                    <Text style={styles.vision}>Mission</Text>
                <Text style={styles.terms} >pellentesque a sapien ultricies. Eget ultricies cursus quam auctor sed semper.</Text>
            </View>

    </View>);
};
export default About;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
},
firsttab: {
    flexDirection: 'row',
    height: hp('5%'),  // Responsive height
    alignItems: 'center',
    paddingLeft: wp('5%'), // Responsive padding
},
title: {
    color: '#1E293B',
    fontFamily: 'inter',
    fontSize: moderateScale(14), // Scaled font size
    fontWeight: '500',
    paddingLeft: wp('6%'), // Responsive padding
},
modelthick: {
    height: hp('1%'), // Responsive height
    width: '100%',
    backgroundColor: '#CBD5E1',
},
title1: {
    color: '#1E293B',
    fontFamily: 'inter',
    fontSize: moderateScale(16), // Scaled font size
    fontWeight: '500',
},
secondtab: {
    margin: wp('6%'), // Responsive margin
},
terms: {
    color: '#64748B',
    fontFamily: 'inter',
    fontSize: moderateScale(14), // Scaled font size
    fontWeight: '500',
    marginVertical: hp('1%'), // Responsive margin
},
image: {
    height: hp('30%'), // Responsive height
    width: wp('100%'), // Responsive width

},
image1: {
    height: hp('30%'), // Responsive height
    width: wp('100%'), // Responsive width

},
vision: {
    fontFamily: 'inter',
    fontSize: moderateScale(16), // Scaled font size
    color: '#1E293B',
    fontWeight: '500',
},
});
