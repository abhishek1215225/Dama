import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';

const App = () => {
  const handlePrivacyPolicyPress = () => {
    Alert.alert('Privacy Policy', 'Link to Privacy Policy');
  };

  const handleTermsPress = () => {
    Alert.alert('Terms and Conditions', 'Link to Terms and Conditions');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        I agree to the Dama Kenya{' '}
        <Pressable onPress={handlePrivacyPolicyPress}>
          <Text style={styles.link}> Privacy Policy</Text>
        </Pressable>{' '}
        and{' '}
        <Pressable onPress={handleTermsPress}>
          <Text style={styles.link}>Terms and Conditions</Text>
        </Pressable>.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 14,
    color: 'black',
  },
  link: {
    color: '#007BFF',
  },
});

export default App;
