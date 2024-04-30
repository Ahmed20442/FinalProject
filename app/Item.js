import React from 'react'; 
import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native'; 
import { router } from "expo-router"; 
 
const screenWidth = Dimensions.get('window').width; 
 
export default function Item({ name, price, image }) { 
  return (
    <View style={[styles.item, { width: screenWidth / 2 - 30 }]}>
      <Pressable onPress={() => router.push(`/pressedItem?name=${name}&price=${price}&image=${image}`)}>
        <Image source={{ uri: image }} style={styles.image} />
      </Pressable>
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
}
  
 
const styles = StyleSheet.create({ 
  item: { 
    backgroundColor: 'lightgray',
    borderRadius: 10,
    padding: 5, 
  }, 
  image: { 
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20, 
  }, 
  infoContainer: { 
  
  }, 
  name: { 
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
     
  }, 
  price: { 
    fontSize: 16,
    color: '#888', 
  } 
});


