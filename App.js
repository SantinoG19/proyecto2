import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Register from './src/screens/Register/Register'
import Login from "./src/screens/Login/Login";
import Menu from "./src/componentes/Menu";
import Post from "./src/componentes/Post";
import Buscador from "./src/screens/Buscador/Buscador"; 
import Comentario from "./src/screens/Comentario/Comentario";
import EditProfile from  './src/screens/EditProfile/EditProfile';




export default function App() {
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>

        
        
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      
     <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>

      
      
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={Post} options={{ headerShown: false }}/>
      <Stack.Screen name="Comentario" component={Comentario}options={{ headerShown: true }}/>
      <Stack.Screen name='EditProfile' component={EditProfile} options={ { headerShown: false } }/>
      
      
      


      
      
      
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