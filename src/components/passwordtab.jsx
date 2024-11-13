import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PasswordInputExample = () => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.Passwordcontainer}>
      <View style={styles.PasswordinputContainer}>
        <TextInput
          style={styles.Passwordinput}
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor="#94A3B8"
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          <Icon name={isPasswordVisible ? 'visibility-off' : 'visibility'} size={24}  color="#0966C3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Passwordcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor:'white',
    marginVertical:15,
  },
  PasswordinputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 312,
    height:48,
    borderWidth:1,
    borderColor:'#CBD5E1',
    borderRadius:5,


  },
  Passwordinput: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    color:'black',
    paddingLeft:15,
    width: 312,
    height:48,
  },
  iconContainer: {
    padding: 10,
  },
});

export default PasswordInputExample;
