import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import App_button from './button';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola mundo</Text>
      <StatusBar style="auto" />
      <Image source={require('./assets/asesoria.png')} style={{ width: '50%', height: '15%', borderTopLeftRadius: 25, borderTopRightRadius: 25 }} />
      <App_button />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
