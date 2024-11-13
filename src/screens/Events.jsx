import React,{useState} from 'react';
import { Text , View ,  StyleSheet ,Pressable , ImageBackground ,FlatList,Image,Modal,ScrollView ,Dimensions} from 'react-native';
import Topbar from '../components/Topbar';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
const { width, height } = Dimensions.get('window');

const DATA = [
    {
     id: 1,
     title:'World Economics and Finance Conference',
     date:'14th August 2024',
     location:'Mombasa, Kenya',
     image: require('../assests/eventpage1.png'),
     price:'KES 1,500',
    },
    {
        id: 2,
        title:'Google Cloud Next 2024 Conference',
        date:'28th August 2024',
        location:'Nairobi, Kenya',
        image: require('../assests/eventpage2.png'),
        price:'Free',
       },
       {
        id: 3,
        title:'Google Cloud Next 2024 Conference',
        date:'28th August 2024',
        location:'Nairobi, Kenya',
        image: require('../assests/eventpage3.png'),
        price:'Free',
       },
  ];

  const Speakers = [{
    id:1,
    Name:'Angel Sha',
    image:require('../assests/speaker1.png'),
  },
  {
    id:2,
    Name:'Tom Hardy',
    image:require('../assests/speaker2.png'),
  },
  {
    id:3,
    Name:'Jane Doe',
    image:require('../assests/speaker3.png'),
  },
  {
    id:4,
    Name:'Mat Brown',
    image:require('../assests/speaker4.png'),
  },
];


const Event = ({navigation}) =>{
    const [activeButton, setActiveButton] = useState('AllEvents');
      const [modalVisible, setModalVisible] = useState(false);
      const [selectedEvent, setSelectedEvent] = useState(null);
      const [imageModalVisible, setImageModalVisible] = useState(false);
      const [showImage, setShowImage] = useState(false);
      const [showWelcomeText, setShowWelcomeText] = useState(true);
      const [showbutton, setShowbutton] = useState(true);

      const showImageAlert = () => {
        setImageModalVisible(true);

      };
      const closeImageAlert = () =>{
        setImageModalVisible(false);
        setShowImage(true);
        setShowWelcomeText(false);
        setShowbutton(false);

      };

      const handleButtonPress = (button) => {
        setActiveButton(button);
      };

      const handleOpen = (resource) => {
        setSelectedEvent(resource);
        setModalVisible(true);
      };

      const handleClose = () => {
        setSelectedEvent(null);
        setModalVisible(false);
      };


      const renderspeaker = ({item}) =>(
        <View style={styles.speaker}>
          <Image source={item.image} style={styles.speakerimage}/>
          <Text style={styles.speakername}>{item.Name}</Text>
        </View>

      );
    const renderitem = ({item}) =>(
      <Pressable onPress={() => handleOpen(item)}>
        <ScrollView>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.dateandlocation}>
                <Text style={styles.date}><Icon name="calendar" size={15} color="#64748B" /> {item.date} </Text>
                <Text style={styles.location}><Icon1 name="location" size={15} color="#0966C3" /> {item.location}</Text>
            </View>
            <ImageBackground source={item.image} style={styles.image}>
              <Pressable  >
              <View style={styles.imagebutton}>
                <Text  style={styles.imagebuttonText}>{item.price}</Text>
                </View>
              </Pressable>
            </ImageBackground>
            <View style={styles.modelthick}/>
        </ScrollView>
        </Pressable>
    );
    return(<View style={styles.container}>
        <Topbar />
        <View style={styles.line} />
        <View style={styles.firsttab}>
            <Pressable style={[styles.button,activeButton === 'AllEvents' ? styles.activeButton : styles.inactiveButton]}
            onPress={() => handleButtonPress('AllEvents')}>
                <Text style={[styles.buttontext, activeButton === 'AllEvents' ? styles.activeText : styles.inactiveText]}>All Events</Text>
            </Pressable>
            <Pressable style={[styles.button,activeButton === 'MyEvents' ? styles.activeButton : styles.inactiveButton]}
            onPress={() => handleButtonPress('MyEvents')}>
                <Text style={[styles.buttontext, activeButton === 'MyEvents' ? styles.activeText : styles.inactiveText]}>My Events</Text>
            </Pressable>
        </View>
        <View style={styles.modelthick}/>
        {activeButton === 'AllEvents' ? (
          <ScrollView>
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.firsttab1}>
            <Icon name="arrowleft" size={24} color="#64748B" onPress={handleClose} />
            <Text style={styles.title1} numberOfLines={1}>World Economics and Finance Conference</Text>
          </View>

          {selectedEvent && (
            <ScrollView style={styles.modalDetails}>
              <View style={styles.modelthick} />
              <Image source={selectedEvent.image} style={styles.ModalImage}/>
              <View>
            <Text style={styles.title}>{selectedEvent.title}</Text>
            <View style={styles.dateandlocation}>
                <Text style={styles.date}><Icon name="calendar" size={15} color="#64748B" /> {selectedEvent.date} </Text>
                <Text style={styles.location}><Icon1 name="location" size={15} color="#0966C3" /> {selectedEvent.location}</Text>
            </View>
            </View>
            <View style={styles.line1} />
            <View style={styles.RSVPTAB}>
            {showWelcomeText && <View>
                <Text style={styles.priceText}>Price</Text>
                <Text style={styles.price}>{selectedEvent.price}</Text>
              </View>
              }
              {showbutton ? (
                <View >
                <Pressable  onPress={showImageAlert}>
                <View style={styles.RSVP}>
                  <Text  style={styles.RSVPTEXT}>RSVP</Text>
                  </View>
                </Pressable>
                </View>
              ) : (
                <View >
              <Pressable >
              <View style={styles.SecondButton}>
                <Text  style={styles.RSVPTEXT}>Attending</Text>
                </View>
              </Pressable>
              </View>
              )}
              <View  style={styles.share} >
                <Icon2 name="share" size={24} color="#0966C3" />
              </View>
            </View>
            <View>
              <Text style={styles.title}>About Event</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur. 
                Quisque scelerisque sit nunc lorem eu elementum. Nec morbi nunc sagittis
                 habitasse nunc augue. Gravida blandit phasellus quam nunc orci. Elementum rhoncus 
                 ac viverra aliquam egestas non commodo eu vitae.</Text>
            </View>
            <View style={styles.modelthick} />
            <Text style={styles.titlespeaker}>Speakers</Text>
            <FlatList
            data={Speakers}
            renderItem={renderspeaker}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatListContent}
            horizontal={true}
            />
            {showImage ? (
              <View >
                <Text style={styles.qrText}>Ticket</Text>
                <Text style={styles.qrtext1}>Scan to view details</Text>
                <Image source={require('../assests/qrcode.png')} style={styles.Qrcode} />
                </View>
            ) : (
              <Text style={styles.description1}>Lorem ipsum dolor sit amet consectetur.
               Quisque scelerisque sit nunc lorem eu elementum.</Text>
            )}


            </ScrollView>
          )}
        </View>
      </Modal>
        <FlatList
                data={DATA}
                renderItem={renderitem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatListContent}
        />
        </ScrollView>
      ) : (
        <View>
          <Text style={styles.title}>No Events Found</Text>
          </View>
      )}


<Modal
        animationType="fade"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={closeImageAlert}
      >
        <View>
        <Pressable onPress={closeImageAlert} >
          <View style={styles.PRess}/>
          </Pressable>
          <View style={styles.imageModalView}>
          <Image
            source={require('../assests/Check.png')}
            style={styles.image3}
          />
           <Text style={styles.payment}>Reservation Confirmed</Text>
            <Text style={styles.email}>We're thrilled to have you join us. 
                Your reservation is confirmed, and we look forward to welcoming you soon.</Text>
                <View>
                <Text style={styles.google}>Google Cloud Next 2024 Conference</Text>
                <View style={styles.date1}>
                <Text style={styles.email1}>28th August 2024</Text>
                <Text style={styles.email1}>Nairobi, Kenya</Text>
                </View>
                </View>
                </View>
                <Pressable onPress={closeImageAlert} >
          <View style={styles.PRess}/>
          </Pressable>
        </View>
      </Modal>

    </View>);
};
export default Event;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: '#CBD5E1',
  },
  firsttab: {
    height: height * 0.06, // 6% of screen height
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  button: {
    height: height * 0.03, // 3% of screen height
    width: width * 0.22, // 22% of screen width
    borderRadius: 50,
    borderWidth: 1,
    alignSelf: 'center',
    marginLeft: width * 0.04, // 4% of screen width
    borderColor: '#CBD5E1',
  },
  buttontext: {
    alignSelf: 'center',
    color: '#64748B',
  },
  modelthick: {
    height: height * 0.01, // 1% of screen height
    width: '100%',
    backgroundColor: '#CBD5E1',
  },
  flatListContent: {
    paddingBottom: height * 0.02, // 2% of screen height
  },
  title: {
    color: 'black',
    fontFamily: 'inter',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: '600',
    marginLeft: width * 0.06, // 6% of screen width
    marginTop: height * 0.02, // 2% of screen height
  },
  location: {
    color: '#0966C3',
    fontFamily: 'inter',
    fontSize: width * 0.03, // 3% of screen width
    fontWeight: '400',
    marginLeft: width * 0.05, // 5% of screen width
  },
  date: {
    color: '#64748B',
    fontFamily: 'inter',
    fontSize: width * 0.03, // 3% of screen width
    fontWeight: '400',
  },
  image: {
    height: height * 0.35, // 35% of screen height
    width: '100%',
    resizeMode: 'center',
    paddingTop: height * 0.02, // 2% of screen height
  },
  dateandlocation: {
    flexDirection: 'row',
    paddingLeft: width * 0.06, // 6% of screen width
    marginVertical: height * 0.01, // 2% of screen height
  },
  activeButton: {
    backgroundColor: '#0966C3',
    color: 'white',
  },
  activeText: {
    color: 'white',
  },
  imagebutton: {
    height: height * 0.05, // 5% of screen height
    width: width * 0.26, // 26% of screen width
    backgroundColor: '#0966C3',
    borderRadius: 50,
    alignSelf: 'flex-end',
    right: width * 0.03, // 3% of screen width
  },
  imagebuttonText: {
    color: 'white',
    fontSize: width * 0.035, // 3.5% of screen width
    padding: 5,
    alignSelf: 'center',
    fontWeight: '700',
    fontFamily: 'inter',
  },
  modalContent: {
    backgroundColor: 'white',
    flex: 1,
  },
  firsttab1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: width * 0.06, // 6% of screen width
    height: height * 0.05, // 5% of screen height
    width: '100%',
  },
  title1: {
    color: '#1E293B',
    fontFamily: 'inter',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: '600',
    paddingLeft: width * 0.06, // 6% of screen width
  },
  ModalImage: {
    height: height * 0.25, // 25% of screen height
    width: '100%',
  },
  ModalTitle: {
    color: '#1E293B',
    fontFamily: 'inter',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: '600',
  },
  line1: {
    height: 2,
    width: '85%',
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
  },
  priceText: {
    color: '#64748B',
    fontSize: width * 0.03, // 3% of screen width
    fontWeight: '500',
    fontFamily: 'inter',
    marginBottom: height * 0.01, // 1% of screen height
  },
  price: {
    color: '#0966C3',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: '700',
    fontFamily: 'inter',
  },
  RSVP: {
    height: height * 0.05, // 5% of screen height
    width: width * 0.4, // 40% of screen width
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#0966C3',
  },
  RSVPTEXT: {
    color: '#FFFFFF',
    fontSize: width * 0.035, // 3.5% of screen width
    fontWeight: '600',
    fontFamily: 'inter',
    alignSelf: 'center',
  },
  share: {
    height: height * 0.05, // 5% of screen height
    width: height * 0.05, // 5% of screen height
    borderWidth: 1,
    borderColor: '#0966C3',
    justifyContent: 'center',
  },
  RSVPTAB: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: height * 0.02, // 2% of screen height
  },
  description: {
    fontFamily: 'inter',
    fontSize: width * 0.03, // 3% of screen width
    fontWeight: '400',
    color: '#64748B',
    paddingHorizontal: width * 0.06, // 6% of screen width
    paddingVertical: height * 0.02, // 2% of screen height
    paddingBottom: height * 0.03, // 3% of screen height
  },
  speakerimage: {
    height: height * 0.1, // 10% of screen height
    width: width * 0.2, // 20% of screen width
    resizeMode: 'center',
  },
  speakername: {
    fontSize: width * 0.03, // 3% of screen width
    fontWeight: '400',
    fontFamily: 'inter',
    color: '#64748B',
    alignSelf: 'center',
  },
  speaker: {
    marginLeft: width * 0.06, // 6% of screen width
  },
  titlespeaker: {
    color: 'black',
    fontFamily: 'inter',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: '600',
    marginLeft: width * 0.06, // 6% of screen width
    marginVertical: height * 0.02, // 2% of screen height
  },
  description1: {
    fontFamily: 'inter',
    fontSize: width * 0.03, // 3% of screen width
    fontWeight: '400',
    color: '#64748B',
    paddingHorizontal: width * 0.06, // 6% of screen width
    paddingBottom: height * 0.03, // 3% of screen height
  },
  imageModalView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: height * 0.4, // 40% of screen height
    width: width , // 90% of screen width
  },
  image3: {
    width: height * 0.12, // 12% of screen height
    height: height * 0.12, // 12% of screen height
    borderRadius: 100,
    marginBottom: height * 0.02, // 2% of screen height
  },
  imageText: {
    color: 'white',
    fontSize: width * 0.04, // 4% of screen width
  },
  payment: {
    fontSize: width * 0.05, // 5% of screen width
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'inter',
    fontWeight: '500',
  },
  email: {
    alignSelf: 'center',
    marginBottom: height * 0.02, // 2% of screen height
    marginHorizontal: width * 0.2, // 20% of screen width
    color: '#64748B',
    fontFamily: 'inter',
    fontWeight: '500',
    fontSize: width * 0.03, // 3% of screen width
  },
  sidebar: {
    backgroundColor: 'white',
  },
  google: {
    fontSize: width * 0.04, // 4% of screen width
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'inter',
    fontWeight: '500',
    marginTop: height * 0.02, // 2% of screen height
  },
  date1: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  email1: {
    alignSelf: 'center',
    marginBottom: height * 0.02, // 2% of screen height
    marginLeft: width * 0.05, // 5% of screen width
    color: '#64748B',
    fontFamily: 'inter',
    fontWeight: '500',
    fontSize: width * 0.03, // 3% of screen width
  },
  PRess: {
    height: height * 0.25, // 25% of screen height
    width: width , // 90% of screen width
  },
  qrText: {
    fontSize: width * 0.04, // 4% of screen width
    fontFamily: 'inter',
    fontWeight: '600',
    color: 'black',
    marginLeft: width * 0.06, // 6% of screen width
  },
  qrtext1: {
    fontSize: width * 0.03, // 3% of screen width
    fontFamily: 'inter',
    fontWeight: '400',
    color: '#64748B',
    marginLeft: width * 0.06, // 6% of screen width
  },
  Qrcode: {
    height: height * 0.12, // 12% of screen height
    width: width * 0.85, // 85% of screen width
    alignSelf: 'center',
  },
  SecondButton: {
    backgroundColor: '#09C33D',
    height: height * 0.05, // 5% of screen height
    width: width * 0.7, // 70% of screen width
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },


});

