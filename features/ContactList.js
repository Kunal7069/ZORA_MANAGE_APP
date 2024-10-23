import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import { getContacts, initiateCall } from '../api/CallUtils'; // Import your helper functions

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        getContacts(setContacts); 
    }, []);

    // Handle call button click
    const handleCallButton = () => {
        if (selectedContact && selectedContact.phoneNumbers && selectedContact.phoneNumbers.length > 0) {
            initiateCall(selectedContact.phoneNumbers[0].number); 
        } else {
            Alert.alert("No contact selected", "Please select a contact to call.");
        }
    };

    // Filter contacts based on the search term
    const filteredContacts = contacts.filter(contact =>
        contact.displayName && contact.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Type contact name"
                value={searchTerm}
                onChangeText={text => {
                    setSearchTerm(text);
                    setSelectedContact(filteredContacts.find(contact => contact.displayName && contact.displayName.toLowerCase() === text.toLowerCase()) || null);
                }}
            />
            <FlatList
                data={filteredContacts}
                keyExtractor={(item) => item.recordID}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.contactItem}
                        onPress={() => setSelectedContact(item)}
                    >
                        <Text style={styles.contactName}>{item.givenName} {item.familyName}</Text>
                        <Text style={styles.phoneNumber}>{item.phoneNumbers[0]?.number}</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.callButton} onPress={handleCallButton}>
                <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    contactItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    phoneNumber: {
        fontSize: 16,
        color: '#888',
    },
    callButton: {
        backgroundColor: '#008CBA',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    callButtonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default ContactList;
