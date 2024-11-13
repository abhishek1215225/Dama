import React,{useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TextInput, Pressable,Dimensions } from 'react-native';
import Topbar from '../components/Topbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Ionicons';

// Get device width and height
const { width, height } = Dimensions.get('window');

// Function to scale font sizes based on screen width
const scaleFont = (size) => size * (width / 375);




const DetailsScreen = ({ route }) => {
  const {  item } = route.params;
  const [liked, setLiked] = useState(false); // Default is black (not liked)

  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked); // Toggle between true and false
  };


  const renderComment = ({ item }) => (
    <View style={styles.modelcommentContainer}>
      <View  style={styles.modelcommentprofilebar}>
        <View style={styles.modelnameimage}>
        <View>
      <Image source={item.image} style={styles.modelcommentimage} />
      </View>
      <View>
      <Text style={styles.modelcommentAuthor}>{item.author}</Text>
      <Text style={styles.modelrole}>{item.role}</Text>
      </View>
      </View>
      <View>
      <Text style={styles.modelcommentTime}>{item.time}</Text>
      </View>
      </View>
      <Text style={styles.modelcommentText}>{item.text}</Text>
    </View>
  );

  return (
    <View  style={styles.container}>
    <Topbar />
    <ScrollView style={styles.modelcontainer}>
      <View style={styles.modelthick}/>
      <View style={styles.modelprofile}>
        <View style={styles.modelprofile1}>
          <Image source={require('../assests/profile.png')} style={styles.modelprofileImage} />
          <View style={styles.modelprofileBar}>
            <Text style={styles.modelprofileName}>{item.author}</Text>
            <Text style={styles.modelprofileDe}>{item.role}</Text>
            <Text style={styles.modeltime}>{item.time}</Text>
          </View>
        </View>
        <View style={styles.modelblogContainer}>
          <Text style={styles.modelblog}>{item.blogType}</Text>
        </View>
      </View>
      <Text style={styles.modelheading}>{item.title}</Text>
      <Text style={styles.modeldescription}>{item.description}</Text>
      <Image source={item.image} style={styles.modelimage} />
      <View style={styles.modellikeBar}>
      <Pressable onPress={toggleLike}>
      <Text style={styles.modellikes}><Icon2 name="like2" size={20} color={liked ? 'blue' : 'black'} /> Like {item.likes}</Text>
      </Pressable>
          <Text style={styles.modellikes}><Icon name="message-text-outline" size={20} color="#000" /> Comments {item.commentsi}</Text>
          <Text style={styles.modellikes}><Icon1 name="share" size={20} color="#000" /> Share</Text>
      </View>
      <View style={styles.modelthick}/>
      <Text style={styles.modelcommentheader}>Comments</Text>

      <FlatList
        data={item.comments}
        renderItem={renderComment}
        keyExtractor={item => item.id}
        style={styles.modelcommentList}
      />
      <View style={styles.modelthick}/>
    </ScrollView>

      <View style={styles.modelcommentbar}>
        <TextInput placeholder="Leave a Comment" placeholderTextColor="#64748B" style={styles.modelTextInput}/>
        <Icon3 name="send-sharp" size={22} color="#0966C3"  style={styles.icon}/>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modelcontainer: {
    backgroundColor: 'white',
  },
  modelheading: {
    fontSize: scaleFont(14),
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#1E293B',
    marginHorizontal: width * 0.05, // 5% of screen width
    padding: height * 0.006, // ~0.6% of screen height
  },
  modeltime: {
    fontSize: scaleFont(12),
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#1E293B',
  },
  modelimage: {
    height: height * 0.3, // 30% of screen height
    width: '100%',
    marginVertical: height * 0.012, // ~1.2% of screen height
  },
  modelprofile: {
    flexDirection: 'row',
    marginVertical: height * 0.012,
    justifyContent: 'space-between',
    marginHorizontal: width * 0.05,
  },
  modelprofile1: {
    flexDirection: 'row',
  },
  modelprofileImage: {
    borderRadius: 100,
    height: height * 0.045, // ~4.5% of screen height
    width: height * 0.045,
  },
  modelprofileBar: {
    justifyContent: 'center',
    marginLeft: width * 0.03,
  },
  modelprofileName: {
    fontSize: scaleFont(14),
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#1E293B',
  },
  modelprofileDe: {
    fontSize: scaleFont(14),
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#475569',
  },
  modelblogContainer: {
    backgroundColor: '#B7E0FF',
    height: height * 0.025,
    width: width * 0.12,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelblog: {
    color: 'blue',
    textAlign: 'center',
  },
  modeldescription: {
    color: '#64748B',
    fontSize: scaleFont(12),
    fontWeight: '400',
    fontFamily: 'Inter',
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.012,
  },
  modelline: {
    height: height * 0.003, // ~0.3% of screen height
    width: '90%',
    backgroundColor: '#CBD5E1',
    marginLeft: width * 0.05,
  },
  modellikeBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: height * 0.006,
  },
  modellikes: {
    color: 'black',
  },
  modelcommentList: {
    paddingHorizontal: width * 0.025,
  },
  modelcommentContainer: {
    marginVertical: height * 0.006,
    padding: width * 0.03,
    backgroundColor: '#F1F5F9',
    width: width * 0.85,
    alignSelf: 'center',
  },
  modelcommentAuthor: {
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Inter',
    fontSize: scaleFont(14),
    marginLeft: width * 0.03,
  },
  modelcommentText: {
    fontWeight: '400',
    color: '#64748B',
    fontFamily: 'Inter',
    fontSize: scaleFont(12),
    paddingLeft: width * 0.03,
    marginTop: height * 0.0,
  },
  modelcommentTime: {
    fontWeight: '400',
    color: '#64748B',
    fontFamily: 'Inter',
    fontSize: scaleFont(12),
  },
  modelrole: {
    fontWeight: '400',
    color: 'black',
    fontFamily: 'Inter',
    fontSize: scaleFont(12),
    marginLeft: width * 0.03,
  },
  modelcommentimage: {
    height: height * 0.045,
    width: height * 0.045,
    borderRadius: 100,
  },
  modelcommentprofilebar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.012,
  },
  modelnameimage: {
    flexDirection: 'row',
  },
  modelcommentheader: {
    color: 'black',
    fontFamily: 'Inter',
    fontSize: scaleFont(14),
    fontWeight: '600',
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.025,
  },
  modelviewmore: {
    color: '#64748B',
    fontFamily: 'Inter',
    fontSize: scaleFont(12),
    fontWeight: '400',
    marginVertical: height * 0.012,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginHorizontal: width * 0.05,
  },
  modelthick: {
    height: height * 0.01,
    width: '100%',
    backgroundColor: '#F1F5F9',
    marginTop: height * 0.012,
  },
  modelTextInput: {
    width: width * 0.75,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: height * 0.01,
    borderColor: '#CBD5E1',
    borderRadius: 5,
    height: height * 0.045,
    paddingLeft: width * 0.05,
    paddingTop: width * 0.02,
    color: 'black',
    backgroundColor: '#F1F5F9',
  },
  modelcommentbar: {
    flexDirection: 'row',
    paddingHorizontal: width * 0.06,
    backgroundColor: 'white',
  },
  modelsend: {
    height: height * 0.03,
    width: height * 0.03,
    resizeMode: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginLeft: width * 0.05,
  },
});

export default DetailsScreen;
