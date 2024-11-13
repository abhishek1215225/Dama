import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet,Dimensions } from 'react-native';
import { firebase } from '../firebaseConfig';  // Import your firebase config
const { width, height } = Dimensions.get('window');

// Scale font sizes based on screen width
const scaleFont = (size) => size * (width / 375);

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state for UI feedback

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('users')
      .onSnapshot(
        snapshot => {
          if (snapshot.empty) {
            console.log("No users found.");
            setUsers([]);  // Set empty array if no users are found
          } else {
            const usersList = snapshot.docs
              .map(doc => doc.data())
              .filter(user => user.uid !== firebase.auth().currentUser?.uid); // Exclude current user
            setUsers(usersList);
          }
          setLoading(false); // Stop loading once data is fetched
        },
        
        error => {
          console.error("Error fetching users:", error);
          setLoading(false); // Stop loading if an error occurs
        }
      );

    return unsubscribe; // Cleanup on unmount
  }, []);

  const handleUserSelect = (selectedUser) => {
    navigation.navigate('Chat', { userUid: selectedUser.uid, firstName: selectedUser.firstName });
    console.log(selectedUser.uid);

  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading users...</Text>  {/* Show loading text */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a User to Chat</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => handleUserSelect(item)} // Handle user selection
          >
            <Text style={styles.userName}>{item.firstName}</Text>  {/* Displaying the user's first name */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.03, // 3% of screen width for padding
    backgroundColor: 'white',
  },
  header: {
    fontSize: scaleFont(20), // Scaled font size
    fontWeight: 'bold',
    marginBottom: height * 0.025, // 2.5% of screen height
  },
     userItem: {
    padding: width * 0.04, // 4% of screen width
    marginBottom: height * 0.015, // 1.5% of screen height
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  userName: {
    fontSize: scaleFont(16), // Scaled font size
    color: '#333',
  },
});

export default UserListScreen;
