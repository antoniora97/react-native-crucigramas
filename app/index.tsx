import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Juegos</Text>

      <Link href="/crossword" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Crucigrama</Text>
        </Pressable>
      </Link>

      <Link href="/history" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Historial</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 16 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 32 
  },
  button: { 
    backgroundColor: '#333', 
    padding: 12, 
    borderRadius: 10 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18 
  },
});
