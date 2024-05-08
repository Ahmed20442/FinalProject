import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import { db } from '../../firebase/firebase';
import { router } from 'expo-router';
import { collection, getDocs, deleteDoc, doc } from '@firebase/firestore';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersRef = collection(db, 'users');
            const querySnapshot = await getDocs(usersRef);
            const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(userList);
        };
        fetchUsers();
    }, []);

    const handleSignOut = async () => {
        try {
            router.replace('/Login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const handleUserPress = (user) => {
        setSelectedUser(user);
        setModalVisible(true);
    };

    const handleDeleteUser = async () => {
        try {
            await deleteDoc(doc(db, 'users', selectedUser.id));
            setModalVisible(false);
            setUsers(users.filter(user => user.id !== selectedUser.id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Users</Text>

            <FlatList
                data={users}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.userItem} onPress={() => handleUserPress(item)}>
                        <Text>Email: {item.email}</Text>
                        <Text>Password: {item.password}</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.Text}>Username: {selectedUser?.name}</Text>
                    <Text style={styles.Text}>Password: {selectedUser?.password}</Text>
                    <Text style={styles.Text}>Email: {selectedUser?.email}</Text>
                    <Text style={styles.Text}>ID: {selectedUser?.id}</Text>
                    <Text style={styles.Text}>age: {selectedUser?.age}</Text>
                    <Text style={styles.Text}>Gender: {selectedUser?.gender}</Text>
                    <Text style={styles.Text}>Address: {selectedUser?.address}</Text>
                    <Text style={styles.Text}>PhoneNumber: {selectedUser?.phoneNumber}</Text>

                    <TouchableOpacity onPress={handleDeleteUser}>
                        <Text style={styles.deleteButton}>Delete User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButton}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    userItem: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    signOutButton: {
        backgroundColor: "#FF4500",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 18,
        marginTop: 20,
        alignSelf: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        padding: '15%',
        borderRadius: 8,
        elevation: 100,
        margin: 50,
    },
    closeButton: {
        marginTop: 20,
        color: '#FF4500',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    deleteButton: {
        marginTop: 20,
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    Text: {
        marginTop: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
