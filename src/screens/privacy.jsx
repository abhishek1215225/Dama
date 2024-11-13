import React from 'react';
import { Text,View, StyleSheet,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');

// Define a function to scale font size
const scaleFont = (size) => size * (width / 375);
const Privacy = ({ navigation }) =>{
    return(
        <View style={styles.container}>
            <View style={styles.firsttab}>
            <Icon name="arrowleft" size={24} color="#64748B"  onPress={() => navigation.goBack()}/>
            <Text style={styles.title}>Privacy Policy</Text>
            </View>
            <View style={styles.modelthick}/>
            <View style={styles.secondtab}>
                <Text style={styles.title1}>Privacy Policy</Text>
                <Text style={styles.date}> Last update 10 Aug 2021</Text>
                <Text style={styles.terms}>Lorem ipsum dolor sit amet consectetur. 
                    Feugiat amet aliquam ultrices orci at diam. Id eu sed purus suspendisse 
                    sit sit aliquet. Amet dictum sapien consectetur nunc. Id netus nulla arcu 
                    vel habitant vitae. Odio leo hendrerit facilisis volutpat venenatis sed nec 
                    vitae accumsan. Malesuada integer mi vulputate aliquam felis viverra hendrerit
                     felis. Ultricies libero nisl duis urna scelerisque lorem eget amet. Mi nascetur
                      accumsan ultricies lorem. Feugiat proin nunc in pretium. Fermentum id platea 
                      vestibulum vulputate velit neque malesuada amet iaculis. Odio rhoncus vestibulum 
                      quisque in magna hac imperdiet gravida.
                      </Text>
                      <Text style={styles.terms1}>Lorem ipsum dolor sit amet consectetur. 
                    Feugiat amet aliquam ultrices orci at diam. Id eu sed purus suspendisse 
                    sit sit aliquet. Amet dictum sapien consectetur nunc. Id netus nulla arcu 
                    vel habitant vitae. Odio leo hendrerit facilisis volutpat venenatis sed nec 
                    vitae accumsan. Malesuada integer mi vulputate aliquam felis viverra hendrerit
                     felis. Ultricies libero nisl duis urna scelerisque lorem eget amet. Mi nascetur
                      accumsan ultricies lorem. Feugiat proin nunc in pretium. Fermentum id platea 
                      vestibulum vulputate velit neque malesuada amet iaculis. Odio rhoncus vestibulum 
                      quisque in magna hac imperdiet gravida.
                      </Text>
            </View>
        </View>
    );
};
export default Privacy;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
   // 5% of screen width for padding
},
firsttab: {
    flexDirection: 'row',
    height: height * 0.06, // 6% of screen height
    alignItems: 'center',
    paddingLeft: width * 0.05, // 5% of screen width
},
title: {
    color: '#1E293B',
    fontFamily: 'Inter',
    fontSize: scaleFont(14), // Scaled font size
    fontWeight: '500',
    paddingLeft: width * 0.06, // 6% of screen width
},
modelthick: {
    height: height * 0.01, // 1% of screen height
    width: '100%',
    backgroundColor: '#CBD5E1',
},
title1: {
    color: '#1E293B',
    fontFamily: 'Inter',
    fontSize: scaleFont(14),
    fontWeight: '500',
},
secondtab: {
    margin: width * 0.06, // 6% of screen width
},
date: {
    color: '#64748B',
    fontFamily: 'Inter',
    fontSize: scaleFont(12),
    fontWeight: '500',
    marginVertical: height * 0.012, // 1.2% of screen height
},
terms: {
    color: '#64748B',
    fontFamily: 'Inter',
    fontSize: scaleFont(14),
    fontWeight: '500',
},
terms1: {
    color: '#64748B',
    fontFamily: 'Inter',
    fontSize: scaleFont(14),
    fontWeight: '500',
    marginVertical: height * 0.02, // 2% of screen height
},
});
