import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, Modal } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, doc, query, where, getDocs, addDoc, deleteDoc } from '@firebase/firestore';
import { db } from '../firebase/firebase';
import ItemCart from '../app/item_cart';
import { useLocalSearchParams, router } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Checkout() {
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userAddress, setUserAddress] = useState('');

    const [cartItems, setCartItems] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [randomNumber, setRandomNumber] = useState(1); // Initial value is 1

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
                fetchUserData(user.email);
                fetchCartItems(user.uid);
            } else {
                setUserEmail('');
                setUserName('');
                setUserPhone('');
                setUserCity('');
                setUserAddress('');
                setCartItems([]);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isModalVisible) {
            setRandomNumber(prev => prev + 1);
        }
    }, []);

    const fetchUserData = async (email) => {
        const usersRef = collection(db, 'users');
        const userQuery = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            setUserName(userData.name || '');
            setUserPhone(userData.phoneNumber || '');
            setUserCity(userData.city || '');
            setUserAddress(userData.address || '');
        });
    };

    const fetchCartItems = async (userId) => {
        const usersRef = collection(db, 'users', userId, 'cartItems');
        const unsubscribe = onSnapshot(usersRef, (snapshot) => {
            const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCartItems(productList);
        });

        return () => unsubscribe();
    };

    const totalOverallPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleRemoveItem = async (itemId) => {
        try {
            await deleteDoc(doc(db, 'users', userId, 'cartItems', itemId));
            Alert.alert('Item removed from cart');
        } catch (error) {
            console.error('Error removing item from cart: ', error);
        }
    };

    const handleConfirm = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                console.error('User is not authenticated');
                return;
            }

            const userId = user.uid;
            const userRef = doc(db, 'users', userId);
            const saleRef = collection(userRef, 'sale');

            // Add each cart item to the "sale" collection
            cartItems.forEach(async (item) => {
                await addDoc(saleRef, {
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    quantity: item.quantity,
                    saleTime: new Date().toString(),
                    NumberOrder: randomNumber
                });
            });

            const cartRef = collection(userRef, 'cartItems');
            cartItems.forEach(async (item) => {
                const docRef = doc(cartRef, item.id);
                await deleteDoc(docRef);
            });

            setIsModalVisible(true);
            setCurrentDate(new Date().toString());
        } catch (error) {
            console.error('Error adding items to sale:', error);
        }
    };

    const handleCancel = () => {
        router.push('../cart');
    };

    const closeModal = () => {
        setIsModalVisible(false);
        router.push('../feed');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Checkout</Text>
            <View style={styles.userInfoContainer}>
                <Text style={styles.userInfoLabel}>User Email:</Text>
                <Text style={styles.userInfoText}>{userEmail}</Text>
                <Text style={styles.userInfoLabel}>Name:</Text>
                <Text style={styles.userInfoText}>{userName}</Text>
                <Text style={styles.userInfoLabel}>Phone:</Text>
                <Text style={styles.userInfoText}>{userPhone}</Text>
                <Text style={styles.userInfoLabel}>City Address:</Text>
                <Text style={styles.userInfoText}>{userCity}</Text>
                <Text style={styles.userInfoLabel}>Address:</Text>
                <Text style={styles.userInfoText}>{userAddress}</Text>
            </View>
            <FlatList
                style={styles.productList}
                data={cartItems}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={[styles.productItem, { width: '50%' }]}>
                        <ItemCart
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            quantity={item.quantity}
                            onDelete={() => handleRemoveItem(item.userId)}
                        />
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyCartText}>List Is Empty</Text>}
            />
            {cartItems.length > 0 && (
                <View style={styles.totalPriceContainer}>
                    <Text style={styles.totalOverallPrice}>Total Overall Price: ${totalOverallPrice.toFixed(2)}</Text>
                    <View style={styles.buttonsContainer}>
                        <Pressable style={styles.confirmButton} onPress={handleConfirm}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </Pressable>
                        <Pressable style={styles.cancelButton} onPress={handleCancel}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            )}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Number Order Is: {randomNumber}</Text>
                    <Text style={styles.modalText}>Date/Time: {currentDate}</Text>
                    <Pressable style={styles.closeModalButton} onPress={closeModal}>
                        <Text style={styles.closeModalText}>Close</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userInfoContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    userInfoLabel: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,
    },
    userInfoText: {
        marginBottom: 10,
        fontSize: 16,
    },
    emptyCartText: {
        fontSize: 16,
        textAlign: 'center',
    },
    productList: {
        flexGrow: 1,
    },
    productItem: {
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    totalOverallPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    totalPriceContainer: {
        marginTop: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    confirmButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        margin: 20,
        maxHeight: '80%', // Set maximum height
        maxWidth: '80%', // Set maximum width
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    closeModalButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeModalText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
