import { StyleSheet, Text, View } from 'react-native';

export default function CrosswordScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crucigrama</Text>
            <Text>Aquí irá el juego de crucigrama 😄</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
