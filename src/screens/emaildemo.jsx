import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

// Example of multiple arrays
const data1 = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Banana' },
  { id: '3', name: 'Cherry' },
  { id: '4', name: 'Date' },
  { id: '5', name: 'Elderberry' },
];
const data2 = [
  { id: '1', name: 'Carrot' },
  { id: '2', name: 'Cucumber' },
  { id: '3', name: 'Tomato' },
  { id: '4', name: 'Lettuce' },
  { id: '5', name: 'Onion' },
];
const data3 = [
  { id: '1', name: 'Dog' },
  { id: '2', name: 'Cat' },
  { id: '3', name: 'Rabbit' },
  { id: '4', name: 'Horse' },
  { id: '5', name: 'Elephant' },
];
const data4 = [
  { id: '1', name: 'Toyota' },
  { id: '2', name: 'Honda' },
  { id: '3', name: 'Ford' },
  { id: '4', name: 'Chevrolet' },
  { id: '5', name: 'BMW' },
];

const LiveSearchApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData1, setFilteredData1] = useState(data1);
  const [filteredData2, setFilteredData2] = useState(data2);
  const [filteredData3, setFilteredData3] = useState(data3);
  const [filteredData4, setFilteredData4] = useState(data4);

  // Function to filter data based on search query
  const handleSearch = (text) => {
    setSearchQuery(text);

    // Filter each array based on the search query and show only the first three results
    setFilteredData1(data1.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())).slice(0, 3));
    setFilteredData2(data2.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())).slice(0, 3));
    setFilteredData3(data3.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())).slice(0, 3));
    setFilteredData4(data4.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())).slice(0, 3));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* FlatList for data1 */}
      <Text style={styles.header}>Fruits:</Text>
      <FlatList
        data={filteredData1}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />

      {/* FlatList for data2 */}
      <Text style={styles.header}>Vegetables:</Text>
      <FlatList
        data={filteredData2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />

      {/* FlatList for data3 */}
      <Text style={styles.header}>Animals:</Text>
      <FlatList
        data={filteredData3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />

      {/* FlatList for data4 */}
      <Text style={styles.header}>Cars:</Text>
      <FlatList
        data={filteredData4}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default LiveSearchApp;
