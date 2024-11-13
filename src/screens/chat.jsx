import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { firebase } from '../firebaseConfig';
import Icon from 'react-native-vector-icons/AntDesign';

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
    if (message.trim() && user && user.uid && userUid) {
      setIsSending(true); // Show the activity indicator when sending starts
      try {
        const chatId = [user.uid, userUid].sort().join('_');
        const senderId = user.uid;
        const recipientId = userUid;

        const messagesRef = firebase.firestore().collection('chats')
          .doc(chatId) // Reference to the specific chat document
          .collection('messages'); // Subcollection for messages

        const newMessage = {
          text: message,
          senderId,
          recipientId,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Automatically use Firestore server timestamp
          date: new Date().toLocaleString(), // Format the date as needed
        };

        // Add new message to the Firestore
        await messagesRef.add(newMessage);

        setMessage(''); // Clear the input after sending
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setIsSending(false); // Hide the activity indicator after sending is complete
      }
    }
  };

  // Scroll to the bottom of the FlatList whenever messages change
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

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
          // Check if the message is from the current user or the receiver
          const isSender = item.senderId === user?.uid; // Check if the senderId matches the current user

          return (
            <View style={[styles.messageContainer, isSender ? styles.sender : styles.receiver]}>
              <Text style={[styles.messageText, isSender ? styles.senderText : styles.receiverText]}>{item.text}</Text>
              <Text style={[styles.timestamp, isSender ? styles.senderText : styles.receiverText]}>
                {item.timestamp ? new Date(item.timestamp.seconds * 1000).toLocaleString() : ''}
              </Text>
            </View>
          );
        }}
      />

      {/* Input and Send button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          placeholderTextColor="gray"
        />
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
  sendButtonText: {
    color: '#fff',
    fontSize: scaleFont(16), // Scaled font size
  },
});

export default ChatScreen;
