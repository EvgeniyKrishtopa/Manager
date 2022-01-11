import { StatusBar } from 'expo-status-bar';
import Auth from 'modules/Auth/Index';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  console.log(1234);
  return (
    <View style={styles.container}>
      <Auth />
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
