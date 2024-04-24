import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase/firebase';
import { router } from 'expo-router';

export default function Admin() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const tasksData = await AsyncStorage.getItem('tasks');
                if (tasksData) {
                    setTasks(JSON.parse(tasksData));
                }
            } catch (error) {
                console.error("Error loading tasks: ", error);
            }
        };

        loadTasks();
    }, []);

    const handleAddTask = async () => {
        if (task.trim() === '') {
            Alert.alert('Please enter a task');
            return;
        }

        const newTask = { id: Date.now().toString(), task };
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
            setTasks([...tasks, newTask]);
            setTask('');
        } catch (error) {
            console.error("Error adding task: ", error);
        }
    };

    const handleRemoveTask = async (id) => {
        try {
            const updatedTasks = tasks.filter((task) => task.id !== id);
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error removing task: ", error);
        }
    };

    const handlesignout = async () => {
        try {
            await auth.signOut();
            router.replace('/Login')
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter a task"
                    value={task}
                    onChangeText={setTask}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskContainer}>
                        <Text style={styles.taskText}>{item.task}</Text>
                        <TouchableOpacity onPress={() => handleRemoveTask(item.id)}>
                            <Text style={styles.removeText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
                style={styles.list}
            />
            <TouchableOpacity style={styles.signOutButton} onPress={handlesignout}>
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
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    signOutButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    list: {
        flex: 1,
    },
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
    },
    taskText: {
        fontSize: 16,
    },
    removeText: {
        color: '#FF6347',
        fontSize: 16,
    },
});

