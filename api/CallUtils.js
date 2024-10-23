// contactUtils.js
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import Contacts from 'react-native-contacts';
import ImmediatePhoneCall from 'react-native-immediate-phone-call';

// Request permission for accessing contacts and call phone
export const requestContactsAndCallPermission = async () => {
    if (Platform.OS === 'android') {
        const contactsGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                title: "Contacts Access",
                message: "This app needs access to your contacts",
                buttonPositive: "OK"
            }
        );

        const callGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CALL_PHONE,
            {
                title: "Phone Call Access",
                message: "This app needs access to make phone calls",
                buttonPositive: "OK"
            }
        );
        return (
            contactsGranted === PermissionsAndroid.RESULTS.GRANTED &&
            callGranted === PermissionsAndroid.RESULTS.GRANTED
        );
    } else {
        const permission = await Contacts.requestPermission();
        return permission === 'authorized';
    }
};

// Fetch contacts if permission is granted
export const getContacts = async (setContacts) => {
    const permissionGranted = await requestContactsAndCallPermission();
    if (permissionGranted) {
        Contacts.getAll().then(contacts => {
            setContacts(contacts); // Store contacts in state
        });
    } else {
        console.log("Permission denied");
    }
};

// Sanitize the phone number
export const sanitizePhoneNumber = (phoneNumber) => {
    console.log("Original phone number:", phoneNumber);

    // Preserve the '+' if it's at the start of the phone number, and remove non-digit characters
    const cleanedNumber = phoneNumber.replace(/[^0-9+]/g, '');

    console.log("Cleaned phone number:", cleanedNumber);

    // Check if the cleaned number is valid (starts with + or is a local number)
    if (cleanedNumber.length > 5) {
        return cleanedNumber;
    } else {
        return null; // Invalid number
    }
};

// Function to initiate a call using react-native-immediate-phone-call
export const initiateCall = async (phoneNumber) => {
    const cleanedNumber = sanitizePhoneNumber(phoneNumber);

    if (cleanedNumber) {
        if (Platform.OS === 'android') {
            try {
                ImmediatePhoneCall.immediatePhoneCall(cleanedNumber); // Automatically initiate the call
            } catch (error) {
                console.error("Call failed:", error);
                Alert.alert("Call failed", "There was an error initiating the call.");
            }
        } else {
            Alert.alert("Unsupported Feature", "Direct call initiation is only supported on Android.");
        }
    } else {
        console.error("Invalid phone number:", phoneNumber);
        Alert.alert("Invalid Number", "The phone number is invalid or not properly formatted.");
    }
};
