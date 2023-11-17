import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Register from './src/screens/Register/Register'
import Login from "./src/screens/Login/Login";
import Menu from "./src/componentes/Menu";
import Post from "./src/componentes/Post";



export default function App() {
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>

      <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>

      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      
      
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      <Stack.Screen name="Post" component={Post} options={{ headerShown: false }}/>

      
      
      


      
      
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});