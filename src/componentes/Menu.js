import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import react, { Component } from "react";

import Home from "../screens/Home/Home";
import PostForm from "../screens/Postform/Postform";
import User from "../screens/User/User";
import Buscador from "../screens/Buscador/Buscador";


const Tab = createBottomTabNavigator()

class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {

    return (
        
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="PostForm" component={PostForm}/>
            <Tab.Screen name="User" component={User}/>
            <Tab.Screen 
              name="Buscador" 
              component={Buscador} 
              options={
              {tabBarIcon: () => <FontAwesome name="Buscador" size={24} color="black" />,
              headerShown: false }}
            />
        </Tab.Navigator>
    );
  }
}

export default Menu;