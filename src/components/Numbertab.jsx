import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

const PhoneInputComponent = () => {
  const [countryCode, setCountryCode] = useState('IN');
  const [phoneNumber, setPhoneNumber] = useState('');


  return (
    <View style={styles.phonecontainer}>
      <View style={styles.phone}>
          <View style={styles.phoneinputContainer}>
          <CountryPicker
            countryCode={countryCode}
            withFilter
            withFlag
            withAlphaFilter
            withCallingCode
            withEmoji
            onSelect={(country) => {
              setCountryCode(country.cca2);
            }}
            containerButtonStyle={[styles.countryPickerButton, styles.input, styles.inputField]}
          />
          </View>
          <TextInput style={styles.textinput} keyboardType="numeric" value={phoneNumber} onChangeText={setPhoneNumber} placeholder="700 200 202" placeholderTextColor="#94A3B8"/>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  phonecontainer: {
    backgroundColor: '#fff',
    padding: 10,
  },
  phone:{
    flexDirection:'row',
    height:48,
    width:312,
    alignItems:'center',
    alignSelf:'center',
    borderWidth:1,
    borderColor:'#CBD5E1',
    borderRadius:5,
  },
  phonetextinput:{
    height:38,
    width:'80%',
    alignSelf:'center',
    color:'black',
  },
  phoneinputContainer:{
    alignSelf:'center',
    marginLeft:15,
  },

});

export default PhoneInputComponent;
