import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import { db } from '../firebase/firebase';
import { router } from 'expo-router';
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from '@firebase/firestore';
import ItemAdmin from "./item_admin";

export default function Admin() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [products, setProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'Products'));
            const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products: ', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddProduct = async () => {
        if (name.trim() === '' || price.trim() === '' || image.trim() === '') {
            Alert.alert('Please enter product details');
            return;
        }

        try {
            await addDoc(collection(db, 'Products'), {
                name: name,
                price: parseFloat(price),
                image: image,
            });
            Alert.alert('Product added successfully');
            setName('');
            setPrice('');
            setImage('');
            setModalVisible(false); // Close modal after adding product
            fetchData(); // Fetch updated data after adding product
        } catch (error) {
            console.error('Error adding product: ', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await deleteDoc(doc(db, 'Products', productId));
            Alert.alert('Product deleted successfully');
            fetchData(); // Fetch updated data after deleting product
        } catch (error) {
            console.error('Error deleting product: ', error);
        }
    };


    const handleUpdateProduct = async () => {
        if (!selectedProduct || name.trim() === '' || price.trim() === '' || image.trim() === '') {
            Alert.alert('Please select a product and enter details');
            return;
        }

        try {
            const productId = selectedProduct.id;
            await updateDoc(doc(db, 'Products', productId), {
                name: name,
                price: parseFloat(price),
                image: image,
            });
            Alert.alert('Product updated successfully');
            setName('');
            setPrice('');
            setImage('');
            setModalVisible(false); // Close modal after updating product
            fetchData(); // Fetch updated data after updating product
        } catch (error) {
            console.error('Error updating product: ', error);
        }
    };

    const handleSignOut = async () => {
        try {
            router.replace('./Login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setName(product.name);
        setPrice(product.price.toString());
        setImage(product.image);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin</Text>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                    setSelectedProduct(null);
                    setName('');
                    setPrice('');
                    setImage('');
                    setModalVisible(true);
                }}
            >
                <Text style={styles.buttonText}>Add Product</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedProduct ? 'Edit Product' : 'Add Product'}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter product name"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter product price"
                            value={price}
                            onChangeText={setPrice}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter product image URL"
                            value={image}
                            onChangeText={setImage}
                        />
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={selectedProduct ? handleUpdateProduct : handleAddProduct}
                        >
                            <Text style={styles.buttonText}>{selectedProduct ? 'Update Product' : 'Add Product'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => {
                                setSelectedProduct(null);
                                setName('');
                                setPrice('');
                                setImage('');
                                setModalVisible(false);
                            }}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <FlatList
                numColumns={2}
                data={products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <ItemAdmin
                        name={item.name}
                        price={item.price}
                        image={item.image}
                        onDelete={() => handleDeleteProduct(item.id)}
                        onEdit={() => openEditModal(item)}
                    />
                )}
            />
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        alignSelf: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 8,
        elevation: 5,
        minWidth: 300,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    cancelButton: {
        backgroundColor: '#CCCCCC',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        alignSelf: 'center',
    },
    deleteButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    productItem: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
    },
});
