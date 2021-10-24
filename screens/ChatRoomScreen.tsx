import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native';
import ChatMessage from '../components/ChatMessage';
import MessageInput from '../components/MessageInput';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { messagesByChatRoom } from '../src/graphql/queries';
import { onCreateMessage } from '../src/graphql/subscriptions';

const ChatRoomScreen = () => {

    const [messages, setMessages] = useState([]);
    const [myId, setMyId] = useState(null);
    const route = useRoute();

    useEffect(() => {
        const fetchMessages = async () => {
            const messagesData = await
                API.graphql(graphqlOperation(messagesByChatRoom, {
                    chatRoomID: route.params.id,
                    sortDirection: 'DESC',
                }))

            setMessages(messagesData.data.messagesByChatRoom.items)
        }

        fetchMessages();
    }, [])
    useEffect(() => {
        const getMyId = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyId(userInfo.attributes.sub)
        }
        getMyId();
    }, [])

    useEffect(() => {
        const subscription = API.graphql(
            graphqlOperation(onCreateMessage)
        ).subscribe({
            next: (data) => {
                const newMessage = data.value.data.onCreateMessage
                if (newMessage.chatRoomID !== route.params.id) {
                    return;
                }
                setMessages(messages => [newMessage, ...messages])
            }
        });
        return () => subscription.unsubscribe();
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <ChatMessage myId={myId} message={item} />}
                keyExtractor={(item) => item.id}
                inverted
            />
            <MessageInput chatRoomID={route.params.id} />
        </View>
    )
}

export default ChatRoomScreen
