import React, { useState } from 'react';
import { Text, View, Pressable, Image, Modal, ScrollView, StyleSheet, FlatList, Dimensions } from 'react-native';
import MonthDropdown from '../components/dropdown';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const membershipData = [
  {
    id: 1,
    type: 'Student Membership',
    price: 'KES  2,500',
    description: 'Lorem ipsum dolor sit amet consectetuer',
    flag: require('../assests/group.png'),
  },
  {
    id: 2,
    type: 'Professional Membership',
    price: 'KES  4,500',
    description: 'Lorem ipsum dolor sit amet consectetuer',
    flag: require('../assests/profess.png'),
  },
  {
    id: 3,
    type: 'Corporate Membership',
    price: 'KES  6,500',
    description: 'Lorem ipsum dolor sit amet consectetuer',
    flag: require('../assests/cor.png'),
  },
];

const Welcome = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectMembership, setSelectMembership] = useState(null);

  const handleOpen = (membership) => {
    setSelectMembership(membership);
    setModalVisible(true);
  };

  const handleClose = () => {
    setSelectMembership(null);
    setModalVisible(false);
  };

  const renderMembership = ({ item }) => (
    <View style={styles.student}>
      <View style={styles.imagecontainer}>
        <Image source={item.flag} style={styles.image} />
      </View>
      <Text style={styles.head}>{item.type}</Text>
      <Text style={styles.des}>{item.description}</Text>
      <View style={styles.line} />
      <View style={styles.student1}>
        <Text style={styles.ammount}>{item.price}</Text>
        <Text style={styles.month}>/Month</Text>
      </View>
      <Pressable onPress={() => handleOpen(item)}>
        <View style={styles.button}>
          <Text style={styles.buttontext}>Activate</Text>
        </View>
      </Pressable>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcome}>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
        <Text style={styles.welcome}>Welcome to Dama Kenya</Text>
        <Text style={styles.welcome1}>You have been awarded a 30-day free trial valid till 20th June 2024</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <View style={styles.PRess}>
          <Pressable onPress={handleClose} style={styles.PRess} />
        </View>
        <View style={styles.modalContent}>
          {selectMembership && (
            <View>
              <View style={styles.tab1}>
                <View style={styles.imagecontainer}>
                  <Image source={selectMembership.flag} style={styles.image} />
                </View>
                <Text style={styles.title}>{selectMembership.type}</Text>
                <Text style={styles.title1}>{selectMembership.description}</Text>
              </View>
              <View style={styles.tab2}>
                <Text style={styles.breakdown}>Breakdown</Text>
                <View style={styles.Modalprice}>
                  <View style={styles.student1}>
                    <Text style={styles.ammount1}>{selectMembership.price}</Text>
                    <Text style={styles.month1}>/Month</Text>
                  </View>
                  <View style={styles.month2}>
                    <MonthDropdown style={styles.drop} />
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.total}>
                  <Text style={styles.totaltext}>Total</Text>
                  <Text style={styles.totaltext}> KES 78,000</Text>
                </View>
              </View>
              <View style={styles.tab3}>
                <View style={styles.payment}>
                  <View style={styles.paymenttab}>
                    <Image source={require('../assests/payment.png')} style={styles.paymentimage} />
                    <Text style={styles.paymenttext}>Mpesa</Text>
                  </View>
                  <Pressable>
                    <Text style={styles.paymentchange}>Change</Text>
                  </Pressable>
                </View>
                <Pressable onPress={() => navigation.navigate('Confirmpayment')}>
                  <View style={styles.button}>
                    <Text style={styles.buttontext}>Confirm Payment</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </Modal>

      <FlatList
        data={membershipData}
        renderItem={renderMembership}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cbd5e1',
  },
  skip: {
    fontSize: wp('4%'),  // Responsive font size
    textAlign: 'right',
    paddingRight: wp('5%'),
    color: '#64748B',
    fontWeight: '500',
    fontFamily: 'inter',
  },
  welcome: {
    fontSize: wp('6%'),  // Responsive font size
    fontWeight: '600',
    fontFamily: 'inter',
    paddingLeft: wp('5%'),
    backgroundColor: 'white',
    color: 'black',
    paddingTop: hp('3%'),
  },
  welcome1: {
    textAlign: 'center',
    paddingLeft: wp('4%'),
    color: 'black',
    width: wp('80%'),
    fontFamily: 'inter',
    fontWeight: '500',
    fontSize: wp('3.5%'),
    paddingBottom: hp('3%'),
    paddingTop: hp('1%'),
  },
  student: {
    backgroundColor: 'white',
    marginTop: hp('1%'),
    padding: wp('5%'),
  },
  student1: {
    flexDirection: 'row',
    marginTop: hp('1%'),
    color: 'black',
  },
  ammount: {
    fontSize: wp('6%'),
    fontWeight: '600',
    fontFamily: 'inter',
    color: 'black',
    marginLeft: wp('3%'),
  },
  month: {
    marginTop: hp('1%'),
    marginLeft: wp('2%'),
    color: '#64748B',
    fontFamily: 'inter',
    fontSize: wp('3.2%'),
    fontWeight: '500',
  },
  line: {
    height: 1,
    backgroundColor: '#cbd5e1',
    width: '100%',
    marginTop: hp('1.5%'),
  },
  button: {
    backgroundColor: '#0966C3',
    height: hp('6%'),
    borderRadius: 5,
    marginTop: hp('3%'),
    width: wp('86%'),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttontext: {
    color: 'white',
    fontSize: wp('4%'),
    padding: wp('2.5%'),
    alignSelf: 'center',
    fontWeight: '500',
    fontFamily: 'inter',
  },
  image: {
    height: wp('8%'),
    width: wp('8%'),
    borderRadius: 100,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
  },
  title: {
    fontSize: wp('4%'),
    fontWeight: '500',
    marginVertical: hp('1%'),
    fontFamily: 'inter',
    color: 'black',
    marginTop: hp('2%'),
    marginLeft: wp('1%'),
  },
  title1: {
    color: '#64748B',
    fontSize: wp('3.2%'),
    fontWeight: '500',
    fontFamily: 'inter',
    marginLeft: wp('1%'),
  },
  Modalprice: {
    flexDirection: 'row',
    color: 'black',
  },
  drop: {
    marginTop: hp('2%'),
  },
  breakdown: {
    fontWeight: '600',
    fontSize: wp('4%'),
    color: 'black',
    fontFamily: 'inter',
    marginBottom: hp('1%'),
    marginLeft: wp('1%'),
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
    marginHorizontal: wp('1%'),
  },
  totaltext: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    fontFamily: 'inter',
    color: 'black',
  },
  tab1: {
    backgroundColor: 'white',
    padding: wp('5%'),
  },
  tab2: {
    marginTop: hp('1%'),
    backgroundColor: 'white',
    padding: wp('5%'),
  },
  tab3: {
    marginTop: hp('1%'),
    backgroundColor: 'white',
    padding: wp('5%'),
  },
  payment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
  },
  paymenttext: {
    fontSize: wp('3.5%'),
    color: 'black',
    marginLeft: wp('2%'),
  },
  paymentchange: {
    fontSize: wp('3.5%'),
    color: 'blue',
  },
  head: {
    color: 'black',
    fontFamily: 'inter',
    fontSize: wp('4%'),
    fontWeight: '500',
    marginTop: hp('1%'),
    marginLeft: wp('3%'),
  },
  des: {
    color: '#64748B',
    fontFamily: 'inter',
    fontSize: wp('3.5%'),
    fontWeight: '500',
    marginTop: hp('0.5%'),
    marginBottom: hp('1%'),
    marginLeft: wp('3%'),
  },
  ammount1: {
    fontFamily: 'inter',
    fontSize: wp('4.5%'),
    fontWeight: '500',
    color: 'black',
    marginLeft: wp('1%'),
  },
  paymentimage: {
    height: wp('4.5%'),
    width: wp('9%'),
    resizeMode: 'center',
  },
  paymenttab: {
    flexDirection: 'row',
  },
  month1: {
    marginTop: hp('1%'),
    marginLeft: wp('2%'),
    color: '#64748B',
    fontFamily: 'inter',
    fontSize: wp('3.2%'),
    fontWeight: '500',
  },
  imagecontainer: {
    height: wp('12%'),
    width: wp('12%'),
    borderRadius: 100,
    backgroundColor: 'lightblue',
    marginVertical: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('3%'),
  },
  PRess: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  month2: {
    marginLeft: wp('30%'),
  },
});
