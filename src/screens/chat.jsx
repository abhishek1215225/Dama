import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList,Alert, StyleSheet,Image, Dimensions, ActivityIndicator } from 'react-native';
import { firebase } from '../firebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary , launchCamera} from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

// Scale font sizes and spacing based on screen width
const scaleFont = (size) => size * (width / 375);

const ChatScreen = ({ route, navigation }) => {
  const { userUid, firstName } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [isSending, setIsSending] = useState(false); // State to track if the message is being sent

  const flatListRef = useRef(null); // Reference for FlatList

  // Fetch current user
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  // Fetch chat messages between the current user and the selected user
  useEffect(() => {
    if (user && userUid) {
      const chatId = [user.uid, userUid].sort().join('_');

      const messagesRef = firebase.firestore().collection('chats')
        .doc(chatId)  // Create document for chatId
        .collection('messages') // Subcollection for messages
        .orderBy('timestamp', 'asc'); // Ensure messages are ordered by timestamp

      const unsubscribe = messagesRef.onSnapshot(snapshot => {
        // Check if the snapshot contains docs
        if (snapshot && snapshot.docs) {
          const messagesData = snapshot.docs.map(doc => doc.data());
          setMessages(messagesData);
        } else {
          console.error('No documents found or error in snapshot');
        }
      }, (error) => {
        // Handle potential errors in query
        console.error("Error fetching messages:", error);
      });

      return unsubscribe;
    }
  }, [user, userUid]);

  // Send a message
  const handleSendMessage = async () => {
    if (message.trim() || selectedImage) {
      setIsSending(true); // Show the activity indicator when sending starts
      try {
        const chatId = [user.uid, userUid].sort().join('_');
        const senderId = user.uid;
        const recipientId = userUid;

        const messagesRef = firebase.firestore().collection('chats')
          .doc(chatId) // Reference to the specific chat document
          .collection('messages'); // Subcollection for messages

        const newMessage = {
          text: message.trim(), // Add text if it exists
          senderId,
          recipientId,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Automatically use Firestore server timestamp
          date: new Date().toLocaleString(), // Format the date as needed
        };

        // If there's an image selected, upload it first
        if (selectedImage) {
          const imageURL = await uploadImage(selectedImage); // Upload image and get URL
          newMessage.imageURL = imageURL; // Add the image URL to the message
        }

        // Add new message (text + image if exists) to Firestore
        await messagesRef.add(newMessage);

        setMessage(''); // Clear the input after sending
        setSelectedImage(null); // Clear the selected image after sending
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setIsSending(false); // Hide the activity indicator after sending is complete
      }
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      
      // Create a unique name for the image
      const imageName = `chat_images/${Date.now()}.jpg`; // Adding .jpg or .png to the image name
  
      // Reference to Firebase storage
      const storageRef = firebase.storage().ref(imageName);
  
      // Upload image
      await storageRef.put(blob);  // Upload the image to Firebase
  
      // Get the download URL
      const downloadURL = await storageRef.getDownloadURL();
      console.log("Image uploaded successfully, download URL: ", downloadURL);
      return downloadURL; // Return the download URL after upload
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;  // Re-throw error if upload fails
    }
  };
  
  
  // Scroll to the bottom of the FlatList whenever messages change
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    if (user && userUid) {
      const chatId = [user.uid, userUid].sort().join('_');
  
      const messagesRef = firebase.firestore().collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timestamp', 'asc');
  
      const unsubscribe = messagesRef.onSnapshot(snapshot => {
        const messagesData = snapshot.docs.map(doc => ({
          id: doc.id, // Include Firestore document ID
          ...doc.data(),
        }));
        setMessages(messagesData);
      });
  
      return unsubscribe;
    }
  }, [user, userUid]);
  

  const [selectedImage, setSelectedImage] = React.useState(null);


  const handlegallery = () => {
    // Show an alert or action sheet to select camera or gallery
    Alert.alert(
      "Select Image",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: () => openCamera(),
        },
        {
          text: "Pick from Gallery",
          onPress: () => openGallery(),
        },
        {
          text: "Cancel",
          style: "cancel",
        }
      ]
    );
  };
  
  // Open Camera
  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,  // Save to the photo gallery after capture
    };
  
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const { uri } = response.assets[0];
        setSelectedImage(uri);  // Set the selected image URI
      } else {
        console.error('Unexpected response structure:', response);
      }
    });
  };

  // Open Gallery
  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery picker');
      } else if (response.errorCode) {
        console.log('Gallery Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const { uri } = response.assets[0];
        setSelectedImage(uri);  // Set the selected image URI
      } else {
        console.error('Unexpected response structure:', response);
      }
    });
  };
  const handleRemoveImage = () => {
    setSelectedImage(null);
  };


  const handleLongPress = (messageId) => {
    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete this message?",
      [
        {
          text: "Cancel",
          style: "cancel", // Just close the alert without doing anything
        },
        {
          text: "Delete",
          style: "destructive", // Mark the delete action as destructive (red color)
          onPress: () => handleDeleteMessage(messageId), // Call handleDeleteMessage to delete the message
        },
      ]
    );
  };

  const handleDeleteMessage = async (messageId) => {
    if (messageId) {
      try {
        const chatId = [user.uid, userUid].sort().join('_');
  
        // Delete the message from Firestore
        await firebase.firestore().collection('chats')
          .doc(chatId) // Get the specific chat
          .collection('messages') // Access the messages subcollection
          .doc(messageId) // Use the message ID for deletion
          .delete();
  
        // Optionally, remove the message from the local state to update the UI immediately
        setMessages((prevMessages) => prevMessages.filter(message => message.id !== messageId));
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };
  


  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
      <Icon name="arrowleft" size={24} color="#64748B"  onPress={()=> navigation.goBack()}/>
      <Text style={styles.chatHeader}>{firstName}</Text>
      </View>

      {/* Display chat messages */}
      <FlatList
  ref={flatListRef} // Assign the ref to the FlatList
  data={messages}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => {
    const isSender = item.senderId === user?.uid; // Check if the senderId matches the current user

    return (
      <TouchableOpacity 
        onLongPress={() => handleLongPress(item.id)} // Pass the message ID to delete
        style={[styles.messageContainer, isSender ? styles.sender : styles.receiver]}>
        <Text style={[styles.messageText, isSender ? styles.senderText : styles.receiverText]}>
          {item.text}
        </Text>
        <Text style={[styles.timestamp, isSender ? styles.senderText : styles.receiverText]}>
          {item.timestamp ? new Date(item.timestamp.seconds * 1000).toLocaleString() : ''}
        </Text>
      </TouchableOpacity>
    );
  }}
/>


{selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          <TouchableOpacity style={styles.closeButton} onPress={handleRemoveImage}>
            <Icon name="closecircle" size={30} color="red" />
          </TouchableOpacity>
        </View>
      )}

      {/* Input and Send button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          placeholderTextColor="gray"
        />
  <TouchableOpacity style={styles.gallery} onPress={handlegallery}>
  <Icon name="picture" size={30} color="gray" />
</TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          {isSending ? (
            <ActivityIndicator size="small" color="#fff" /> // Show spinner when sending
          ) : (
            <Text style={styles.sendButtonText}>Send</Text> // Show "Send" when not sending
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.03, // 3% of screen width for padding
    backgroundColor: '#f5f5f5',
  },

  chatContainer:{
     flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.03, // 3% of screen width
    marginBottom:height * 0.01 ,
    backgroundColor: '#fff',
    width:width,
    borderRadius:10,
  },
  chatHeader: {
    fontSize: scaleFont(20), // Scaled font size
    fontWeight: 'bold',
    marginVertical: height * 0.01, // 2.5% of screen height
    marginLeft: width * 0.025,
  },
  messageContainer: {
    marginBottom: height * 0.015, // 1.5% of screen height
    padding: width * 0.03, // 3% of screen width for padding
    borderRadius: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start', // Default for receiver
  },
  sender: {
    backgroundColor: '#1e90ff',
    alignSelf: 'flex-end', // Align sender's messages to the right
  },
  receiver: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start', // Align receiver's messages to the left
  },
  messageText: {
    fontSize: scaleFont(16), // Scaled font size
    color: '#333',
  },
  senderText: {
    color: '#fff',
  },
  receiverText: {
    color: '#333',
  },
  timestamp: {
    fontSize: scaleFont(12), // Scaled font size
    color: '#999',
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.03, // 3% of screen width
    paddingBottom: height * 0.01, // 3% of screen height
    backgroundColor: '#fff',
    paddingTop: height * 0.01,
  },
  textInput: {
    flex: 1,
    padding: width * 0.03, // 3% of screen width for padding
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    marginLeft: width * 0.03, // 3% of screen width
    backgroundColor: '#1e90ff',
    paddingVertical: height * 0.015, // 1.5% of screen height
    paddingHorizontal: width * 0.04, // 4% of screen width
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gallery:{
    marginLeft:10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: scaleFont(16), // Scaled font size
  },
  imageContainer: {
    position: 'relative', // Make sure the close button is positioned over the image
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    left: 180,
    zIndex: 1,
  },
});

export default ChatScreen;
