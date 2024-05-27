import { View, TextStyle } from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.1.188:8000/api'; 
export default function HomeScreen() {
  return (
    <View>
      <Link style={styles.link} href="/about">About</Link>
      <Link style={styles.link} href="/login">Login</Link>
      <Link style={styles.link} href="/home">Home</Link>
    </View>
  );
}

const styles = {
  link: {
    fontSize: 20,
    fontWeight: 'bold' as TextStyle['fontWeight'], // Explicitly specify the type
  }
};
