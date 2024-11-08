import { View, StyleSheet, Text } from "react-native";

const Saved = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Saved Locations</Text>
            <Text style={styles.text}>No saved locations yet</Text>
        </View>
     );
}
 
export default Saved;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0F7FA',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "#0D47A1"
    },
    text: {
        fontSize: 18,
        color: "#0D47A1"
    },
});