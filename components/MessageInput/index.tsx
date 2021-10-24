import React, { useEffect, useState } from 'react'
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import styles from './style'
import { Feather } from '@expo/vector-icons';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createMessage, updateChatRoom } from '../../src/graphql/mutations';


const MessageInput = (props) => {

    const { chatRoomID } = props;

    const [message, setMessage] = useState('')
    const [myUserId, setMyUserId] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyUserId(userInfo.attributes.sub);
        }
        fetchUser();
    }, [])

    const onMicPress = () => {
        console.log("Mic")
    }
    const updateChatRoomLastMessage = async (messageId: string) => {
        try {
            await API.graphql(graphqlOperation(updateChatRoom,
                {
                    input: {
                        id: chatRoomID,
                        lastMessageID: messageId,
                    }
                }
            ))
        } catch (e) {
            console.log(e);
        }

    }
    const onSendPress = async () => {

        try {
            const newMessageData = await API.graphql(graphqlOperation(createMessage, {
                input: {
                    content: message,
                    userID: myUserId,
                    chatRoomID,
                }
            }))

            await updateChatRoomLastMessage(newMessageData.data.createMessage.id);
        } catch (e) {
            console.log(e);

        }
        setMessage('');
    }

    const onPress = () => {
        if (!message) {
            onMicPress();
        } else {
            onSendPress();
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={70}
        >
            <View style={styles.add}>
                <Feather name="plus" size={26} color="#34B7F1" />
            </View>
            <View style={styles.inputContainer}>
                <TextInput multiline style={{ flex: 1, color: 'white', marginHorizontal: 10, fontSize: 16 }}
                    value={message}
                    onChangeText={setMessage} />
            </View>

            {
                !message
                    ?
                    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
                        <Feather name="camera" size={26} color="#34B7F1" style={{ marginRight: 15 }} />
                        <FontAwesome name="microphone" size={26} color="#34B7F1" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.sendButton} onPress={onPress}>
                        <MaterialIcons name="send" size={26} color='white' />
                    </TouchableOpacity>
            }
        </KeyboardAvoidingView>
    )
}

export default MessageInput;
