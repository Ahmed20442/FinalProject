import React from 'react';
import { View, Text, Image, StyleSheet ,Pressable, Button,TouchableOpacity} from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { router } from 'expo-router';
export default function PressedItem() {
  const { name, price, image } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>Name: {name}</Text>
      <Text style={styles.price}>Price: ${price}</Text>
      <Pressable onPress={() => router.replace(`feed`)}> 
                        <Text>back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
});
