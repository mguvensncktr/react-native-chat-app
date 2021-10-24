import React from 'react'
import { View, Text } from 'react-native'
import { Message } from '../../types'
import moment from 'moment';
import styles from './style';

export type ChatMessageProps = {
    message: Message,
    myId: String,

}

const ChatMessage = (props: ChatMessageProps) => {

    const { message, myId } = props;
    const isMyMessage = () => {
        return message.user.id === myId;

    }
    return (
        <View style={styles.container}>
            <View style={[
                styles.messageBox,
                {
                    backgroundColor: isMyMessage() ? '#075E54' : '#404040',
                    alignSelf: isMyMessage() ? 'flex-end' : 'flex-start'
                }]}>
                <Text style={styles.content}>{message.content}</Text>
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View>
        </View>
    )
}

export default ChatMessage
