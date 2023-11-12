import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';

export default function DisplayNote({ route }) {
    const { json } = route.params;
    const userId = json[0].id;
    const [task, setTask] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [updatedNote, setUpdatedNote] = useState('');
    const [updatedNoteId, setUpdatedNoteId] = useState(null);
    const [editedNote, setEditedNote] = useState('');

    useEffect(() => {
        fetch("https://654bab935b38a59f28ef7db7.mockapi.io/account/" + userId + "/task")
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error('Lỗi khi tải dữ liệu ghi chú');
            })
            .then((json) => {
                setTask(json);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);

    const handleAddNote = () => {
        fetch(`https://654bab935b38a59f28ef7db7.mockapi.io/account/${userId}/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ note: newNote }),
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error('Lỗi khi thêm ghi chú');
            })
            .then((json) => {
                setTask([...task, json]); // Sử dụng response từ server để đảm bảo có ID mới
                setNewNote('');
            })
            .catch((error) => {
                console.error(error);
            });
    };
    

    const handleDeleteNote = (noteId) => {
        fetch(`https://654bab935b38a59f28ef7db7.mockapi.io/account/${userId}/task/${noteId}`, {
            method: 'DELETE',
        })
            .then((resp) => {
                if (resp.ok) {
                    const updatedTask = task.filter((item) => item.id !== noteId);
                    setTask(updatedTask);
                } else {
                    throw new Error('Lỗi khi xóa ghi chú');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    

    const handleUpdateNote = (noteId, editedNote) => {
        fetch(`https://654bab935b38a59f28ef7db7.mockapi.io/account/${userId}/task/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ note: editedNote }),
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error('Lỗi khi cập nhật ghi chú');
            })
            .then((json) => {
                const updatedTask = task.map((item) => {
                    if (item.id === noteId) {
                        return { ...item, note: json.note };
                    }
                    return item;
                });
                setTask(updatedTask);
                setUpdatedNoteId(null);
                setUpdatedNote('');
                setEditedNote('');
            })
            .catch((error) => {
                console.error(error);
            });
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trang cá nhân</Text>
            <Text>Email: {json[0].email}</Text>
            <Text>Name: {json[0].name}</Text>
            <Text>UserID: {userId}</Text>
            <TextInput
                style={styles.input}
                onChangeText={setNewNote}
                placeholder="Enter your note"
                value={newNote}
            />
            <TouchableOpacity style={styles.registerButton} onPress={handleAddNote}>
                <Text style={styles.registerButtonText}>Add note</Text>
            </TouchableOpacity>
            <View style={{ width: "50%", marginLeft: 110, marginTop: 20 }}>
                {task.length > 0 ? (
                    <FlatList
                        keyExtractor={(item) => item.id.toString()}
                        data={task}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={styles.input}
                                    value={item.id === updatedNoteId ? editedNote : item.note}
                                    editable={item.id === updatedNoteId}
                                    onChangeText={ setEditedNote} // Cập nhật giá trị của editedNote
                                />
                                {item.id === updatedNoteId ? (
                                    <>
                                        <TouchableOpacity onPress={() => handleUpdateNote(item.id, editedNote)}>
                                            <Text style={styles.updateButton}>Update</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setUpdatedNoteId('')}>
                                            <Text style={styles.cancelButton}>Cancel</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <TouchableOpacity onPress={() => {
                                            setUpdatedNoteId(item.id);
                                            setEditedNote(item.note); // Thiết lập giá trị của editedNote
                                        }}>
                                            <Text style={styles.editButton}>Edit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
                                            <Text style={styles.deleteButton}>Delete</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        )}
                    />
                ) : (
                    <Text>No notes available</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '70%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    registerButton: {
        backgroundColor: 'blue',
        borderRadius: 5,
        padding: 10,
    },
    editButton: {
        color: 'green',
        marginLeft: 10,
    },
    deleteButton: {
        color: 'red',
        marginLeft: 10,
    },
    updateButton: {
        color: 'blue',
        marginLeft: 10,
    },
    cancelButton: {
        color: 'gray',
        marginLeft: 10,
    },
});
