import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import ChatListItem from '../ChatListItem'
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUser } from './queries';

const ChatList = () => {

    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const userInfo = await Auth.currentAuthenticatedUser();
                const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }))
                setChatRooms(userData.data.getUser.chatRoomUser.items)
            } catch (e) {
                console.log(e);
            }
        }
        fetchChatRooms();
    }, [])
    return (
        <View>
            <FlatList
                data={chatRooms}
                renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default ChatList;
