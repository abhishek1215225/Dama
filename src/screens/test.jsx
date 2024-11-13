import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { firebase } from '@react-native-firebase/firestore'; // Ensure correct import
import auth from '@react-native-firebase/auth'; // Import authentication



const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Initialize Firebase
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(); // This should initialize Firebase
    }
  }, []);

  // Sign in function
  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User signed in!');
      })
      .catch(error => {
        console.error('Sign in error:', error);
        Alert.alert(error.message);
      });
  };

  // Sign up function
  const signUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User account created & signed in!');
      })
      .catch(error => {
        console.error('Sign up error:', error);
        Alert.alert(error.message);
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
      />
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
      />
      <Button title="Sign In" onPress={signIn} />
      <Button title="Sign Up" onPress={signUp} />
    </View>
  );
};

export default App;
