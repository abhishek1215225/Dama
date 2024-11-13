import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, FlatList , Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MonthDropdown = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  const handleSelectMonth = (month) => {
    setSelectedMonth(month);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.dropdown} onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownText}>
          {selectedMonth !== null ? selectedMonth : '1'}
        </Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={months}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleSelectMonth(item)}>
                  <Text style={styles.modalItem}>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MonthDropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    padding: wp('2%'),  // Responsive padding
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 5,
    width: wp('15%'),  // Responsive width
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: wp('3%'),  // Responsive font size
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    width: wp('10%'),  // Responsive width for modal
  },
  modalContent: {
    justifyContent: 'flex-end',
    borderRadius: 10,
    width: wp('15%'),  // Adjust width for modal content
    left: wp('73.5%'),  // Adjust left position for responsiveness
    top: hp('12%'),  // Adjust vertical position based on screen height
    paddingVertical: hp('1.5%'),  // Responsive vertical padding
  },
  modalItem: {
    fontSize: wp('3%'),  // Responsive font size for modal items
    borderWidth: 1,
    borderColor: '#CBD5E1',
    color: 'black',
    marginTop: hp('1%'),  // Responsive margin for spacing between items
    width: wp('15%'),  // Responsive width for each item
    alignSelf: 'center',
    height: hp('3.5%'),  // Responsive height for each modal item
    borderRadius: 4,
    textAlign: 'center',
    backgroundColor: 'white',
    padding: wp('1%'),
  },
  closeButton: {
    backgroundColor: '#1230AE',
    padding: wp('4%'),  // Responsive padding for button
    borderRadius: 5,
    marginTop: hp('2%'),  // Responsive margin for spacing
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: wp('4%'),  // Responsive font size for the button text
  },
});
