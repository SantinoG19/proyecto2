import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import react, { Component } from "react";

import Home from "../screens/Home/Home";
import PostForm from "../screens/PostForm/PostForm";
import Profile from "../screens/Profile/Profile";
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
            

            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="PostForm" component={PostForm}/>
            <Tab.Screen name="Profile" component={Profile}/>
            <Tab.Screen 
              name="Buscador" 
              component={Buscador} 
              
            />
        </Tab.Navigator>
    );
  }
}

export default Menu;