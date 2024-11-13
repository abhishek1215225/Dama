import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, Image, FlatList, ImageBackground, Modal , ScrollView ,Dimensions} from 'react-native';
import Topbar from '../components/Topbar';
import { AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');

const DATA = [
  {
    id: 1,
    title: 'Dare To Create: Ditch The Competitive Life To Lead A Creative Life',
    price: 'KES 1,500',
    image: require('../assests/resources1.png'),
    backgroundimage: require('../assests/background1.png'),
  },
  {
    id: 2,
    title: 'Dare To Create: Ditch The Competitive Life To Lead A Creative Life',
    price: 'KES 1,500',
    image: require('../assests/resources2.png'),
    backgroundimage: require('../assests/background2.png'),
  },
  {
    id: 3,
    title: 'Dare To Create: Ditch The Competitive Life To Lead A Creative Life',
    price: 'KES 1,500',
    image: require('../assests/resources3.png'),
    backgroundimage: require('../assests/background3.png'),
  },
  {
    id: 4,
    title: 'Dare To Create: Ditch The Competitive Life To Lead A Creative Life',
    price: 'KES 1,500',
    image: require('../assests/resources4.png'),
    backgroundimage: require('../assests/background4.png'),
  },
];

const DATA1 = [
  {
    id: 1,
    title: 'Dare To Create: Ditch The Competitive Life To Lead A Creative Life',
    price: 'KES 1,500',
    image: require('../assests/resources3.png'),
    backgroundimage: require('../assests/background3.png'),
  },
  {
    id: 2,
    title: 'Dare To Create: Ditch The Competitive Life To Lead A Creative Life',
    price: 'KES 1,500',
    image: require('../assests/resources2.png'),
    backgroundimage: require('../assests/background2.png'),
  },
  {
    id: 3,
    title: 'Dare To Create: Ditch The Competitive Life To Lead A Creative Life',
    price: 'KES 1,500',
    image: require('../assests/resources1.png'),
    backgroundimage: require('../assests/background1.png'),
  },
];

const ResourcesScreen = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState('AllResources');
  const [rating, setRating] = useState(4);
  const [rating1, setRating1] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);


  const handleOpen = (resource) => {
    setSelectedResource(resource);
    setModalVisible(true);
  };

  const handleClose = () => {
    setSelectedResource(null);
    setModalVisible(false);
  };





  const handleRating = (newRating) => {
    setRating(newRating);
  };
  const handleRating1 = (newRating) => {
    setRating1(newRating);
  };

  const handleButtonPress = (button) => {
    setActiveButton(button);
  };

  const renderMYresources = ({ item }) => (
    <Pressable onPress={() => handleOpen(item)}>
    <View>
      <View style={styles.modelthick} />
      <ImageBackground source={item.backgroundimage} style={styles.image}>
        <Image source={item.image} style={styles.image1} />
      </ImageBackground>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.lin1} />
      <View style={styles.pricetab}>
        <View>
          <Text style={styles.priceText}>Price</Text>
          <Text style={styles.price}>Purchased</Text>
        </View>
        <View>
          <Text style={styles.priceText1}>Rating</Text>
          <View style={styles.rating}>
            <View>
              <Text style={styles.ratingText}>{rating}/5</Text>
            </View>
            <View style={styles.reverse}>
              <AirbnbRating
                count={5}
                defaultRating={rating}
                size={10}
                onFinishRating={handleRating}
                showRating={false}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
    </Pressable>
  );

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handleOpen(item)}>
      <View>
        <View style={styles.modelthick} />
        <ImageBackground source={item.backgroundimage} style={styles.image}>
          <Image source={item.image} style={styles.image1} />
        </ImageBackground>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.lin1} />
        <View style={styles.pricetab}>
          <View>
            <Text style={styles.priceText}>Price</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          <View>
            <Text style={styles.priceText1}>Rating</Text>
            <View style={styles.rating}>
              <View>
                <Text style={styles.ratingText}>{rating}/5</Text>
              </View>
              <View style={styles.reverse}>
                <AirbnbRating
                  count={5}
                  defaultRating={rating}
                  size={10}
                  onFinishRating={handleRating}
                  showRating={false}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Topbar />
      <View style={styles.line} />
      <View style={styles.firsttab}>
        <Pressable
          style={[styles.button, activeButton === 'AllResources' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => handleButtonPress('AllResources')}
        >
          <Text style={[styles.buttontext, activeButton === 'AllResources' ? styles.activeText : styles.inactiveText]}>
            All Resources
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button, activeButton === 'MyResources' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => handleButtonPress('MyResources')}
        >
          <Text style={[styles.buttontext, activeButton === 'MyResources' ? styles.activeText : styles.inactiveText]}>
            My Resources
          </Text>
        </Pressable>
      </View>




      {activeButton === 'AllResources' ? (
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
            <Text style={styles.title1} numberOfLines={1}>Dare To Create: Ditch The Competitive ...</Text>
          </View>

          {selectedResource && (
            <ScrollView style={styles.modalDetails}>
              <View style={styles.modelthick} />
              <ImageBackground source={selectedResource.backgroundimage} style={styles.image}>
                <Image source={selectedResource.image} style={styles.image1} />
              </ImageBackground>
              <Text style={styles.title}>{selectedResource.title}</Text>
              <View style={styles.lin1} />
              <View style={styles.pricetab}>
                <View>
                  <Text style={styles.priceText}>Price</Text>
                  <Text style={styles.price}>{selectedResource.price}</Text>
                </View>
                <View>
                  <Text style={styles.priceText1}>Rating</Text>
                  <View style={styles.rating}>
                    <View>
                      <Text style={styles.ratingText}>{rating}/5</Text>
                    </View>
                    <View style={styles.reverse}>
                      <AirbnbRating
                        count={5}
                        defaultRating={rating}
                        size={10}
                        onFinishRating={handleRating}
                        showRating={false}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <Pressable>
                        <View style={styles.button1}>
                <Text style={styles.buttontext1}>Purchase Now</Text>
                </View>
              </Pressable>
              <View style={styles.modelthick} />
              <View style={styles.secondtab}>
                <Text style={styles.title2}>Description</Text>
                <Text style={styles.terms}>Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec. Lectus ut lobortis lobortis congue. Diam nullam augue velit eros id gravida sagittis a ipsum. Mollis ultrices dictum ullamcorper sed sagittis. </Text>
<Text style={styles.terms1}>
Duis dui sed adipiscing mus tortor integer. Dignissim hendrerit commodo mattis malesuada in interdum. Nisl varius aliquet diam tristique sagittis ac. Quisque fermentum bibendum sagittis aliquam convallis fermentum. Sem pellentesque eu volutpat nibh vitae.
                      </Text>
            </View>
            </ScrollView>
          )}
        </View>
      </Modal>

        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
        </ScrollView>
      ) : (
        <ScrollView style={styles.myResourcesContainer}>
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.firsttab1}>
            <Icon name="arrowleft" size={24} color="#64748B" onPress={handleClose} />
            <Text style={styles.title1} numberOfLines={1}>Dare To Create: Ditch The Competitive ...</Text>
          </View>

          {selectedResource && (
            <ScrollView style={styles.modalDetails}>
              <View style={styles.modelthick} />
              <ImageBackground source={selectedResource.backgroundimage} style={styles.image}>
                <Image source={selectedResource.image} style={styles.image1} />
              </ImageBackground>
              <Text style={styles.title}>{selectedResource.title}</Text>
              <View style={styles.lin1} />
              <View style={styles.pricetab}>
                <View>
                  <Text style={styles.priceText}>Price</Text>
                  <Text style={styles.price}>Purchased</Text>
                </View>
                <View>
                  <Text style={styles.priceText1}>Rate this Resource</Text>
                  <View style={styles.rating}>
                    <View style={styles.reverse}>
                      <AirbnbRating
                        count={5}
                        defaultRating={rating1}
                        size={10}
                        onFinishRating={handleRating1}
                        showRating={false}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <Pressable>
                        <View style={styles.button1}>
                <Text style={styles.buttontext1}>Read Now</Text>
                </View>
              </Pressable>
              <View style={styles.modelthick} />
              <View style={styles.secondtab}>
                <Text style={styles.title2}>Description</Text>
                <Text style={styles.terms}>Lorem ipsum dolor sit amet consectetur. Ut diam blandit cursus nisl nec. Lectus ut lobortis lobortis congue. Diam nullam augue velit eros id gravida sagittis a ipsum. Mollis ultrices dictum ullamcorper sed sagittis. </Text>
<Text style={styles.terms1}>
Duis dui sed adipiscing mus tortor integer. Dignissim hendrerit commodo mattis malesuada in interdum. Nisl varius aliquet diam tristique sagittis ac. Quisque fermentum bibendum sagittis aliquam convallis fermentum. Sem pellentesque eu volutpat nibh vitae.
                      </Text>
            </View>
            </ScrollView>
          )}
        </View>
      </Modal>

          <FlatList
            data={DATA1}
            renderItem={renderMYresources}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default ResourcesScreen;

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
    width: width * 0.27, // 27% of screen width
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
    overflow: 'hidden',
  },
  modelthick: {
    height: height * 0.01, // 1% of screen height
    width: '100%',
    backgroundColor: '#CBD5E1',
  },
  activeButton: {
    backgroundColor: '#0966C3',
    color: 'white',
  },
  activeText: {
    color: 'white',
  },
  image: {
    height: height * 0.3, // 30% of screen height
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02, // 2% of screen height
  },
  image1: {
    height: height * 0.26, // 26% of screen height
    width: width * 0.39, // 39% of screen width
  },
  title: {
    color: '#1E293B',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: '600',
    fontFamily: 'inter',
    marginHorizontal: width * 0.06, // 6% of screen width
    marginVertical: height * 0.005, // 2% of screen height
  },
  lin1: {
    height: 1,
    backgroundColor: '#CBD5E1',
    width: '90%',
    marginVertical: height * 0.01, // 2% of screen height
    alignItems: 'center',
    alignSelf: 'center',
  },
  price: {
    color: '#0966C3',
    fontSize: width * 0.035, // 3.5% of screen width
    fontWeight: '700',
    fontFamily: 'inter',
  },
  priceText: {
    color: '#64748B',
    fontSize: width * 0.03, // 3% of screen width
    fontWeight: '500',
    fontFamily: 'inter',
    marginBottom: height * 0.005, // 1% of screen height
  },
  priceText1: {
    color: '#64748B',
    fontSize: width * 0.03, // 3% of screen width
    fontWeight: '500',
    fontFamily: 'inter',
    marginBottom: height * 0.01, // 1% of screen height
    textAlign: 'right',
  },
  pricetab: {
    flexDirection: 'row',
    height: height * 0.04, // 5% of screen height
    width: width * 0.85, // 85% of screen width
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: height * 0.03, // 3% of screen height
  },
  rating: {
    flexDirection: 'row',
  },
  ratingText: {
    color: '#64748B',
    fontSize: width * 0.03, // 3% of screen width
    fontFamily: 'inter',
    fontWeight: '500',
  },
  myResourcesContainer: {
    flex: 1,
  },
  reverse: {
    transform: [{ scaleX: -1 }],
  },
  modalContent: {
    backgroundColor: 'white',
    flex: 1,
  },
  button1: {
    backgroundColor: '#0966C3',
    height: height * 0.06, // 6% of screen height
    borderRadius: 5,
    width: width * 0.85, // 85% of screen width
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: height * 0.03, // 3% of screen height
  },
  buttontext1: {
    color: 'white',
    fontSize: width * 0.04, // 4% of screen width
    padding: 9,
    alignSelf: 'center',
    fontWeight: '500',
    fontFamily: 'inter',
  },
  secondtab: {
    margin: width * 0.06, // 6% of screen width
  },
  terms: {
    color: '#64748B',
    fontFamily: 'inter',
    fontSize: width * 0.03, // 3% of screen width
    fontWeight: '400',
  },
  terms1: {
    color: '#64748B',
    fontFamily: 'inter',
    fontSize: width * 0.03, // 3% of screen width
    fontWeight: '400',
    marginVertical: height * 0.02, // 2% of screen height
  },
  title2: {
    color: '#1E293B',
    fontFamily: 'inter',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: '600',
    marginBottom: height * 0.03, // 3% of screen height
  },
});
