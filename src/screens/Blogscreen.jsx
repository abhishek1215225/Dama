import React,{useState} from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, FlatList,
   TouchableOpacity,Modal,ImageBackground,Pressable,ScrollView,Dimensions } from 'react-native';
import Topbar from '../components/Topbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');

const DATA = [
  {
    id: '1',
    title: 'Taxpayers pay Sh17bn Kenya Airways loans in 9 months to March 2024 to service a Kenya',
    time: '3 hrs ago',
    description:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec. Lectus ut lobortis lobortis congue. Diam nullam augue velit eros id gravida sagittis a ipsum. Mollis ultrices dictum ullamcorper sed sagittis. Duis dui sed adipiscing mus tortor integer. Dignissim hendrerit commodo mattis malesuada in interdum. Nisl varius aliquet diam tristique sagittis ac. Quisque fermentum bibendum sagittis aliquam convallis fermentum. Sem pellentesque eu volutpat nibh vitae. commodo mattis malesuada in interdum. Nisl varius aliquet diam tristique sagittis ac. Quisque fermentum bibendum sagittis aliquam convallis',
    image: require('../assests/airway.png'),
    author: 'Leandro Trossard',
    role: 'Accountant',
    blogType: 'Blog',
    likes: 48,
    commentsi: 58,
    comments: [
      { id: '1', image: require('../assests/profile.png'),author: 'Leandro Trossard',role: 'Accountant', text: 'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.', time: '3hrs ago' },
      { id: '2',  image: require('../assests/profile.png') ,author: 'Leandro Trossard',role: 'Accountant', text: 'Nisl varius aliquet diam tristique sagittis ac. Quisque fermentum bibendum sagittis aliquam convallis fermentum. Sem pellentesque eu volutpat nibh vitae.', time: '3hrs ago' },
    ],
  },
];

const BlogScreen = ({ navigation }) => {
  const [profileModal1Visible, setProfileModal1Visible] = useState(false);

  const handleProfile1Close = () => {
    setProfileModal1Visible(false);
  };

  const handleProfile1open = () => {
    setProfileModal1Visible(true);
  };
  const [liked, setLiked] = useState(false); // Default is black (not liked)

  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked); // Toggle between true and false
  };


  const renderItem = ({ item }) => (
    <View>
    <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', { item })}>
      <View>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{item.title}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Image source={item.image} style={styles.image} />
        </View>

        </TouchableOpacity>

        <View >
        <TouchableOpacity onPress={handleProfile1open}>
          <View style={styles.profile}>
          <Image source={require('../assests/profile.png')} style={styles.profileImage} />
          <View style={styles.profileBar}>
            <Text style={styles.profileName}>{item.author}</Text>
            <Text style={styles.profileDe}>{item.role}</Text>
            </View>
            <View style={styles.blogContainer}>
            <Text style={styles.blog}>{item.blogType}</Text>
          </View>
          </View>
        </TouchableOpacity>
        </View>

        <View style={styles.line} />
        <View style={styles.likeBar}>
        <TouchableOpacity onPress={toggleLike}>
          <Text style={styles.likes}><Icon2 name="like2" size={20} color={liked ? 'blue' : 'black'}/> Like {item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', { item })}>
          <Text style={styles.likes}><Icon name="message-text-outline" size={20} color="#000" /> Comments {item.commentsi}</Text>
          </TouchableOpacity>
          <Text style={styles.likes}><Icon1 name="share" size={20} color="#000" /> Share</Text>
        </View>
        <View style={styles.space} />
      </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Topbar />
      <View style={styles.space} />


      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}

      />


       {/* Profile Modal1 */}
       <Modal
        transparent={true}
        animationType="slide"
        onRequestClose={handleProfile1Close}
        visible={profileModal1Visible}
      >
        <ScrollView style={styles.container2}>
          <View style={styles.firsttab}>
            <Icon2 name="arrowleft" size={24} color="#64748B" onPress={handleProfile1Close} />
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
            <View  style={styles.share} >
                <Icon1 name="share" size={24} color="#0966C3" />
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


    </SafeAreaView>
  );
};

export default BlogScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatListContent: {
    paddingBottom: height * 0.03, // 3% of screen height
  },
  space: {
    height: height * 0.01, // 1% of screen height
    width: '100%',
    backgroundColor: '#CBD5E1',
  },
  heading: {
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: '600',
    fontFamily: 'inter',
    color: 'black',
  },
  headingContainer: {
    margin: width * 0.05, // 5% of screen width
  },
  image: {
    height: height * 0.25, // 25% of screen height
    width: '100%',
  },
  profile: {
    margin: width * 0.05, // 5% of screen width
    flexDirection: 'row',
  },
  profileImage: {
    borderRadius: 100,
    height: width * 0.1, // 10% of screen width
    width: width * 0.1, // 10% of screen width
  },
  profileName: {
    fontSize: width * 0.035, // 3.5% of screen width
    fontWeight: '500',
    fontFamily: 'inter',
    color: 'black',
    marginLeft: width * 0.03, // 3% of screen width
  },
  profileDe: {
    color: 'black',
    fontSize: width * 0.03, // 3% of screen width
    fontWeight: '400',
    fontFamily: 'inter',
    marginLeft: width * 0.03, // 3% of screen width
  },
  blog: {
    color: 'blue',
    textAlign: 'center',
  },
  blogContainer: {
    backgroundColor: '#B7E0FF',
    height: height * 0.03, // 3% of screen height
    width: width * 0.12, // 12% of screen width
    borderRadius: 50,
  },
  line: {
    height: 2,
    width: '90%',
    backgroundColor: '#CBD5E1',
    marginLeft: width * 0.05, // 5% of screen width
  },
  likeBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: height * 0.02, // 2% of screen height
  },
  time: {
    fontFamily: 'inter',
    fontSize: width * 0.03, // 3% of screen width
    fontWeight: '400',
    color: 'black',
    marginTop: height * 0.01, // 1% of screen height
  },
  profileBar: {
    justifyContent: 'space-evenly',
    flex: 1,
  },
  likes: {
    color: 'black',
  },
  container2: {
    flex: 1,
    backgroundColor: '#E2E8F0',
  },
  firsttab: {
    flexDirection: 'row',
    height: height * 0.06, // 6% of screen height
    alignItems: 'center',
    paddingLeft: width * 0.06, // 6% of screen width
    backgroundColor: 'white',
  },
  title: {
    color: '#1E293B',
    fontFamily: 'inter',
    fontSize: width * 0.035, // 3.5% of screen width
    fontWeight: '500',
    paddingLeft: width * 0.07, // 7% of screen width
  },
  modelthick: {
    height: height * 0.01, // 1% of screen height
    width: '100%',
    backgroundColor: '#CBD5E1',
  },
  secondtab3: {
    backgroundColor: 'white',
  },
  background: {
    height: height * 0.1, // 20% of screen height
    width: width * 1, // 90% of screen width
  },
  profilephoto: {
    height: height * 0.1, // 10% of screen height
    width: height * 0.1, // 10% of screen height
    position: 'absolute',
    top: height * 0.04, // 4% of screen height
    left: width * 0.1, // 10% of screen width
    borderRadius: 100,
  },
  persondetail: {
    width: width * 0.85, // 85% of screen width
    alignSelf: 'center',
    marginTop: height * 0.05, // 8% of screen height
    marginBottom: height * 0.02, // 2% of screen height
  },
  personname: {
    fontFamily: 'inter',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: '600',
    color: '#1E293B',
  },
  personbrand: {
    fontFamily: 'inter',
    fontSize: width * 0.035, // 3.5% of screen width
    fontWeight: '500',
    color: '#475569',
  },
  personprofile: {
    fontFamily: 'inter',
    fontSize: width * 0.03, // 3% of screen width
    fontWeight: '500',
    color: '#64748B',
  },
  threebutton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.02, // 2% of screen height
  },
  messagebutton: {
    height: height * 0.06, // 6% of screen height
    width: width * 0.35, // 35% of screen width
    backgroundColor: '#0966C3',
    borderRadius: 5,
  },
  buttontext: {
    color: '#FFFFFF',
    fontSize: width * 0.04, // 4% of screen width
    padding: 9,
    alignSelf: 'center',
    fontWeight: '500',
    fontFamily: 'inter',
  },
  callbutton: {
    height: height * 0.06, // 6% of screen height
    width: width * 0.3, // 30% of screen width
    borderColor: '#0966C3',
    borderRadius: 5,
    borderWidth: 1,
  },
  callbuttontext: {
    color: '#0966C3',
    fontSize: width * 0.04, // 4% of screen width
    padding: 9,
    alignSelf: 'center',
    fontWeight: '500',
    fontFamily: 'inter',
  },
  share: {
    height: height * 0.06, // 6% of screen height
    width: width * 0.1, // 10% of screen width
    borderWidth: 1,
    borderColor: '#0966C3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  biocontainer: {
    width: width * 0.85, // 85% of screen width
    alignSelf: 'center',
    marginVertical: height * 0.02, // 2% of screen height
  },
  mybio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  biotitle:{
    fontSize: width * 0.04,
    fontFamily:'inter',
    fontWeight:'600',
  },
  bio:{
    color:'black',
    fontSize: width * 0.033,
    fontFamily:'inter',
  },


});
