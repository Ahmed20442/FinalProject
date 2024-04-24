import { signOut, updateCurrentUser } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList ,Image} from 'react-native';
import { router } from 'expo-router';
import { auth } from '../firebase/firebase';
const products = [
  { id: '1', name: 'Classic Burger', price: 8.99, image: require('../assets/p1.jpg') },
  { id: '2', name: 'Veggie Burger', price: 7.49, image: require('../assets/p2.jpg') },
  { id: '3', name: 'Pepperoni Pizza', price: 10.99, image: require('../assets/p3.jpg') },
  { id: '4', name: 'Margherita Pizza', price: 9.99, image: require('../assets/p4.jpg') },
  { id: '5', name: 'Classic Burger', price: 8.99, image: require('../assets/p1.jpg') },
  { id: '6', name: 'Veggie Burger', price: 7.49, image: require('../assets/p2.jpg') },
  { id: '7', name: 'Pepperoni Pizza', price: 10.99, image: require('../assets/p3.jpg') },
  { id: '8', name: 'Margherita Pizza', price: 9.99, image: require('../assets/p4.jpg') },
];
export default function Todos() {
  // const [task, setTask] = useState('');
  // const [tasks, setTasks] = useState([]);

  // const handleAddTask = () => {
  //   if (task.trim() === '') {
  //     alert('Please enter a task');
  //     return;
  //   }
  //   setTasks([...tasks, { id: Date.now().toString(), task }]);
  //   setTask('');
  // };
  const handlesignout=()=>{
    try{
     auth.signOut()
    router.replace('/Login')

    }
    catch(e){

    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        {/* Add more details here (description, ingredients, etc.) */}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BurgerzzaHub Menu</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.productList}
      />
      <TouchableOpacity style={styles.addButton} onPress={handlesignout}>
          <Text style={styles.buttonText}>sign out</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8', // Light gray background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  productList: {
    flex: 1,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});