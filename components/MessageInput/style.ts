import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    add: {
        marginLeft: 10
    },
    inputContainer: {
        backgroundColor: '#404040',
        flex: 1,
        height: 30,
        borderRadius: 50,
        marginHorizontal: 10,
    },
    buttonContainer: {
        marginRight: 15,
        flexDirection: 'row',
    },
    sendButton: {
        height: 35,
        width: 35,
        borderRadius: 50,
        backgroundColor: "#34B7F1",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15
    }
})

export default styles;
