import React, { Component } from "react";
import { db, auth } from "../../firebase/config";
import {Image, TextInput, TouchableOpacity, View,Text,StyleSheet, FlatList, ScrollView} from "react-native";
import MyCamera from "../../componentes/Cam";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      usuario: [],
    };
  }
  componentDidMount() {
    

    db.collection("user")
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let users = [];
        docs.forEach((doc) => {
          users.push({
            id: doc.id,
            data: doc.data(),
          });
          this.setState({
            usuario: users,
          });
        });
      });
    console.log(this.state);
  }

  

  editUser(email, pass, userName, bio, fotoPerfil) {
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then((response) => {
        

  
        db.collection("user").doc(this.state.users.id).update({
          owner: auth.currentUser.email,
          userName: this.state.userName,
          bio: this.state.bio,
          fotoPerfil: this.state.fotoPerfil,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  traerUrlDeFoto(url) {
    this.setState({
      fotoUrl: url,
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.right}>
          <View style={styles.firstBox}>

           
            <MyCamera
              style={styles.camera}
              traerUrlDeFoto={(url) => this.traerUrlDeFoto(url)}
            />

          
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ userName: text });
              }}
              blurOnSubmit={true}
              placeholder="Intrpduci tu usuario"
              keyboardType="default"
              value={this.state.userName}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ bio: text });
              }}
              minLength={6}
              blurOnSubmit={true}
              placeholder="Introduci tu contraseña"
              keyboardType="default"
              secureTextEntry={true}
              value={this.state.password}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.isError(
                  this.state.email,
                  this.state.password,
                  this.state.username,
                  this.state.fotoUrl
                )
              }
            >
              <Text style={styles.textButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Profile')}>
                    <Text style={styles.textButton}>Back</Text>
                </TouchableOpacity>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },



  right: {
    flex: 1,
    justifyContent: "center",
  },

  firstBox: {
    backgroundColor: "#EEEEEE",
    borderRadius: 6,
    padding: 70,
    marginVertical: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
  },

  secondBox: {
    borderRadius: 6,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#EEEEEE",
    borderColor: "#EEEEEE",
    alignItems: "center",
  },

  loginText: {
    color: "red",
    fontWeight: "bold   ",
  },

  image: {
    height: 80,
    width: "100%",
  },

  checkboxContainer: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 13,
  },




  input: {
    height: 37.6,
    width: 268.4,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "red",
    borderStyle: "solid",
    borderRadius: 6,
    marginVertical: 10,
  },

  button: {
    height: 37.6,
    width: 268.4,
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#46627f",
    marginTop: 20,
  },
  textButton: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});
export default EditProfile;