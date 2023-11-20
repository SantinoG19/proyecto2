import React, { Component } from "react";
import { db, auth } from "../../firebase/config";
import {Image, TextInput, TouchableOpacity, View,Text,StyleSheet, FlatList, ScrollView} from "react-native";
import MyCamera from "../../componentes/Cam";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nuevoUsuario: this.props.route.params.userData[0].data.userName,
      usuario: this.props.route.params.userData[0],
      nuevaBio: this.props.route.params.userData[0].data.bio,
      foto: this.props.route.params.userData[0].data.fotoPerfil,
      
    };
  }
 
 

  edit(nuevoUsuario, nuevaBio, newPicture) {
    
    db.collection('users').doc(this.state.usuario.id).update({
        bio: nuevaBio,
        userName: nuevoUsuario,
        fotoPerfil: newPicture
    })
        .then(res => {
            this.setState({
                
            })
        })
        .catch(e => console.log(e))
  }

  traerUrlDeFoto(url) {
    this.setState({
      foto: url,
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.right}>
          <View style={styles.firstBox}>

           
            <Text >Nueva foto de Perfil</Text>
            <MyCamera
              style={styles.camera}
              traerUrlDeFoto={(url) => this.traerUrlDeFoto(url)}
            />

           
           <Text >Nombre de usuario</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ nuevoUsuario: text });
              }}
              blurOnSubmit={true}
              placeholder="Nuevo user"
              keyboardType="default"
              value={this.state.usuario.data.userName}
            />
            <Text >Biografía</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ nuevaBio: text });
              }}
              blurOnSubmit={true}
              placeholder="Biografia"
              keyboardType="default"
              value={this.state.usuario.data.bio}
            />
            <Text ></Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.edit(
                  this.state.nuevoUsuario,
                  this.state.nuevaBio,
                  this.state.foto
                )
              }
            >
              <Text style={styles.textButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Profile')}>
                    <Text style={styles.textButton}>Volve atras</Text>
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
    color: "#46627f",
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
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 6,
    marginVertical: 10,
  },

  button: {
    height: 37.6,
    width: 268.4,
    backgroundColor: "#46627f",
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
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});


export default EditProfile;