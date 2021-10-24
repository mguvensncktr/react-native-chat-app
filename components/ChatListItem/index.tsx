import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import { ChatRoom } from '../../types';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Auth } from 'aws-amplify'

export type ChatListItemProps = {
    chatRoom: ChatRoom
}

const ChatListItem = (props: ChatListItemProps) => {

    const { chatRoom } = props;
    const [otherUser, setOtherUser] = useState(null);

    useEffect(() => {
        const getOtherUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
                setOtherUser(chatRoom.chatRoomUsers.items[1].user)
            } else {
                setOtherUser(chatRoom.chatRoomUsers.items[0].user)
            }
        }
        getOtherUser();
    }, [])
    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('Chat', { id: chatRoom.id, name: otherUser.name, image: otherUser.imageUri });
    }
    if (!otherUser) {
        return null;
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: otherUser.imageUri }} />
                <View style={styles.userInfo}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.username}>{otherUser.name}</Text>
                        <Text style={styles.time}>{chatRoom.lastMessage && moment(chatRoom.lastMessage.createdAt).fromNow()}</Text>
                    </View>
                    <Text ellipsizeMode='tail' numberOfLines={2} style={styles.lastMessage}>{chatRoom.lastMessage ? `${chatRoom.lastMessage.user.name}: ${chatRoom.lastMessage.content}` : ""}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatListItem;
