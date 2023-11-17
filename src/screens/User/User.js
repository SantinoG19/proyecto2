import React, { Component } from "react";
import { TouchableOpacity, View, Text, FlatList, StyleSheet } from "react-native";
import { auth, db } from "../../firebase/config";

class User extends Component {
  constructor() {
    super();
    this.state = {
      profile: [],
      posteos: []
    };
  }

  componentDidMount() {
    db.collection('posts').onSnapshot(
        posteos => {
            let postsAMostrar = [];

            posteos.forEach( unPost => {
                postsAMostrar.push(
                    {
                        id: unPost.id,
                        datos: unPost.data()
                    }
                )
            })

            this.setState({
                posteos: postsAMostrar
            })
        }
    )
  }

  logout() {
    auth.signOut();
    this.props.navigation.navigate("Login");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.perfil}>
          {/* Contenido del perfil */}
        </View>

        <View style={styles.fotos}>
          {<FlatList 
                        data= {this.state.posteo}
                        keyExtractor={ unPost => unPost.id }
                        
                    />}
        </View>

        <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fafafa",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    perfil: {
      width: "100%",
      backgroundColor: "#e0e0e0",
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
    },
    fotos: {
      width: "100%",
      backgroundColor: "#e0e0e0",
      padding: 20,
      borderRadius: 10,
    },
    button: {
      backgroundColor: "#f94144",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      marginTop: 20,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      textAlign: "center",
    },
  });

export default User;
