import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import {firebase} from '../firebaseConfig'; // Import auth directly from @react-native-firebase



const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState('');
  const [country, setCountry] = useState('');

  const handleCreateUser = async () => {
    try {
      // Step 1: Create user with email and password
      const userCredential = await firebase.auth().createUserWithEmailAndPassword( email, password);
      const { uid } = userCredential.user;

      // Step 2: Add additional user details to Firestore
      await firebase.firestore().collection('users').doc(uid).set({
        phoneNumber,
        firstName,
        lastName,
        dateOfBirth,
        sex,
        country,
      });

      Alert.alert('Success', 'User added with additional details');
    } catch (error) {
      console.error('Error adding user:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 10 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 10 }} />
      <TextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} style={{ marginBottom: 10 }} />
      <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={{ marginBottom: 10 }} />
      <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={{ marginBottom: 10 }} />
      <TextInput placeholder="Date of Birth (YYYY-MM-DD)" value={dateOfBirth} onChangeText={setDateOfBirth} style={{ marginBottom: 10 }} />
      <TextInput placeholder="Sex" value={sex} onChangeText={setSex} style={{ marginBottom: 10 }} />
      <TextInput placeholder="Country" value={country} onChangeText={setCountry} style={{ marginBottom: 10 }} />
      <Button title="Submit" onPress={handleCreateUser} />
    </View>
  );
};

export default SignupScreen;
