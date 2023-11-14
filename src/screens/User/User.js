import react, { Component } from "react";
import {
  
  TouchableOpacity,
  View,
  Text,
   
} from "react-native";

import { auth, db } from "../../firebase/config";



class User extends Component {
  constructor() {
    super();
    this.state = {};
  }



  logout() {
    auth.signOut();
    this.props.navigation.navigate("Login");
  }

  render() {
    console.log(this.state.users);
    return (
      <View>
        <Text>User</Text>

        <TouchableOpacity onPress={() => this.logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default User;