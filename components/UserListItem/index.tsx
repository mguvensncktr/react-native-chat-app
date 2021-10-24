import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { User } from '../../types';
import styles from './style';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createChatRoom, createChatRoomUser } from '../../src/graphql/mutations';


export type UserListItemProps = {
    user: User,
}

const UserListItem = (props: UserListItemProps) => {

    const { user } = props;
    const navigation = useNavigation();

    const onPress = async () => {
        try {
            const newChatRoomData = await
                API.graphql(graphqlOperation(createChatRoom, { input: { lastMessageID: "zz753fca-e8c3-473b-8e85-123445e23t36" } }))
            if (!newChatRoomData.data) {
                console.log("Chat oluşturulamadı")
                return;
            }
            const newChatRoom = newChatRoomData.data.createChatRoom;
            await
                API.graphql(graphqlOperation(createChatRoomUser, {
                    input: {
                        userID: user.id,
                        chatRoomID: newChatRoom.id
                    }
                }))
            const userInfo = await Auth.currentAuthenticatedUser()
            await
                API.graphql(graphqlOperation(createChatRoomUser, {
                    input: {
                        userID: userInfo.attributes.sub,
                        chatRoomID: newChatRoom.id
                    }
                }))
            navigation.goBack();
            navigation.navigate('Chat', {
                id: newChatRoom.id,
                name: user.name,
                image: user.imageUri
            })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: user.imageUri }} />
                <View>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text style={styles.status}>{user.status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default UserListItem;
