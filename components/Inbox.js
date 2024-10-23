import {useState, useEffect, useCallback } from 'react';
import {View, ScrollView, ActivityIndicator, RefreshControl} from 'react-native'; // Import ActivityIndicator
import avatar from '../assets/user.png';
import HeaderBackTitle from '../sharedcomponent/header/HeaderBackTitle';
import Tabs from '../sharedcomponent/tabs/Tabs';
import MessageCard from '../sharedcomponent/message/messagecard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
export default function Inbox({route, navigation}) {
  const [activeTab, setActiveTab] = useState('calls');
  const [emails, setEmails] = useState([]);
  const [replies, setReplies] = useState([]); // State to store replies
  const [loading, setLoading] = useState(true); // Loading state
  const [isRefreshing, setIsRefreshing] = useState(false);
  // const currentUserState = useSelector(state => state.user);
  // Fetch data from the API
  const fetchData = async () => {
    try {
      const currentUserState = await AsyncStorage.getItem('userDetails');
      if (currentUserState) {
        const access = JSON.parse(currentUserState);
        console.log('DASHBOARD EMAIL:',access['email']);
        console.log('DASHBOARD APP PASSWORD:',access['accesspassword']);
        const response = await fetch('https://zora-backend-7.onrender.com/fetch-sent-emails',{
          method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:access['email'], password:access['accesspassword']}),
        });
        const data = await response.json();
        setReplies(data); 
        console.log('Fetched replies:', data.length); 
        
        const response_1 = await fetch('https://zora-backend-5.onrender.com/fetch-emails',{
          method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:access['email'], password:access['accesspassword'] }),
        });
        const apiData = await response_1.json();
        setEmails(apiData);
        console.log("REFRESHED-EMAILS", apiData.length);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false once fetching is done
    }
  };

  useEffect(() => {
    
   
    fetchData(); // Call fetchData when the component is mounted
  }, []); // Empty dependency array to run once when the component mounts
  useFocusEffect(
    useCallback(() => {
      setLoading(true); // Set loading to true when the screen is focused
      fetchData();      // Fetch data when the screen is focused
    }, [])
  );
  useEffect(() => {
    if (route.params?.emailData) {
      setEmails(route.params.emailData); // Store emailData in state
      console.log("EMAILS",emails.length)
    }
  }, [route.params?.emailData]);
 
  const onRefresh = async () => {
    // const currentUserState = await AsyncStorage.getItem('userInfo');
    const currentUserState = await AsyncStorage.getItem('userDetails');
    setIsRefreshing(true); // Set refreshing to true
    setLoading(true); 
    try {
      console.log("HII2");
      const access = JSON.parse(currentUserState);
      console.log('DASHBOARD EMAIL:',access['email']);
      console.log('DASHBOARD APP PASSWORD:',access['accesspassword']);
      const response = await fetch('https://zora-backend-5.onrender.com/fetch-emails',{
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:access['email'], password:access['accesspassword'] }),
      });
      const apiData = await response.json();
      setEmails(apiData);
      console.log("REFRESHED-EMAILS", apiData.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsRefreshing(false); // Set loading to false once the data is fetched or an error occurs
    }
   // Refetch data
   try {
    const access = JSON.parse(currentUserState);
      console.log('DASHBOARD EMAIL:',access['email']);
      console.log('DASHBOARD APP PASSWORD:',access['accesspassword']);
    const response = await fetch('https://zora-backend-7.onrender.com/fetch-sent-emails',{
      method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email:access['email'], password:access['accesspassword'] }),
    });
    const data = await response.json();
    setReplies(data); // Save fetched data to replies array
    console.log('Fetched replies:', data.length); // Log the fetched data
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false); // Set loading to false once fetching is done
  }

  };


  const callsData = [
    {
      id: 1,
      name: 'sher mohd',
      avatar: avatar,
      context:
        'This is a testing message you can enter anything here, well everyone has its own head and work with so do some kidoozz.',
      time: '10:00 AM',
      route: 'Message',
    },
    {
      id: 2,
      name: 'sher mohd',
      avatar: avatar,
      context:
        'This is a testing message you can enter anything here, well everyone has its own head and work with so do some kidoozz.',
      time: '10:00 AM',
    },
  ];

  const getName = from => {
    const match = from.match(/^[^<]+/);
    if (match) {
      let name = match[0].trim();

      if (name.startsWith('"') && name.endsWith('"')) {
        name = name.slice(1, -1);
      }

      return name.trim().substring(0, 20);
    }

    return from.substring(0, 20);
  };

  const formatDate = dateString => {
    const [monthName, day, year] = dateString.split(' ');
    const months = {
      January: '01',
      February: '02',
      March: '03',
      April: '04',
      May: '05',
      June: '06',
      July: '07',
      August: '08',
      September: '09',
      October: '10',
      November: '11',
      December: '12',
    };
    const month = months[monthName];
    const formattedDate = `${day.replace(',', '')}-${month}-${year}`;

    return formattedDate;
  };

  const renderMessages = () => {
    const data = activeTab === 'calls' ? callsData : emails;
    if (activeTab === 'calls') {
      return callsData.map(item => (
        <MessageCard
          key={item.id}
          icon={item.avatar}
          message={item.context}
          username={item.name}
          timestamp={item.time}
          lines={2}
          userline={1}
          onclick={() => navigation.navigate(item.route || 'Message')} // Default route to 'Message'
        />
      ));
    } else {
      return data
        .filter(item => !item.subject.startsWith('Re:')) // Filter out messages with "Re: " in subject
        .map(item => (
          <MessageCard
            key={item.formattedTime}
            icon={avatar} // Define 'avatar' or replace it with your icon
            message={item.subject}
            username={getName(item.from)}
            timestamp={formatDate(item.formattedDate)}
            lines={2}
            userline={1}
            onclick={() =>
              navigation.navigate(item.route || 'Message', {
                itemDetails: item,
                items: emails,
                replies:replies
              })
            }
          />
        ));
    }
  };

  return (
    <View className="flex-1 bg-black">
      <HeaderBackTitle
        screen="inbox"
        onClick={() => {
          navigation.goBack();
        }}
        navigation={navigation}
      />
      <ScrollView className="flex px-6"
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} /> // Add pull-to-refresh functionality
        }
      >
        <Tabs tab1="calls" tab2="emails" onTabChange={setActiveTab} />
        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" /> // Show loading spinner while data is fetching
        ) : (
          renderMessages()
        )}
      </ScrollView>
    </View>
  );
}
