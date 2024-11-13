import React,{useState} from 'react';
import { Text ,View , ScrollView , Pressable , StyleSheet ,TextInput,Image,FlatList,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

const Message = ({navigation}) =>{
    const [activeButton, setActiveButton] = useState('AllMessage');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectProfile, setSelectProfile] = useState(null);
    const message = 'Lorem ipsum dolor sit amet consectetur.';
    const rightMessage = 'Lorem ipsum dolor sit amet consecteturSapien non risus lacus elit';

    // Create an array of messages for alternating display
    const chatMessages = Array(5).fill({ left: message, right: rightMessage });
    // Static time for all messages
    const staticTime = '11:03 AM';

    const handleOpen = (membership) => {
        setSelectProfile(membership);
        setModalVisible(true);
    };

    const handleClose = () => {
        setSelectProfile(null);
        setModalVisible(false);
    };

    const handleButtonPress = (button) => {
        setActiveButton(button);
      };
      const Chats = [{
        id: 1,
        name: 'Novák Réka',
        title: 'Lorem ipsum dolor sit amet consectetur.',
        image:require('../assests/chat1.png'),
        date: 'Jun 8',
        role:'Accountant',
      },
      {
        id: 2,
        name: 'Szekeres Dalma',
        title: 'Lorem ipsum dolor sit amet consectetur.',
        image:require('../assests/chat2.png'),
        date: 'Jun 12',
        role:'Accountant',
      },
      {
        id: 3,
        name: 'Surány Izabella',
        title: 'Lorem ipsum dolor sit amet consectetur.',
        image:require('../assests/chat3.png'),
        date: 'May 12',
        role:'Accountant',
      },
      {
        id: 4,
        name: 'Takács Bianka',
        title: 'Lorem ipsum dolor sit amet consectetur.',
        image:require('../assests/chat4.png'),
        date: 'May 18',
        role:'Accountant',
      },
      {
        id: 5,
        name: 'Molnár Fruzsina',
        title: 'Lorem ipsum dolor sit amet consectetur.',
        image:require('../assests/chat10.png'),
        date: 'May 20',
        role:'Accountant',
      },
      {
        id: 6,
        name: 'Halász Emese',
        title: 'Lorem ipsum dolor sit amet consectetur.',
        image:require('../assests/chat5.png'),
        date: 'Apr 10',
        role:'Accountant',
      },
      {
        id: 7,
        name: 'Dudás Nikolett',
        title: 'Lorem ipsum dolor sit amet consectetur.',
        image:require('../assests/chat6.png'),
        date: 'Apr 16',
        role:'Accountant',
      },
      {
        id: 8,
        name: 'László Barbara',
        title: 'Lorem ipsum dolor sit amet consectetur.',
        image:require('../assests/chat7.png'),
        date: 'Apr 20',
        role:'Accountant',
      },
      {
        id: 9,
        name: 'Leandro Trossard',
        title: 'Lorem ipsum dolor sit amet consectetur.',
        image:require('../assests/chat10.png'),
        date: 'Jan 20, 2020',
        role:'Accountant',
      },
      {
        id: 10,
        name: 'Molnár Fruzsina',
        title: 'Lorem ipsum dolor sit amet consectetur.',
        image:require('../assests/chat8.png'),
        date: 'Jan 30, 2020',
        role:'Accountant',
      },
      {
        id: 11,
        name: 'Surány Izabella',
        title: 'Lorem ipsum dolor sit amet consectetur.',
        image:require('../assests/chat9.png'),
        date: 'Jan 21, 2020',
        role:'Accountant',
      },
      {
        id: 12,
        name: 'Alex Linetsed',
        title: 'Lorem ipsum dolor sit amet consectetur.',
        image:require('../assests/speaker1.png'),
        date: 'Jan 20, 2020',
        role:'Accountant',
          },
    ];

  const  renderItem = ({item}) =>(

    <Pressable onPress={() => handleOpen(item)}>
        <View style={styles.chatcontainer}>
            <View style={styles.chat}>
            <View>
                <Image source={item.image} style={styles.profilepic}/>
            </View>
            <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.Chattitle}>{item.title}</Text>
            </View>
            </View>
            <View>
                <Text style={styles.date}>{item.date}</Text>
            </View>
        </View>
        </Pressable>
    );
    return(
        <View style={styles.container}>
             <View style={styles.modelcommentbar}>
             <Icon name="arrowleft" size={22} color="#64748B"  style={styles.icon} onPress={()=>navigation.goBack()}/>
             <TextInput placeholder="Search Messages" placeholderTextColor="#64748B" style={styles.modelTextInput}/>
      </View>
      <View style={styles.line}/>
      <View style={styles.messagebar}>
      <Pressable style={[styles.button,activeButton === 'AllMessage' ? styles.activeButton : styles.inactiveButton]}
            onPress={() => handleButtonPress('AllMessage')}>
                <Text style={[styles.buttontext, activeButton === 'AllMessage' ? styles.activeText : styles.inactiveText]}>All Messages</Text>
            </Pressable>
            <Pressable style={[styles.button,activeButton === 'Unread' ? styles.activeButton : styles.inactiveButton]}
            onPress={() => handleButtonPress('Unread')}>
                <Text style={[styles.buttontext, activeButton === 'Unread' ? styles.activeText : styles.inactiveText]}>Unread</Text>
            </Pressable>
            <Pressable style={[styles.button,activeButton === 'Drafts' ? styles.activeButton : styles.inactiveButton]}
            onPress={() => handleButtonPress('Drafts')}>
                <Text style={[styles.buttontext, activeButton === 'Drafts' ? styles.activeText : styles.inactiveText]}>Drafts</Text>
            </Pressable>

      </View>
      <View style={styles.thick}/>
      <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleClose}
            >
                <View style={styles.container}>
                {selectProfile && (
                    <View>
                    <View style={styles.modelcommentbar}>
                    <Icon name="arrowleft" size={22} color="#64748B"  style={styles.icon} onPress={handleClose}/>
                    <Image source={selectProfile.image} style={styles.modalimage} />
                    <View>
                    <Text style={styles.name}>{selectProfile.name}</Text>
                    <Text style={styles.Chattitle}>{selectProfile.role}</Text>
                    </View>
             </View>

             <View style={styles.thick} />
             <ScrollView style={styles.ScrollView}>
             {chatMessages.map((msg, index) => (
        <View key={index}>
          {/* Left Chat Bubble */}
          <View style={styles.reciver}>
            <View style={styles.recivermesagetab}>
            <Text style={styles.recivermesage}>{msg.left}</Text>
            </View >
            <View style={styles.timetab}>
            <Text style={styles.time}>{staticTime}</Text>
            </View>
          </View>
          {/* Right Chat Bubble */}
          <View style={styles.sender}>
            <View style={styles.sendertab}>
            <Text style={styles.sendermessgae}>{msg.right}</Text>
            </View>
            <View style={styles.timetab}>
            <Text style={styles.sendertime}>{staticTime}</Text>
            </View>
          </View>
        </View>
      ))}


             </ScrollView>
             </View>
                )}
                 </View>
                <View style={styles.thick} />
                 <View style={styles.modelcommentbar1}>
        <TextInput placeholder="Write a message..." placeholderTextColor="#64748B" style={styles.modelTextInput1}/>
        <Icon3 name="send-sharp" size={22} color="#0966C3"  style={styles.icon1}/>
      </View>
               </Modal>

      {(()=>{
        if(activeButton === 'AllMessage'){
            return<View style={styles.container}>
            <ScrollView>
             <FlatList
            data={Chats}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            />

        </ScrollView>
        <Pressable  style={styles.newchat} >
          <Icon2 color="white" size={24} name="edit"/>
          </Pressable>
        </View>;
        }else if(activeButton === 'Unread'){
            return <Text style={styles.title}>Unread message</Text>;
        }
        else {
            return <Text style={styles.title}>Draft tab</Text>;
        }
      })()}

        </View>
    );
};
export default Message;

const  styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
    },
    modelTextInput:{
        width:271,
        justifyContent:'center',
        alignSelf:'center',
        alignContent:'center',
        marginVertical:10,
        borderColor:'#CBD5E1',
        borderRadius:5,
        height:36,
        paddingLeft:20,
        color:'black',
        backgroundColor:'#F1F5F9',
        marginLeft:20,
    },
    modelcommentbar:{
      flexDirection:'row',
      paddingHorizontal:20,
      backgroundColor:'white',
      height:48,
      alignItems:'center',
    },
    icon:{
        alignSelf:'center',

      },
      line:{
        backgroundColor:'#E2E8F0',
        height:1,
        width:'100%',
      },
      thick:{
        height:5,
        width:'100%',
        backgroundColor:'#E2E8F0',
      },
      messagebar:{
        height:42,
        width: '100%',
        flexDirection:'row',
        backgroundColor:'white',
      },
      button:{
        height:24,
        paddingHorizontal:10,
        borderRadius:50,
        borderWidth:1,
        alignSelf:'center',
        marginLeft:15,
        borderColor:'#CBD5E1',
      },
      buttontext:{
        alignSelf:'center',
        color:'#64748B',
      },
      activeButton: {
        backgroundColor: '#0966C3',
        color:'white',
      },
      activeText:{
        color:'white',
      },
      title:{
        color:'black',
        fontFamily:'inter',
        fontSize:14,
        fontWeight:'600',
        marginLeft:24,
        marginTop:10,
      },
      profilepic:{
        height:35,
        width:35,
        resizeMode:'center',
      },
      chatcontainer:{
        flexDirection:'row',
        marginHorizontal:20,
        marginTop:12,
        borderBottomWidth:1,
        paddingBottom:12,
        borderColor:'#CBD5E1',
        justifyContent:'space-between',
      },
      Chattitle:{
        fontFamily:'inter',
        fontSize:12,
        color:'#64748B',
        fontWeight:'500',
        marginLeft:8,

      },
      date:{
        fontFamily:'inter',
        fontSize:12,
        color:'#1E293B',
        fontWeight:'400',
      },
      name:{
        fontFamily:'inter',
        fontSize:14,
        color:'#1E293B',
        fontWeight:'500',
        marginLeft:8,

      },
      chat:{
        flexDirection:'row',
      },
      modalimage:{
        height:35,
        width:35,
        marginLeft:25,
      },
      modelcommentbar1:{
        flexDirection:'row',
        paddingHorizontal:24,
        backgroundColor:'white',
      },
      modelTextInput1:{
        width:271,
        justifyContent:'center',
        alignSelf:'center',
        alignContent:'center',
        marginVertical:10,
        borderColor:'#CBD5E1',
        borderRadius:5,
        height:36,
        paddingLeft:20,
        color:'black',
        backgroundColor:'#F1F5F9',
    },
    icon1:{
        alignSelf:'center',
        marginLeft:20,
      },
      ScrollView:{
        height:'92%',
        backgroundColor:'white',
        width:'100%',
        padding:20,
      },
      reciver:{
        padding:10,
         width:281,
         backgroundColor:'#0966C3',
         borderRadius:10,
         flexDirection:'row',
         marginBottom:10,
      },
      time:{
        fontSize:10,
        fontFamily:'inter',
        fontWeight:'400',
        margingleft:30,

      },
      timetab:{
        justifyContent:'flex-end',
        marginLeft:20,
      },
      recivermesagetab:{
        width:185,
      },
      recivermesage:{
        fontSize:14,
        fontFamily:'inter',
        fontWeight:'500',

      },
      sender:{
        backgroundColor:'#F1F5F9',
        width:281,
        borderRadius:10,
        alignSelf:'flex-end',
        padding:10,
        marginBottom:10,
      },
      sendermessgae:{
        color:'#64748B',
        fontSize:14,
        fontFamily:'inter',
        fontWeight:'500',
        textAlign:'right',
      },
      sendertab:{},
      sendertimetab:{},
      sendertime:{
        color:'#64748B',
        fontSize:10,
        fontFamily:'inter',
        fontWeight:'400',
        textAlign:'right',
        marginTop:5,
      },
      leftBubble: {
        backgroundColor: '#d1f1d1',
        borderRadius: 15,
        padding: 10,
        marginVertical: 5,
        alignSelf: 'flex-start',
        maxWidth: '80%',
      },
      rightBubble: {
        backgroundColor: '#a1c3f1',
        borderRadius: 15,
        padding: 10,
        marginVertical: 5,
        alignSelf: 'flex-end',
        maxWidth: '80%',
      },
      leftText: {
        color: '#000',
      },
      rightText: {
        color: '#000',
      },
      // time: {
      //   fontSize: 10,
      //   color: '#555',
      //   marginTop: 5,
      //   alignSelf: 'flex-end',
      // },
      newchat:{
        position:'absolute',
        bottom:60,
        right:20,
        height:50,
        width:50,
        backgroundColor:'#0966C3',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100,
      },
});
