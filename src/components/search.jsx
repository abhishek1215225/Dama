import React,{useState} from 'react';
import { Text ,View , ScrollView , Pressable , StyleSheet ,TextInput,Image,FlatList,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');

// Helper function to scale the font size based on screen width
const scaleFontSize = (size) => (width / 375) * size;


const Search = ({navigation}) =>{

    const Blog = [
        {
        id:1,
        title:'Preview of Finance Bill 2024 ',
        subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
        image: require('../assests/blogs.png'),
    },
    {
        id:2,
        title:'Preview of Finance Bill 2024',
        subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
        image: require('../assests/blogs.png'),
    },
    {
        id:3,
        title:'Preview of Finance Bill 2024',
        subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
        image: require('../assests/blogs.png'),
    },
    {
        id:4,
        title:'Preview of Finance Bill 2024',
        subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
        image: require('../assests/blogs.png'),
    },
    {
        id:5,
        title:'Preview of Finance Bill 2024',
        subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
        image: require('../assests/blogs.png'),
    },
    {
        id:6,
        title:'Preview of Finance Bill 2024',
        subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
        image: require('../assests/blogs.png'),
    },
    {
        id:7,
        title:'Preview of Finance Bill 2024',
        subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
        image: require('../assests/blogs.png'),
    },
    {
        id:8,
        title:'Preview of Finance Bill 2024',
        subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
        image: require('../assests/blogs.png'),
    },
    {
        id:9,
        title:'Preview of Finance Bill 2024',
        subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
        image: require('../assests/blogs.png'),
    },
];

    const News = [
        {
            id:1,
            title:'What next ? Finance Bill 2024',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/newses.png'),
        },
        {
            id:2,
            title:'What next ? Finance Bill 2024',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/newses.png'),
        },
        {
            id:3,
            title:'What next ? Finance Bill 2024',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/newses.png'),
        },
        {
            id:4,
            title:'What next ? Finance Bill 2024',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/newses.png'),
        },
        {
            id:5,
            title:'What next ? Finance Bill 2024',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/newses.png'),
        },
        {
            id:6,
            title:'What next ? Finance Bill 2024',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/newses.png'),
        },
        {
            id:7,
            title:'What next ? Finance Bill 2024',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/newses.png'),
        },
        {
            id:8,
            title:'What next ? Finance Bill 2024',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/newses.png'),
        },
        {
            id:9,
            title:'What next ? Finance Bill 2024',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/newses.png'),
        },
    ];

    const Resource = [
        {
            id:1,
            title:'Finance Bill 2024 Draft PDF ',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/resources.png'),
        },
        {
            id:2,
            title:'Amended Finance Bill 2024',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/resources.png'),
        },
        {
            id:3,
            title:'Finance Bill Section 3',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/resources.png'),
        },
        {
            id:4,
            title:'Finance Bill 2024 Draft PDF',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/resources.png'),
        },
        {
            id:5,
            title:'Amended Finance Bill 2024',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/resources.png'),
        },
        {
            id:6,
            title:'Finance Bill Section 3',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/resources.png'),
        },
        {
            id:7,
            title:'Finance Bill 2024 Draft PDF',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/resources.png'),
        },
        {
            id:8,
            title:'Amended Finance Bill 2024',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/resources.png'),
        },
        {
            id:9,
            title:'Amended Finance Bill 2024',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/resources.png'),
        },
    ];

    const Events = [
        {
            id:1,
            title:'World Economics and Finance Conference ',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/eventpage1.png'),
        },
        {
            id:2,
            title:'Google Cloud Next 2024 Conference',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/eventpage2.png'),
        },
        {
            id:3,
            title:'Google Cloud Next 2024 Conference',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/eventpage3.png'),
        },
        {
            id:4,
            title:'World Economics and Finance Conference ',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/eventpage1.png'),
        },
        {
            id:5,
            title:'Google Cloud Next 2024 Conference',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/eventpage2.png'),
        },
        {
            id:6,
            title:'Google Cloud Next 2024 Conference',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/eventpage3.png'),
        },
        {
            id:7,
            title:'World Economics and Finance Conference ',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/eventpage1.png'),
        },
        {
            id:8,
            title:'Google Cloud Next 2024 Conference',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/eventpage2.png'),
        },
        {
            id:9,
            title:'Google Cloud Next 2024 Conference',
            subtitle:'Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec.',
            image: require('../assests/eventpage3.png'),
        },
    ];

    const People = [
        {
            id:1,
            name:'Finance Bill Novák',
            profession:'Professor of Maths',
            image: require('../assests/chat1.png'),
        },
        {
            id:2,
            name:'Finance Bill Novák',
            profession:'Accountant',
            image: require('../assests/profile.png'),
        },
        {
            id:3,
            name:'Finance Bill Novák',
            profession:'Professor A',
            image: require('../assests/chat6.png'),
        },
        {
            id:4,
            name:'Finance Bill Novák',
            profession:'Professor B',
            image: require('../assests/chat8.png'),
        },
        {
            id:5,
            name:'Finance Bill Novák',
            profession:'Professor C',
            image: require('../assests/chat5.png'),
        },
        {
            id:6,
            name:'Finance Bill Novák',
            profession:'Professor  D',
            image: require('../assests/chat6.png'),
        },
    ];

    const slicedBlog = Blog.slice(0, 3);
    const slicedNews = News.slice(0, 3);
    const slicedResource = Resource.slice(0, 3);
    const slicedPeople = People.slice(0, 3);
    const slicedEvents = Events.slice(0, 4);
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonPress = (button) => {
        setActiveButton(button);
      };

      const rendercontent = () =>{
        if (activeButton === null) {
            return  <ScrollView>
            <View style={styles.flatlistscontainer}>
                <Text style={styles.title1}>Blogs</Text>
                <FlatList
                data={slicedBlog}
                renderItem={renderBlog}
                keyExtractor={(item) => item.id.toString()}
                />
                <View style={styles.line4} />
                <Pressable style={styles.pressable} onPress={() => setActiveButton('Blogs')}>
                    <Text style={styles.pressabletext}>See All Results</Text>
                </Pressable>
                <View style={styles.thickmodal}/>
                 </View>

                 {/* news FlatList */}

                                    <View>
                <Text style={styles.title1}>News</Text>
                <FlatList
                data={slicedNews}
                renderItem={renderNews}
                keyExtractor={(item) => item.id.toString()}
                />
                <View style={styles.line4} />
                <Pressable style={styles.pressable} onPress={() => setActiveButton('News')}>
                    <Text style={styles.pressabletext}>See All Results</Text>
                </Pressable>
                <View style={styles.thickmodal}/>
                 </View>

                  {/* resources FlatList */}

                  <View>
                <Text style={styles.title1}>Resource</Text>
                <FlatList
                data={slicedResource}
                renderItem={renderResources}
                keyExtractor={(item) => item.id.toString()}
                />
                <View style={styles.line4} />
                <Pressable style={styles.pressable} onPress={() => setActiveButton('Resources')}>
                    <Text style={styles.pressabletext}>See All Results</Text>
                </Pressable>
                <View style={styles.thickmodal}/>
                 </View>

                   {/* Events FlatList */}

                   <View>
                <Text style={styles.title1}>Events</Text>
                <FlatList
                data={slicedEvents}
                renderItem={renderEvents}
                keyExtractor={(item) => item.id.toString()}
                />
                <View style={styles.line4} />
                <Pressable style={styles.pressable} onPress={() => setActiveButton('Events')}>
                    <Text style={styles.pressabletext}>See All Results</Text>
                </Pressable>
                <View style={styles.thickmodal}/>
                 </View>

                                       {/* people FlatList */}

                                       <View>
                <Text style={styles.title1}>People</Text>
                <FlatList
                data={slicedPeople}
                renderItem={renderPeople}
                keyExtractor={(item) => item.id.toString()}
                />
                <View style={styles.line4} />
                <Pressable style={styles.pressable} onPress={() => setActiveButton('People')}>
                    <Text style={styles.pressabletext}>See All Results</Text>
                </Pressable>
                <View style={styles.thickmodal}/>
                 </View>


        </ScrollView>;
          } else if (activeButton === 'Blogs') {
            return  <View style={styles.flatlistscontainer}>
            <Text style={styles.title1}>Blogs</Text>
            <FlatList
            data={Blog}
            renderItem={renderBlog}
            keyExtractor={(item) => item.id.toString()}
            />
            <View style={styles.line4} />
            <View style={styles.thickmodal}/>
             </View>;
          } else if (activeButton === 'News') {
            return   <View>
            <Text style={styles.title1}>News</Text>
            <FlatList
            data={News}
            renderItem={renderNews}
            keyExtractor={(item) => item.id.toString()}
            />

             </View>
;
          } else if (activeButton === 'Resources') {
            return  <View>
            <Text style={styles.title1}>Resource</Text>
            <FlatList
            data={Resource}
            renderItem={renderResources}
            keyExtractor={(item) => item.id.toString()}
            />
            <View style={styles.line4} />
            <View style={styles.thickmodal}/>
             </View>;
          } else if (activeButton === 'Events') {
            return <View>
            <Text style={styles.title1}>Events</Text>
            <FlatList
            data={Events}
            renderItem={renderEvents}
            keyExtractor={(item) => item.id.toString()}
            />
             </View>;
          } else if (activeButton === 'People') {
            return  <View>
            <Text style={styles.title1}>People</Text>
            <FlatList
            data={People}
            renderItem={renderPeople}
            keyExtractor={(item) => item.id.toString()}
            />
             </View>;
          }
      };


    const renderBlog = ({item}) => (
            <View style={styles.blogcontainer}>
                <View>
                    <Image source={item.image} style={styles.blogimage}/>
                </View>
                <View>
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.subtitle} numberOfLines={2}>{item.subtitle}</Text>
                </View>
            </View>
    );

    const renderNews = ({item}) => (
        <View style={styles.blogcontainer}>
            <View>
                <Image source={item.image} style={styles.blogimage}/>
            </View>
            <View>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.subtitle} numberOfLines={2}>{item.subtitle}</Text>
            </View>
        </View>
);

const renderResources = ({item}) => (
    <View style={styles.blogcontainer}>
        <View>
            <Image source={item.image} style={styles.blogimage}/>
        </View>
        <View>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.subtitle} numberOfLines={2}>{item.subtitle}</Text>
        </View>
    </View>
);
const renderEvents = ({item}) => (
    <View style={styles.blogcontainer}>
        <View>
            <Image source={item.image} style={styles.blogimage}/>
        </View>
        <View>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.subtitle} numberOfLines={2}>{item.subtitle}</Text>
        </View>
    </View>
);
const renderPeople = ({item}) => (
    <View style={styles.Peoplecontainer}>
        <View>
            <Image source={item.image} style={styles.Peopleimage}/>
        </View>
        <View>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.profession} numberOfLines={2}>{item.profession}</Text>
        </View>
    </View>
);




return(
    <View style={styles.container2}>
          <View style={styles.firsttab1}>
            <Icon name="arrowleft" size={24} color="#64748B" onPress={()=> navigation.navigate('Home')} />
            <TextInput style={styles.TextInput} placeholder="Search" placeholderTextColor="#64748B" />
          </View>
          <View style={styles.line3} />
          <View style={styles.thirdtab}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.presstab}>
              <Pressable style={[styles.press, activeButton === 'Blogs' ? styles.activeButton : styles.inactiveButton]}
              onPress={() => handleButtonPress('Blogs')}>
                <Text style={[styles.presstext, activeButton === 'Blogs' ? styles.activeText : styles.inactiveText]}>Blogs</Text>
              </Pressable >
              <Pressable style={[styles.press2, activeButton === 'News' ? styles.activeButton : styles.inactiveButton]}
              onPress={() => handleButtonPress('News')}>
                <Text style={[styles.presstext, activeButton === 'News' ? styles.activeText : styles.inactiveText]}>News</Text>
              </Pressable>
              <Pressable style={[styles.press3, activeButton === 'Resources' ? styles.activeButton : styles.inactiveButton]}
              onPress={() => handleButtonPress('Resources')}>
                <Text style={[styles.presstext, activeButton === 'Resources' ? styles.activeText : styles.inactiveText]}>Resources</Text>
              </Pressable>
              <Pressable style={[styles.press4, activeButton === 'Events' ? styles.activeButton : styles.inactiveButton]}
              onPress={() => handleButtonPress('Events')}>
                <Text style={[styles.presstext, activeButton === 'Events' ? styles.activeText : styles.inactiveText]}>Events</Text>
              </Pressable>
              <Pressable style={[styles.press5, activeButton === 'People' ? styles.activeButton : styles.inactiveButton]}
              onPress={() => handleButtonPress('People')}>
                <Text style={[styles.presstext, activeButton === 'People' ? styles.activeText : styles.inactiveText]}>People</Text>
              </Pressable>
              </View>

            </ScrollView>
            </View>
            <View style={styles.thickmodal} />
            <ScrollView >
                {rendercontent()}
            </ScrollView>


          </View>
);
};
export default Search;

const  styles = StyleSheet.create({
    container2: {
        flex: 1,
        backgroundColor: 'white',
      },
      firsttab1: {
        flexDirection: 'row',
        height: height * 0.06, // 6% of the screen height
        alignItems: 'center',
        paddingLeft: width * 0.05, // 5% of the screen width
        backgroundColor: 'white',
      },
      TextInput: {
        height: height * 0.05, // 5% of the screen height
        width: width * 0.72, // 72% of the screen width
        backgroundColor: '#CBD5E1',
        alignItems: 'center',
        marginLeft: width * 0.04, // 4% margin left
        color: 'black',
        paddingHorizontal: width * 0.04, // 4% padding
        borderRadius: 5,
      },
      line3: {
        height: 2,
        backgroundColor: '#cbd5e1',
        width: '100%',
      },
      presstab: {
        flexDirection: 'row',
        marginVertical: height * 0.02, // 2% of the screen height
      },
      press: {
        borderWidth: 1,
        borderColor: '#64748B',
        borderRadius: 50,
        height: height * 0.04, // 4% of the screen height
        marginLeft: width * 0.04, // 4% margin left
        width: width * 0.15, // 15% of the screen width
        justifyContent: 'center',
        alignItems: 'center',
      },
      presstext: {
        color: '#64748B',
        fontFamily: 'inter',
        fontWeight: '400',
        fontSize: scaleFontSize(12), // Scaled font size
        alignSelf: 'center',
      },
      activeButton: {
        backgroundColor: '#0966C3',
        color: 'white',
      },
      activeText: {
        color: 'white',
      },
      press2: {
        borderWidth: 1,
        borderColor: '#64748B',
        borderRadius: 50,
        height: height * 0.04,
        marginLeft: width * 0.04,
        width: width * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      press3: {
        borderWidth: 1,
        borderColor: '#64748B',
        borderRadius: 50,
        height: height * 0.04,
        marginLeft: width * 0.04,
        width: width * 0.22,
        justifyContent: 'center',
        alignItems: 'center',
      },
      press4: {
        borderWidth: 1,
        borderColor: '#64748B',
        borderRadius: 50,
        height: height * 0.04,
        marginLeft: width * 0.04,
        width: width * 0.17,
        justifyContent: 'center',
        alignItems: 'center',
      },
      press5: {
        borderWidth: 1,
        borderColor: '#64748B',
        borderRadius: 50,
        height: height * 0.04,
        marginLeft: width * 0.04,
        width: width * 0.17,
        justifyContent: 'center',
        alignItems: 'center',
      },
      thickmodal: {
        width: '100%',
        height: height * 0.02, // 2% of screen height
        backgroundColor: '#E2E8F0',
      },
      blogcontainer: {
        height: height * 0.08, // 8% of screen height
        width: width * 0.83, // 83% of screen width
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginVertical: height * 0.01, // 1% of screen height
      },
      blogimage: {
        height: height * 0.08, // 8% of screen height
        width: width * 0.18, // 18% of screen width
      },
      title: {
        fontSize: scaleFontSize(16), // Scaled font size
        fontFamily: 'inter',
        fontWeight: '500',
        color: '#1E293B',
        marginLeft: width * 0.03, // 3% of screen width
        width: width * 0.6, // 60% of screen width
      },
      subtitle: {
        fontSize: scaleFontSize(12), // Scaled font size
        fontFamily: 'inter',
        fontWeight: '400',
        color: '#64748B',
        marginLeft: width * 0.03, // 3% of screen width
        width: width * 0.6,
      },
      title1: {
        fontSize: scaleFontSize(16), // Scaled font size
        fontFamily: 'inter',
        fontWeight: '500',
        color: '#1E293B',
        marginLeft: width * 0.07, // 7% of screen width
        marginVertical: height * 0.02, // 2% of screen height
      },
      line4: {
        height: 2,
        backgroundColor: '#cbd5e1',
        width: '100%',
        marginVertical: height * 0.02, // 2% of screen height
      },
      pressable: {
        width: '100%',
        height: height * 0.04, // 4% of screen height
      },
      pressabletext: {
        color: '#64748B',
        alignSelf: 'center',
      },
      Peopleimage: {
        height: height * 0.05, // 5% of screen height
        width: width * 0.1, // 10% of screen width
      },
      name: {
        fontSize: scaleFontSize(14), // Scaled font size
        fontFamily: 'inter',
        fontWeight: '400',
        color: '#1E293B',
        marginLeft: width * 0.03, // 3% of screen width
      },
      profession: {
        fontSize: scaleFontSize(12), // Scaled font size
        fontFamily: 'inter',
        fontWeight: '400',
        color: '#475569',
        marginLeft: width * 0.03, // 3% of screen width
      },
      Peoplecontainer: {
        flexDirection: 'row',
        marginVertical: height * 0.02, // 2% of screen height
        marginLeft: width * 0.06, // 6% of screen width
      },

});
