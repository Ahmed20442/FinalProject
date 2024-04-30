import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import { db } from '../../firebase/firebase';
import { router } from 'expo-router';
import { collection, getDocs } from '@firebase/firestore';

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
        backgroundColor: '#FAFAFA',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    userItem: {
        backgroundColor: '#FFF',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        elevation: 3,
        width: '100%',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    signOutButton: {
        backgroundColor: "#FF6347",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 20,
        alignSelf: 'center',
        elevation: 3,
    },
    modalContainer: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        marginHorizontal: 30,
    },
    closeButton: {
        marginTop: 20,
        color: '#FF6347',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    text: {
        marginTop: 10,
        color: '#333',
        fontSize: 16,
    },
});
