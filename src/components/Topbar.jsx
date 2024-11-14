import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, StyleSheet, Modal, Pressable, ImageBackground, Dimensions, ScrollView, Alert, FlatList, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import ToggleButton from './Togglebutton';
import ToggleButton1 from './Togglebutton1';
import { RadioButton } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/Entypo';
import { firebase } from '../firebaseConfig';
const { width, height } = Dimensions.get('window');
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation ,CommonActions} from '@react-navigation/native';
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





const Topbar = () => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('option1');
  const [modalVisible, setModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [membershipModalVisible, setmembershipModalVisible] = useState(false);
  const [profileModal1Visible, setProfileModal1Visible] = useState(false);
  const [memberModal1Visible, setmemberModal1Visible] = useState(false);
  const [selectMembership, setSelectMembership] = useState(null);
  const [editnameVisible, seteditnameVisible] = useState(false);
  const [bioModal1Visible, setbioModal1Visible] = useState(false);


  const [height, setHeight] = useState(0);

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    setHeight(contentHeight);
  };


  const maxHeight = 100;


  const handlebiomodalopen = () => {
    setbioModal1Visible(true);
  };

  const handlebiomodalclose = () => {
    setbioModal1Visible(false);
  };


  const firstNameregex = /^[A-Za-z]{3,}$/;
  const lastNameregex = /^[A-Za-z]{2,50}$/;
  const [firstNameerror, setfirstNameerror] = useState('');
  const [lastNameerror, setlastNameerror] = useState('');

  const [titleError, settitleError] = useState('');
  const [companyError, setcompanyError] = useState('');

  const [bioError, setbioError] = useState('');
  const Bioregex = /^[A-Za-z]+(?: [A-Za-z]+){4,}$/;

  const titleregex = /^[A-Za-z]{3,}$/;
  const companyregex = /^[A-Za-z]+(?: [A-Za-z]+){1,}$/;




  const handleBio = (text) => {
    setBio(text);
    if (!Bioregex.test(text)) {
      setbioError('Minimun 5 words');
    } else {
      setbioError('');
    }
  };

  const handleTitle = (text) => {
    setTittle(text);
    if (!titleregex.test(text)) {
      settitleError('Minimun 3 words');
    } else {
      settitleError('');
    }
  };

  const handleCompany = (text) => {
    setCompany(text);
    if (!companyregex.test(text)) {
      setcompanyError('Minimun 1 words');
    } else {
      setcompanyError('');
    }
  };


  const handlefirstname = (text) => {
    setFirstName(text);
    if (!firstNameregex.test(text)) {
      setfirstNameerror('Minimun 3 words');
    } else {
      setfirstNameerror('');
    }
  };

  const handlelastname = (text) => {
    setLastName(text);
    if (!lastNameregex.test(text)) {
      setlastNameerror('Minimun 2 words');
    } else {
      setlastNameerror('');
    }
  };





  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [tittle, setTittle] = useState('');
  const [company, setCompany] = useState('');
  const [bio, setBio] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassworderror, setNewPassworderror] = useState('');
  const [confirmPassworderror, setconfirmPassworderror] = useState('');


  //apply regex on new and confirm password

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const handlePasswordChange = (text) => {
    setNewPassword(text);
    if (!passwordRegex.test(text)) {
      setNewPassworderror('Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.');
    } else {
      setNewPassworderror('');
    }
  };
  const handleconfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (!passwordRegex.test(text)) {
      setconfirmPassworderror('Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.');
    } else {
      setconfirmPassworderror('');
    }
  };

  // change user password using old password

  const handleChangePassword = async (userDetails) => {

    try {
      const User = firebase.auth().currentUser;
      if (User) {
        const userdoc = await firebase.firestore().collection('users').doc(User.uid).get();
        if (userdoc.exists) {
          const userdetail = userdoc.data();
          if (!newPassworderror && !confirmPassworderror) {
            if (userdetail.password === oldPassword) {
              if (newPassword === confirmPassword) {
                await User.updatePassword(newPassword);
                await firebase.firestore().collection('users').doc(User.uid).update({
                  password: newPassword,
                });
                setPasswordModalVisible(false);
              } else {
                console.log('new password and confirm password doesnt match');
              }
            } else {
              console.log('old password is incorrect');
            }
          }

        } else {
          console.log('no data found');
        }
      } else {
        console.log('No user logged in');
      }
    } catch (error3) {
      console.error('Error fetching user details:', error3);
    }
  };

  //set user details to display in profile


  useEffect(() => {
    if (userDetails) {
      setFirstName(userDetails.firstName || '');
      setLastName(userDetails.lastName || '');
      setMiddlename(userDetails.middlename || '');
      setTittle(userDetails.tittle || '');
      setCompany(userDetails.company || '');
      setBio(userDetails.bio || '');
    }
  }, [userDetails]);


  // update user details from profile
  const handleSaveUserDetails = async () => {
    try {
      const user = firebase.auth().currentUser;
      const userid = user ? user.uid : null;

      if (!userid) {
        throw new Error("User ID is not available");
      }

      if (!lastName) {
        setlastNameerror('Last name is required');
      }
      if (!firstName) {
        setfirstNameerror('First name is required');
      }

      if (!bio) {
        setbioError(' Bio  is required');
      }
      if (!company) {
        setcompanyError('Company is required');
      }
      if (!tittle) {
        settitleError('Title  is required');
      }


      if (firstName && lastName && tittle && company && bio && !titleError && !companyError && !bioError && !firstNameerror && !lastNameerror) {

        console.log('Saving user details...');
        await firebase.firestore().collection('users').doc(userid).update({
          firstName,
          lastName,
          middlename,
          company,
          tittle,
          bio,
        });

        seteditnameVisible(false);
        setbioModal1Visible(false);
      }
    } catch (error1) {
      console.error('Error saving user details:', error1);
      Alert.alert('Error', error1.message);
    }
  };




  // const handleSaveUserBio = async () => {
  //   try {
  //     await firebase.firestore().collection('users').doc(userid).update({
  //       bio,

  //     } , { merge: true });
  //     setbioModal1Visible(false);


  //     Alert.alert('Success', 'Additional user details saved successfully.');
  //   } catch (error2) {
  //     console.error('Error saving user details:', error2);
  //     Alert.alert('Error', error2.message);
  //   }
  // };



  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();

          if (userDoc.exists) {
            const useretails = userDoc.data();
            setUserDetails(useretails);
            setFirstName(useretails.firstName || '');
            setLastName(useretails.lastName || '');
            setMiddlename(useretails.middlename || '');
            setTittle(useretails.tittle || '');
            setCompany(useretails.company || '');
            setBio(useretails.bio || '');
          } else {
            console.log('No such document!');
          }
        } else {
          console.log('No user logged in');
        }
      } catch (error5) {
        console.error('Error fetching user details:', error5);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run only once when component mounts

  // if (loading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  const handlememberopen = (membership) => {
    setmemberModal1Visible(true);
    setSelectMembership(membership);
  };
  const handlememberclose = () => {
    setmemberModal1Visible(false);
    setSelectMembership(null);
  };


  const handlenameeditopen = () => {
    seteditnameVisible(true);
  };
  const handlenameeditclose = () => {
    seteditnameVisible(false);
  };

  const handleProfile1Close = () => {
    setProfileModal1Visible(false);
  };


  const handleMembershipOpen = () => {
    setmembershipModalVisible(true);
  };

  const handleMembershipClose = () => {
    setmembershipModalVisible(false);
  };

  const handlePasswordOpen = () => {
    setPasswordModalVisible(true);
  };

  const handlePasswordClose = () => {
    setPasswordModalVisible(false);
  };

  const handlePaymentOpen = () => {
    setPaymentModalVisible(true);
  };

  const handlePaymentClose = () => {
    setPaymentModalVisible(false);
  };

  const handleAboutOpen = () => {
    setAboutModalVisible(true);
  };

  const handleAboutClose = () => {
    setAboutModalVisible(false);
  };

  const handleProfileOpen = () => {
    setProfileModalVisible(true);
  };

  const handleProfileClose = () => {
    setProfileModalVisible(false);
  };

  const handleOpen = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  // log out user
  const handleLogout = async () => {
    try {
      // Close modal before navigation
      setModalVisible(false);  // Ensure modal is closed

      // await firebase.auth().signOut(); // Sign out the user
     console.log('Logging out...');
await firebase.auth().signOut();
console.log('Navigating to Login screen...');
// navigation.dispatch(
//   CommonActions.reset({
//     index: 0,
//     routes: [{ name: 'Login' }], // assuming 'Login' is your login screen
//   })
// );
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };




  const renderMembership = ({ item }) => (
    <View>
      <View style={styles.student}>
        <View style={styles.imagecontainer}>
          <Image source={item.flag} style={styles.image2} />
        </View>
        <Text style={styles.head}>{item.type}</Text>
        <Text style={styles.des}>{item.description}</Text>
        <View style={styles.line3} />
        <View style={styles.student1}>
          <Text style={styles.ammount}>{item.price}</Text>
          <Text style={styles.month}>/Month</Text>
        </View>
        <Pressable onPress={() => handlememberopen(item)} style={styles.button}>
          <Text style={styles.buttontext}>Upgrade</Text>

        </Pressable>

      </View>
      <View style={styles.modelthick} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={() => handleOpen()}>
        <Image source={require('../assests/profile.png')} style={styles.image} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Search')}>
        <TextInput style={styles.search} placeholder="Search" placeholderTextColor="#94A3B8" editable={false} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('First')}>
        <Image source={require('../assests/logo/massage.png')} style={styles.logo} />
      </Pressable>

      {/* Main modal */}
      {modalVisible && (
        <Modal
          transparent={true}
          onRequestClose={handleClose}
          visible={modalVisible}
        >
          <View style={styles.work}>
            <View>
              <View style={styles.overlay}>
                <View style={styles.modal}>
                  <Pressable >
                    <View style={styles.profile}>
                      <Image source={require('../assests/profile.png')} style={styles.profileimage} />
                      <View>
                        <Text style={styles.profilename}>{firstName}</Text>
                        <Text style={styles.profiledes}>{tittle}</Text>
                      </View>
                    </View>
                  </Pressable>
                  <View style={styles.line} />
                  <View>
                    <View style={styles.containerprofile}>
                      <Image source={require('../assests/logo/profilesy.png')} style={styles.profileimg} />
                      <Pressable onPress={handleProfileOpen}>
                        <Text style={styles.name}>Profile</Text>
                      </Pressable>
                    </View>
                    <View style={styles.containerprofile}>

                      <Image source={require('../assests/logo/membership.png')} style={styles.profileimg} />
                      <Pressable onPress={handleMembershipOpen}>
                        <Text style={styles.name}>Membership</Text>
                      </Pressable>
                    </View>
                    <View style={styles.containerprofile}>
                      <Image source={require('../assests/logo/Notifications.png')} style={styles.profileimg} />
                      <Pressable onPress={() => { }}>
                        <Text style={styles.name}>Notifications</Text>
                      </Pressable>
                    </View>
                    <View style={styles.containerprofile}>
                      <Image source={require('../assests/logo/Calendar.png')} style={styles.profileimg} />
                      <Pressable onPress={() => { }}>
                        <Text style={styles.name}>Manage Event</Text>
                      </Pressable>
                    </View>
                    <View style={styles.containerprofile}>
                      <Image source={require('../assests/logo/Info.png')} style={styles.profileimg} />
                      <Pressable onPress={handleAboutOpen}>
                        <Text style={styles.name}>About Dama Kenya</Text>
                      </Pressable>
                    </View>
                    <View style={styles.containerprofile}>
                      <Image source={require('../assests/logo/Logout.png')} style={styles.profileimg} />
                      <TouchableOpacity onPress={() => handleLogout()}>
                        <Text style={styles.Log}>Log Out</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.endco}>
                      <View style={styles.line2} />
                      <Text style={styles.pro}>Professional Membership</Text>
                      <Text style={styles.valid}>Valid till: 30th Dec 2024</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.free}>
              <Pressable onPress={handleClose} style={styles.free} />
            </View>
          </View>
        </Modal>
      )};
      {/* Profile Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        onRequestClose={handleProfileClose}
        visible={profileModalVisible}
      >
        <ScrollView style={styles.container1}>
          <View style={styles.firsttab}>
            <Icon name="arrowleft" size={24} color="#64748B" onPress={handleProfileClose} />
            <Text style={styles.title}>Profile</Text>
          </View>
          <View style={styles.modelthick} />
          <View>
            <ImageBackground source={require('../assests/profilebackground.png')} style={styles.background} />
            <View style={styles.editicon}>
              <Icon1 name="mode-edit" color="#0966C3" size={20} />
            </View>
            <Image source={require('../assests/profile.png')} style={styles.profilephoto} />
            <View style={styles.editicon1}>
              <Icon1 name="mode-edit" color="#0966C3" size={20} />
            </View>
            <View style={styles.persondetail}>
              <Text style={styles.personname}>{firstName} {middlename} {lastName}</Text>
              <Text style={styles.personbrand}>{company}</Text>
              <Text style={styles.personprofile}>{tittle}</Text>
              <View style={styles.editicon2}>
                <TouchableOpacity onPress={handlenameeditopen}>
                  <Icon1 name="mode-edit" color="black" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modelthick} />
            <View style={styles.biocontainer}>
              <View style={styles.mybio}>
                <Text style={styles.biotitle}>My Bio</Text>
                <TouchableOpacity onPress={handlebiomodalopen}>
                  <Icon1 name="mode-edit" color="black" size={20} />
                </TouchableOpacity>
              </View>
              <Text style={styles.bio}>
                {bio}
              </Text>
            </View>
          </View>
          <View style={styles.modelthick} />
          <View style={styles.toggle}>
            <View style={styles.profileflex}>
              <View>
                <Text style={styles.biotitle}>Profile Visibility</Text>
                <Text style={styles.personprofile}>Public</Text>
              </View>
              <View>
                <ToggleButton />
              </View>
            </View>
            <View style={styles.profileflex}>
              <View>
                <Text style={styles.biotitle}>Dark Mode</Text>
                <Text style={styles.personprofile}>OFF</Text>
              </View>
              <View>
                <ToggleButton1 onPress={''} />
              </View>
            </View>
            <View>
              <Pressable onPress={handlePaymentOpen}>
                <View style={styles.profileflex}>
                  <View>
                    <Text style={styles.biotitle}>Payment Method</Text>
                    <Text style={styles.personprofile}>MPESA</Text>
                  </View>
                  <View>
                    <Icon name="right" size={20} color="#64748B" />
                  </View>
                </View>
              </Pressable>
            </View>
            <View>
              <Pressable onPress={handlePasswordOpen}>
                <View style={styles.profileflex}>
                  <View>
                    <Text style={styles.biotitle}>Password Reset</Text>
                    <Text style={styles.personprofile}>Update Password</Text>
                  </View>
                  <View>
                    <Icon name="right" size={20} color="#64748B" />
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
          <View style={styles.modelthick} />
          <View style={styles.delete}>
            <Text style={styles.personprofile1}>Copyright © 2024 Dama Kenya</Text>
            <Text style={styles.personprofile1}>App Version 1.00</Text>
            <Text style={styles.deleteaccount}>Delete Account</Text>
          </View>
        </ScrollView>
      </Modal>


      {/* Profile Modal1 */}
      <Modal
        transparent={true}
        animationType="slide"
        onRequestClose={handleProfile1Close}
        visible={profileModal1Visible}
      >
        <ScrollView style={styles.container2}>
          <View style={styles.firsttab}>
            <Icon name="arrowleft" size={24} color="#64748B" onPress={handleProfile1Close} />
            <Text style={styles.title}>Profile</Text>
          </View>
          <View style={styles.modelthick} />
          <View style={styles.secondtab3}>
            <View>
              <ImageBackground source={require('../assests/profilebackground.png')} style={styles.background} />
              <Image source={require('../assests/profile.png')} style={styles.profilephoto} />

              <View style={styles.persondetail}>
                <Text style={styles.personname}>Leandro Trossard</Text>
                <Text style={styles.personbrand}>Karatasi Brands</Text>
                <Text style={styles.personprofile}>Accountant</Text>
                <View style={styles.threebutton}>
                  <View>
                    <Pressable style={styles.messagebutton}>
                      <Text style={styles.buttontext}>Message</Text>
                    </Pressable>
                  </View>
                  <Pressable style={styles.callbutton}>
                    <Text style={styles.callbuttontext}>Call</Text>
                  </Pressable>
                  <View style={styles.share} >
                    <Icon2 name="share" size={24} color="#0966C3" />
                  </View>
                </View>

              </View>
              <View style={styles.modelthick} />
              <View style={styles.biocontainer}>
                <View style={styles.mybio}>
                  <Text style={styles.biotitle}>My Bio</Text>
                </View>
                <Text style={styles.bio}>
                  Lorem ipsum dolor sit amet consectetur. Tellus egestas senectus pellentesque a sapien ultricies. Eget ultricies cursus quam auctor sed semper. Nisl elementum amet natoque ipsum quis sed. Convallis vestibulum nisi neque vel massa.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>


      {/* About Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        onRequestClose={handleAboutClose}
        visible={aboutModalVisible}
      >
        <View style={styles.container1}>
          <View style={styles.firsttab}>
            <Icon name="arrowleft" size={24} color="#64748B" onPress={handleAboutClose} />
            <Text style={styles.title}>About Dama Kenya</Text>
          </View>
          <View style={styles.modelthick} />
          <View style={styles.secondtab}>
            <Text style={styles.title1}>About Us</Text>
            <Text style={styles.terms}>Lorem ipsum dolor sit amet consectetur. Tellus egestas senectus pellentesque  a sapien ultricies. Eget ultricies cursus quam auctor sed semper. Nisl elementum amet natoque ipsum quis sed. Convallis vestibulum nisi neque vel massa.</Text>
          </View>
          <View>
            <Image source={require('../assests/aboutus.png')} style={styles.imageabout} />
          </View>
          <View style={styles.secondtab}>
            <Text style={styles.vision}>Vision</Text>
            <Text style={styles.terms} >Lorem ipsum dolor sit amet consectetur. Tellus egestas senectus</Text>

            <Text style={styles.vision}>Mission</Text>
            <Text style={styles.terms} >pellentesque a sapien ultricies. Eget ultricies cursus quam auctor sed semper.</Text>
          </View>


        </View>
      </Modal>

      {/* Payment Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        onRequestClose={handlePaymentClose}
        visible={paymentModalVisible}
      >
        <View style={styles.container2}>
          <View style={styles.firsttab}>
            <Icon name="arrowleft" size={24} color="#64748B" onPress={handlePaymentClose} />
            <Text style={styles.title}>Payment Method</Text>
          </View>
          <View style={styles.modelthick} />
          <View style={styles.secondtab1}>
            <Text style={styles.personname}>Payments</Text>
            <View>
              <Pressable onPress={() => setSelectedValue('option1')}>
                <View style={styles.paymenttab}>
                  <View style={styles.paymentMethod}>
                    <Image source={require('../assests/payment.png')} style={styles.paymentimage} />
                    <Text style={styles.MPesa}>Mpesa</Text>
                  </View>
                  <View>
                    <RadioButton.Android
                      value="option1"
                      status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
                      onPress={() => setSelectedValue('option1')}
                      color="#007BFF"
                    />
                  </View>
                </View>
              </Pressable>
            </View>
            <View>
              <Pressable onPress={() => setSelectedValue('option2')}>

                <View style={styles.paymenttab1}>
                  <View style={styles.paymentMethod}>
                    <Image source={require('../assests/payment2.png')} style={styles.paymentimage} />
                    <Text style={styles.MPesa}>Pesapal</Text>
                  </View>
                  <View>
                    <RadioButton.Android
                      value="option2"
                      status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
                      onPress={() => setSelectedValue('option2')}
                      color="#007BFF"
                    />
                  </View>
                </View>
              </Pressable>
            </View>
            <View style={styles.Button}>
              <Pressable >
                <Text style={styles.pressabletext}>Add Credit/Debit Card</Text>
              </Pressable>
            </View>

          </View>

        </View>

      </Modal>


      {/* password modal */}

      <Modal
        transparent={true}
        animationType="slide"
        onRequestClose={handlePasswordClose}
        visible={passwordModalVisible}
      >
        <View style={styles.container1}>
          <View style={styles.firsttab}>
            <Icon name="arrowleft" size={24} color="#64748B" onPress={handlePasswordClose} />
            <Text style={styles.title}>Password Reset</Text>
          </View>
          <View style={styles.modelthick} />
          <View style={styles.secondtab}>
            <View style={styles.passwordtab}>
              <Image source={require('../assests/password.png')} style={styles.passwordimage} />
            </View>
            <View style={styles.passwordtab1}>
              <Text style={styles.password} >Hey, Trossard</Text>
              <Text style={styles.password1}>Fill in the details below</Text>
            </View>
            <Text style={styles.personname3}>Old Password</Text>
            <TextInput placeholder="********" placeholderTextColor="#94A3B8" style={styles.input}
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <Text style={styles.personname3}>New Password</Text>
            <TextInput placeholder="********" placeholderTextColor="#94A3B8" style={styles.input}
              value={newPassword}
              onChangeText={handlePasswordChange} />
            {newPassworderror ? <Text style={styles.error}>{newPassworderror}</Text> : null}
            <Text style={styles.personname3}>Confirm New Password</Text>
            <TextInput placeholder="********" placeholderTextColor="#94A3B8" style={styles.input}
              value={confirmPassword}
              onChangeText={handleconfirmPasswordChange} />
            {confirmPassworderror ? <Text style={styles.error}>{confirmPassworderror}</Text> : null}
            <View style={styles.Button2}>
              <Pressable onPress={handleChangePassword}>
                <Text style={styles.pressabletext}>Change Password</Text>
              </Pressable>
            </View>

          </View>

        </View>

      </Modal>


      {/* membership modal */}

      <Modal
        transparent={true}
        animationType="slide"
        onRequestClose={handleMembershipClose}
        visible={membershipModalVisible}
      >
        <ScrollView>
          <View style={styles.container2}>
            <View style={styles.firsttab}>
              <Icon name="arrowleft" size={24} color="#64748B" onPress={handleMembershipClose} />
              <Text style={styles.title}>Membership</Text>
            </View>
            <View style={styles.modelthick} />
            <View style={styles.secondtab2}>
              <Text style={styles.membership}>My Current Membership</Text>
              <View style={styles.main}>
                <View style={styles.imageprofess}>
                  <Image source={require('../assests/profess.png')} style={styles.profess} />
                </View>
                <View>
                  <Text style={styles.membership1}>Professional Membership</Text>
                  <Text style={styles.validtill}>Valid till: 30th Dec 2024</Text>
                </View>
              </View>

            </View>
            <View styles={styles.othermembership}>
              <Text style={styles.membership2}>Other memberships</Text>
            </View>
            <View style={styles.secondtab3}>
              <FlatList
                data={membershipData}
                renderItem={renderMembership}
                keyExtractor={item => item.id}
              />
            </View>

          </View>
        </ScrollView>

      </Modal>

      {/* editname modal */}
      {editnameVisible
        && (
          <Modal
            transparent={true}
            animationType="slide"
            onRequestClose={handlenameeditclose}
            visible={editnameVisible}
            style={styles.editmodal}
          >
            <View style={styles.editcontainer}>
              <Text style={styles.edittext}>Edit Your Profile Details</Text>

              <View>
                <Text style={styles.editname}>First Name</Text>
                <TextInput
                  value={firstName}
                  placeholder=" Enter Your First name"
                  placeholderTextColor="black"
                  style={styles.edittextinput}
                  onChangeText={handlefirstname}
                />
                {firstNameerror ? <Text style={styles.error}>{firstNameerror}</Text> : null}
              </View>
              <View>
                <Text style={styles.editname}>Middle Name</Text>
                <TextInput
                  value={middlename}
                  placeholder="Enter Your Middle name"
                  placeholderTextColor="black"
                  style={styles.edittextinput}
                  onChangeText={setMiddlename}
                />
              </View>
              <View>
                <Text style={styles.editname}>Last Name</Text>
                <TextInput
                  value={lastName}
                  placeholder="Enter Your Last name"
                  placeholderTextColor="black"
                  style={styles.edittextinput}
                  onChangeText={handlelastname}
                />
                {lastNameerror ? <Text style={styles.error}>{lastNameerror}</Text> : null}
              </View>
              <View>
                <Text style={styles.editname}>Title</Text>
                <TextInput
                  value={tittle}
                  placeholder="Enter Your Title"
                  placeholderTextColor="black"
                  style={styles.edittextinput}
                  onChangeText={handleTitle}
                />
                {titleError ? <Text style={styles.error}>{titleError}</Text> : null}
              </View>
              <View>
                <Text style={styles.editname}>Institution</Text>
                <TextInput value={company}
                  placeholder="Enter Your Institution Name"
                  placeholderTextColor="black"
                  onChangeText={handleCompany}
                  style={styles.edittextinput}
                />
                {companyError ? <Text style={styles.error}>{titleError}</Text> : null}
              </View>

              <View style={styles.editbutton1}>
                <Pressable onPress={handlenameeditclose}>
                  <Text style={styles.editbutton}>Cancel</Text>
                </Pressable>
                <Pressable >
                  <Text style={styles.editbutton} onPress={handleSaveUserDetails}>Save</Text>
                </Pressable>
              </View>

            </View>



          </Modal>
        )}



      {/* edit bio modal */}
      {bioModal1Visible
        && (
          <Modal
            transparent={true}
            animationType="slide"
            onRequestClose={handlebiomodalclose}
            visible={bioModal1Visible}
            style={styles.editmodal}
          >
            <View style={styles.editcontainer}>
              <Text style={styles.edittext}>Edit Your Bio</Text>
              {bioError ? <Text style={styles.error1}>{bioError}</Text> : null}

              <View style={styles.bioview}>
                <TextInput
                  style={[styles.editbiotextinput, { height: height > maxHeight ? maxHeight : height }]}
                  value={bio}
                  onChangeText={handleBio}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Enter your Bio here..."
                  placeholderTextColor="black"
                  onContentSizeChange={handleContentSizeChange}
                />
                {height > maxHeight && (
                  <Text style={styles.warningText}>You have exceeded the maximum allowed lines!</Text>
                )}
              </View>
              <View style={styles.editbutton1}>
                <Pressable onPress={handlebiomodalclose}>
                  <Text style={styles.editbutton}>Cancel</Text>
                </Pressable>
                <Pressable >
                  <Text style={styles.editbutton} onPress={handleSaveUserDetails}>Save</Text>
                </Pressable>
              </View>

            </View>



          </Modal>
        )}




      {/* membership modal2 */}
      <View>
        {selectMembership && (

          <Modal
            transparent={true}
            animationType="slide"
            onRequestClose={handlememberclose}
            visible={memberModal1Visible}
          >

            <View style={styles.container3}>
              <View style={styles.firsttab}>
                <Icon name="arrowleft" size={24} color="#64748B" onPress={handlememberclose} />
                <Text style={styles.title}>{selectMembership.type}</Text>
              </View>
              <View style={styles.modelthick} />
              <ScrollView>
                <View style={styles.student}>
                  <View style={styles.imagecontainer}>
                    <Image source={selectMembership.flag} style={styles.image2} />
                  </View>
                  <Text style={styles.head1}>{selectMembership.type}</Text>
                  <Text style={styles.des}>{selectMembership.description}</Text>
                  <View style={styles.student2}>
                    <Text style={styles.ammount}>{selectMembership.price}</Text>
                    <Text style={styles.month}>/Month</Text>
                  </View>
                  <View style={styles.line3} />

                  <View style={styles.done}>
                    <Icon1 name="done" size={24} color="#64748B" />
                    <Text style={styles.doneText}>Lorem ipsum dolor sit amet consecteturSapien non risus lacus elit</Text>
                  </View>

                  <View style={styles.done}>
                    <Icon1 name="done" size={24} color="#64748B" />
                    <Text style={styles.doneText}>Lorem ipsum dolor sit amet consecteturSapien non risus lacus elit</Text>
                  </View>

                  <View style={styles.done}>
                    <Icon1 name="done" size={24} color="#64748B" />
                    <Text style={styles.doneText}>Lorem ipsum dolor sit amet consecteturSapien non risus lacus elit</Text>
                  </View>

                  <View style={styles.done}>
                    <Icon1 name="done" size={24} color="#64748B" />
                    <Text style={styles.doneText}>Lorem ipsum dolor sit amet consecteturSapien non risus lacus elit</Text>
                  </View>

                  <View style={styles.done}>
                    <Icon1 name="done" size={24} color="#64748B" />
                    <Text style={styles.doneText}>Lorem ipsum dolor sit amet consecteturSapien non risus lacus elit</Text>
                  </View>

                  <View style={styles.done}>
                    <Icon1 name="done" size={24} color="#64748B" />
                    <Text style={styles.doneText}>Lorem ipsum dolor sit amet consecteturSapien non risus lacus elit</Text>
                  </View>

                  <View style={styles.done}>
                    <Icon1 name="done" size={24} color="#64748B" />
                    <Text style={styles.doneText}>Lorem ipsum dolor sit amet consecteturSapien non risus lacus elit</Text>
                  </View>

                  <View style={styles.done}>
                    <Icon1 name="done" size={24} color="#64748B" />
                    <Text style={styles.doneText}>Lorem ipsum dolor sit amet consecteturSapien non risus lacus elit</Text>
                  </View>
                  <Pressable onPress={''} style={styles.button2}>
                    <Text style={styles.buttontext}>Upgrade</Text>

                  </Pressable>

                </View>
              </ScrollView>
            </View>

          </Modal>
        )}
      </View>







    </View>
  );


};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: width * 0.045, // 3% of screen width
  },
  image: {
    height: width * 0.1, // 10% of screen width
    width: width * 0.1, // 10% of screen width
    borderRadius: 100,
  },
  search: {
    height: height * 0.05, // 5% of screen height
    borderRadius: 5,
    width: width * 0.6, // 60% of screen width
    backgroundColor: '#CBD5E1',
    marginTop: 5,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0)',
    color: 'black',
    paddingLeft: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  modal: {
    width: width * 0.8, // 80% of screen width
    height: height * 1, // 90% of screen height
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  profile: {
    margin: 5,
    flexDirection: 'row',
  },
  profileimage: {
    borderRadius: 100,
    height: 35,
    width: 35,
  },
  logo: {
    height: 26,
    width: 26,
    resizeMode: 'center',
    alignSelf: 'center',
  },
  profilename: {
    color: '#1E293B',
    fontFamily: 'inter',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  profiledes: {
    color: '#475579',
    fontFamily: 'inter',
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 5,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#CBD5E1',
    marginVertical: 20,
  },
  containerprofile: {
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  profileimg: {
    height: 24,
    width: 24,
    resizeMode: 'center',
  },
  name: {
    color: 'black',
    fontFamily: 'inter',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 10,
  },
  Log: {
    color: '#ff0404',
    fontFamily: 'inter',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 10,
  },
  line2: {
    height: 1,
    width: '100%',
    backgroundColor: '#CBD5E1',
    marginVertical: 20,
  },
  pro: {
    color: '#0966C3',
    fontFamily: 'inter',
    fontSize: 14,
    fontWeight: '500',
  },
  valid: {
    color: '#64748B',
    fontFamily: 'inter',
    fontSize: 12,
    fontWeight: '500',
  },
  endco: {
    marginTop: height * 0.38, // 30% of screen height
  },
  work: {
    flex: 1,
    flexDirection: 'row',
  },
  free: {
    height: '100%',
    width: '100%',
  },
  profileModal: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  profileModalImage: {
    borderRadius: 100,
    height: width * 0.2, // 20% of screen width
    width: width * 0.2, // 20% of screen width
    marginBottom: 10,
  },
  profileModalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileModalDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#ff7f50',
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  firsttab: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingLeft: width * 0.05, // 5% of screen width
    backgroundColor: 'white',
  },
  title: {
    color: '#1E293B',
    fontFamily: 'inter',
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: width * 0.06, // 6% of screen width
  },
  modelthick: {
    height: 8,
    width: '100%',
    backgroundColor: '#CBD5E1',
  },
  title1: {
    color: '#1E293B',
    fontFamily: 'inter',
    fontSize: 16,
    fontWeight: '500',
  },
  secondtab: {
    margin: 24,
  },
  terms: {
    color: '#64748B',
    fontFamily: 'inter',
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 10,
  },
  image1: {
    height: width * 0.7, // 70% of screen width
    width: width * 0.9, // 90% of screen width
    resizeMode: 'center',
  },
  vision: {
    fontFamily: 'inter',
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
  },
  container1: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    height: width * 0.2, // 20% of screen width
    width: width, // full screen width
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 2,
    backgroundColor: 'white',
    borderRadius: 100,
    left: width * 0.17, // 17% of screen width
    height: 25,
    width: 25,
    paddingLeft: 8,
    borderWidth: 1,
  },
  editicon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    height: 32,
    width: 32,
    top: 25,
    backgroundColor: 'white',
    right: 10,
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#0966C3',
  },
  profilephoto: {
    height: width * 0.25, // 25% of screen width
    width: width * 0.25, // 25% of screen width
    position: 'absolute',
    top: 30,
    left: 40,
    borderRadius: 100,
  },
  editicon1: {
    position: 'absolute',
    height: 30,
    width: 30,
    top: hp('10%'),
    backgroundColor: 'white',
    left: hp('15%'),
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#0966C3',
  }, personname: {
    fontFamily: 'inter',
    fontSize: width * 0.04,  // 4% of screen width
    fontWeight: '600',
    color: '#1E293B',
  },
  personbrand: {
    fontFamily: 'inter',
    fontSize: width * 0.035,  // 3.5% of screen width
    fontWeight: '500',
    color: '#475569',
  },
  personprofile: {
    fontFamily: 'inter',
    fontSize: width * 0.03,  // 3% of screen width
    fontWeight: '500',
    color: '#64748B',
  },
  persondetail: {
    width: width * 0.85,  // 85% of screen width
    alignSelf: 'center',
    marginTop: height * 0.1,  // 10% of screen height
    marginBottom: 15,
  },
  editicon2: {
    position: 'absolute',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  biotitle: {
    fontFamily: 'inter',
    fontSize: width * 0.04,  // 4% of screen width
    fontWeight: '500',
    color: '#1E293B',
  },
  bio: {
    fontFamily: 'inter',
    fontSize: width * 0.035,  // 3.5% of screen width
    fontWeight: '500',
    color: '#64748B',
    marginTop: 5,
  },
  biocontainer: {
    width: width * 0.85,  // 85% of screen width
    alignSelf: 'center',
    marginVertical: 15,
  },
  mybio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggle: {
    width: width * 0.85,  // 85% of screen width
    alignSelf: 'center',
    marginVertical: 15,
  },
  profileflex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  deleteaccount: {
    color: 'red',
    fontFamily: 'inter',
    fontSize: width * 0.035,  // 3.5% of screen width
    fontWeight: '500',
    marginTop: 5,
  },
  delete: {
    alignItems: 'center',
    marginVertical: 20,
  },
  personprofile1: {
    fontFamily: 'inter',
    fontSize: width * 0.03,  // 3% of screen width
    fontWeight: '500',
    color: '#64748B',
    marginTop: 5,
  },
  MPesa: {
    fontFamily: 'inter',
    color: 'black',
    fontSize: width * 0.035,  // 3.5% of screen width
    fontWeight: '400',
    marginLeft: 5,
  },
  paymentimage: {
    height: height * 0.025,  // 2.5% of screen height
    width: width * 0.1,  // 10% of screen width
    resizeMode: 'center',
  },
  paymentMethod: {
    flexDirection: 'row',
  },
  paymenttab: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#CBD5E1',
  },
  paymenttab1: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#CBD5E1',
  },
  pressabletext: {
    color: 'white',
    fontFamily: 'inter',
    fontWeight: '600',
    fontSize: width * 0.035,  // 3.5% of screen width
  },
  Button: {
    backgroundColor: '#0966C3',
    width: width * 0.85,  // 85% of screen width
    height: height * 0.07,  // 7% of screen height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  }, container2: {
    flex: 1,
    backgroundColor: '#E2E8F0',
  },
  secondtab1: {
    height: height * 0.35,  // 35% of screen height
    backgroundColor: 'white',
    padding: 24,
  },
  input: {
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 5,
    borderColor: '#CBD5E1',
    marginTop: 10,
    color: 'black',
  },
  personname3: {
    fontFamily: 'inter',
    fontSize: width * 0.04,  // 4% of screen width
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 10,
  },
  Button2: {
    backgroundColor: '#0966C3',
    width: width * 0.85,  // 85% of screen width
    height: height * 0.07,  // 7% of screen height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  passwordtab: {
    height: height * 0.2,  // 20% of screen height
    width: width * 0.4,  // 40% of screen width
    borderRadius: 100,
    backgroundColor: '#0966C333',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  passwordimage: {
    height: height * 0.1,  // 10% of screen height
    width: width * 0.2,  // 20% of screen width
    resizeMode: 'center',
  },
  passwordtab1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  password: {
    fontFamily: 'inter',
    fontSize: width * 0.04,  // 4% of screen width
    fontWeight: '600',
    color: '#1E293B',
  },
  password1: {
    fontFamily: 'inter',
    fontSize: width * 0.035,  // 3.5% of screen width
    fontWeight: '400',
    color: '#64748B',
  },
  membership: {
    fontFamily: 'inter',
    fontSize: width * 0.035,  // 3.5% of screen width
    color: '#64748B',
    fontWeight: '500',
  },
  profess: {
    height: height * 0.04,  // 4% of screen height
    width: width * 0.1,  // 10% of screen width
    resizeMode: 'center',
  },
  membership1: {
    fontFamily: 'inter',
    fontSize: width * 0.042,  // 3.5% of screen width
    fontWeight: '500',
    color: '#0966C3',
  },
  validtill: {
    fontFamily: 'inter',
    fontSize: width * 0.032,  // 3% of screen width
    fontWeight: '400',
    color: '#64748B',
  },
  imageprofess: {
    height: height * 0.06,  // 6% of screen height
    width: width * 0.12,  // 12% of screen width
    borderRadius: 100,
    backgroundColor: '#0966C333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flexDirection: 'row',
    borderRadius: 5,
    height: height * 0.08,  // 8% of screen height
    width: width * 0.85,  // 85% of screen width
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#0966C3',
    marginTop: 20,
    justifyContent: 'space-evenly',
  },
  membership2: {
    fontFamily: 'inter',
    fontSize: width * 0.035,  // 3.5% of screen width
    color: '#1E293B',
    fontWeight: '500',
    marginLeft: 24,
    marginVertical: 15,
  },
  secondtab2: {
    padding: 24,
    backgroundColor: 'white',
  },
  student: {
    backgroundColor: 'white',
    marginTop: 3,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  student1: {
    flexDirection: 'row',
    marginTop: 10,
    color: 'black',
  },
  imagecontainer: {
    height: height * 0.06,  // 8% of screen height
    width: width * 0.12,  // 12% of screen width
    borderRadius: 100,
    backgroundColor: 'lightblue',
  },
  image2: {
    height: height * 0.05,  // 6% of screen height
    width: width * 0.1,  // 10% of screen width
    borderRadius: 100,
    resizeMode: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },
  head: {
    color: 'black',
    fontFamily: 'inter',
    fontSize: width * 0.04,  // 4% of screen width
    fontWeight: '500',
    marginTop: 5,
  },
  des: {
    color: '#64748B',
    fontFamily: 'inter',
    fontSize: width * 0.03,  // 3% of screen width
    fontWeight: '500',
    marginBottom: 5,
  },
  line3: {
    height: 2,
    backgroundColor: '#cbd5e1',
    width: '100%',
  },
  ammount: {
    fontSize: width * 0.06,  // 6% of screen width
    fontWeight: '600',
    fontFamily: 'inter',
    color: 'black',
  },
  month: {
    marginTop: 10,
    marginLeft: 5,
    color: '#64748B',
    fontFamily: 'inter',
    fontSize: width * 0.03,  // 3% of screen width
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#0966C3',
    height: height * 0.07,  // 7% of screen height
    borderRadius: 5,
    marginTop: 20,
    width: width * 0.85,  // 85% of screen width
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    opacity: 0.4,
  },
  buttontext: {
    color: '#FFFFFF',
    fontSize: width * 0.04,  // 4% of screen width
    padding: 9,
    alignSelf: 'center',
    fontWeight: '500',
    fontFamily: 'inter',
  },
  secondtab3: {
    backgroundColor: 'white',
  },
  share: {
    height: height * 0.07,  // 7% of screen height
    width: width * 0.1,  // 10% of screen width
    borderWidth: 1,
    borderColor: '#0966C3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  messagebutton: {
    height: height * 0.07,  // 7% of screen height
    width: width * 0.35,  // 35% of screen width
    backgroundColor: '#0966C3',
    borderRadius: 5,
  },
  callbutton: {
    height: height * 0.07,  // 7% of screen height
    width: width * 0.3,  // 30% of screen width
    borderColor: '#0966C3',
    borderRadius: 5,
    borderWidth: 1,
  },
  callbuttontext: {
    color: '#0966C3',
    fontSize: width * 0.04,  // 4% of screen width
    padding: 9,
    alignSelf: 'center',
    fontWeight: '500',
    fontFamily: 'inter',
  },
  threebutton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  imageabout: {
    height: height * 0.35,  // 35% of screen height
    width: ('100%'),  // 90% of screen width
    resizeMode: 'center',
  },
  container3: {
    flex: 1,
    backgroundColor: 'white',
  },
  secondtab4: {
    flex: 1,
    backgroundColor: 'white',
  },
  head1: {
    color: 'black',
    fontFamily: 'inter',
    fontSize: width * 0.04,  // 4% of screen width
    fontWeight: '500',
    marginTop: 10,
  },
  student2: {
    flexDirection: 'row',
    marginVertical: 20,
    color: 'black',
  },
  doneText: {
    color: '#64748B',
    fontSize: width * 0.035,  // 3.5% of screen width
    fontFamily: 'inter',
    fontWeight: '500',
    width: 270,
    marginLeft: 20,
  }, done: {
    width: width * 0.85, // 85% of screen width
    height: height * 0.05, // 5% of screen height
    flexDirection: 'row',
    marginTop: height * 0.02, // 2% of screen height
  },
  button2: {
    backgroundColor: '#0966C3',
    height: height * 0.07, // 7% of screen height
    borderRadius: 5,
    marginTop: height * 0.03, // 3% of screen height
    width: width * 0.85, // 85% of screen width
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: height * 0.04, // 4% of screen height
  },
  TextInput: {
    height: height * 0.05, // 5% of screen height
    width: width * 0.75, // 75% of screen width
    backgroundColor: '#CBD5E1',
    alignItems: 'center',
    marginLeft: 15,
    color: 'black',
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  firsttab1: {
    flexDirection: 'row',
    height: height * 0.06, // 6% of screen height
    alignItems: 'center',
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  thirdtab: {
    flex: 1,
    backgroundColor: 'white',
  },
  editcontainer: {
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginVertical: height * 0.1, // 10% of screen height
    borderRadius: 10,
  },
  edittext: {
    fontSize: width * 0.04, // 4% of screen width
    textAlign: 'center',
    marginTop: height * 0.015, // 1.5% of screen height
    fontWeight: '600',
    marginBottom: height * 0.025, // 2.5% of screen height
  },
  editname: {
    color: 'black',
    fontSize: width * 0.035, // 3.5% of screen width
    fontWeight: '500',
    marginHorizontal: 20,
  },
  editbutton: {
    color: 'black',
    alignSelf: 'center',
  },
  editbutton1: {
    flexDirection: 'row',
    marginBottom: height * 0.03, // 3% of screen height
    marginTop: height * 0.03, // 3% of screen height
    width: width * 0.65, // 65% of screen width
    marginHorizontal: width * 0.1, // 10% of screen width
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  edittextinput: {
    width: width * 0.9, // 90% of screen width
    alignSelf: 'center',
    borderWidth: 1,
    marginVertical: height * 0.02, // 2% of screen height
    borderRadius: 10,
    color: 'black',
    height: height * 0.07, // 7% of screen height
    paddingLeft: 15,
  },
  bioview: {
    borderWidth: 2,
    width: width * 0.8, // 80% of screen width
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    height: height * 0.15, // 15% of screen height
  },
  editbiotextinput: {
    width: '100%',
    padding: 10,
    fontSize: width * 0.04, // 4% of screen width
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginBottom: height * 0.02, // 2% of screen height
    marginLeft: width * 0.07, // 7% of screen width
  },
  error1: {
    color: 'red',
    marginBottom: height * 0.01, // 2% of screen height
    marginLeft: width * 0.1, // 7% of screen width
  },

});

export default Topbar;
