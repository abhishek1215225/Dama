import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const CustomCheckbox = ({ label, onChange }) => {
  const [isChecked, setIsChecked] = useState(true);

  const toggleCheckbox = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Pressable style={styles.container} onPress={toggleCheckbox}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <Text style={styles.checkmark}><Icon name="check" size={15} color="#0966C3" /></Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    width: 23,
    height: 23,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  checked: {
    borderColor: '#0966C3',
  },
  checkmark: {
    color: '#0966C3',
       fontSize:18 ,
       textAlign:'center',
  },
  label: {
    fontSize: 15,
  },
});

export default CustomCheckbox;
