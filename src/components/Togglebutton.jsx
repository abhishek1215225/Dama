import React, { useState } from 'react';
import { View,  TouchableOpacity, StyleSheet } from 'react-native';

const CustomToggleSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.toggleContainer, {borderColor:isEnabled ? '#0966C3' : '#475569',  }]} 
        onPress={() => setIsEnabled(previousState => !previousState)}
      >
        <View 
          style={[
            styles.toggleThumb, 
            { 
              marginLeft: isEnabled ? 15 : 2,
              borderColor: isEnabled ? '#0966C3' : '#475569',
              borderWidth:2, // Change color based on state
            }
          ]} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
  },
  toggleContainer: {
    width: 30, // Increased for better thumb movement
    height: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth:2,
  },
  toggleThumb: {
    width: 10,
    height: 10,
    borderRadius: 13,
    position: 'absolute',
    left:0,

  },
});

export default CustomToggleSwitch;
