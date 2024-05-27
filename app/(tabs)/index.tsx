import { View, TextStyle } from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.1.188:8000/api'; 

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2ODQ3OTQzLCJpYXQiOjE3MTY4MzcxNDMsImp0aSI6ImVjZDE1ODczMjljNjQwODA5OWI5ZWUwYTk1OTg3ZGZjIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhaW5venUifQ.CaZhFymKfvBs2ZsDU9AEaC6XpgggR1QNAZTx0dAG0vM"; // Assuming token is returned in response
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Save token to Axios headers
//TODO: remove after testing!
export default function HomeScreen() {
  return (
    <View>
      <Link style={styles.link} href="/about">About</Link>
      <Link style={styles.link} href="/login">Login</Link>
      <Link style={styles.link} href="/home">Home</Link>
      <Link style={styles.link} href="/profile">Profil</Link>
    </View>
  );
}

const styles = {
  link: {
    fontSize: 20,
    fontWeight: 'bold' as TextStyle['fontWeight'], // Explicitly specify the type
  }
};
