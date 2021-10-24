import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 15
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 15
    },
    status: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 15
    },

})

export default styles;
