import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 15
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    userInfo: {
        marginLeft: 15,
        alignSelf: 'center',
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    lastMessage: {
        color: 'grey',
        fontSize: 15
    },
    time: {
        color: 'grey',
        alignSelf: 'center',
        marginRight: 15
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }


})

export default styles;
