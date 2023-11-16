import { Component } from "react";
import {TouchableOpacity, View, Text, FlatList, StyleSheet } from "react-native";
import { auth, db } from "../../firebase/config";


class User extends Component {
  constructor() {
    super();
    this.state = {
      profile: [],
      posteos: []
    };
  }

  componentDidMount(){
    db.collection("users").where('owner', '==', auth.currentUser.email).onSnapshot(
      docs => {
        let profile = [];
        docs.forEach( doc => {
          profile.push({
           id: doc.id,
           data: doc.data()
          })
          this.setState({
            profile: profile,
          })
        })
      }
    )

    db.collection("posts").where('owner', '==', auth.currentUser.email).onSnapshot(
      posts => {
        let posteosDelUsuario = [];
        posts.forEach(doc => {
          posteosDelUsuario.push({
            id: doc.id,
            data: doc.data()
          })
        this.setState({
          posteos: posteosDelUsuario
        })
        })
      }
    )
  }

  logout() {
    auth.signOut();
    this.props.navigation.navigate("Login");
  }

  render() {
    console.log(this.state.profile);
    console.log(this.state.profile);
    return (
      <View>
      <br/>
      <View style={styles.orden}>
      <View style={styles.foto}>
      <Text>Foto de Perfil: </Text>
      { this.state.profile.length > 0 
        ? 
        <Text>{this.state.profile[0].data.foto}</Text>

        : 
        false}
      </View>
      <View style={styles.seccionProfile}>

        <Text style = {styles.texto}>Usuario: {auth.currentUser.email}</Text>
        { this.state.profile.length > 0 
        ? 
        <Text style = {styles.texto}>Nombre de Usuario: {this.state.profile[0].data.usuario}</Text>
        : 
        false}
        { this.state.profile.length > 0           ? 
        <Text style = {styles.texto}>Biografia: {this.state.profile[0].data.minibio}</Text>
        : 
        false}
      </View>
      </View>


        <br/>
        <View style = {styles.seccionDos}>
        <Text style = {styles.texto}>Mis posteos:</Text>
        {/* {this.state.posteos === 0 
        ?
        <Text style = {styles.texto}>Cargando...</Text>
        :
        <FlatList 
            data= {this.state.posteos}
            keyExtractor={ unPost => unPost.id }
            renderItem={ ({item}) => <Post infoPost = { item } /> }
          />} */}
        </View>

        <br/>
        <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
          <Text style = {styles.texto} >Logout</Text>
        </TouchableOpacity>
          

      </View>
    );
  }
}

const styles = StyleSheet.create({
  orden: {
    flex: 1,
    flexDirection: 'row',
  },
  foto: {
    width: 170,
    height: 200,
  },
  seccionProfile: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 100,
    height: 200,
    width: 200,
    justifyContent: "center",
  },
  seccionDos: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 10,
    flex: 1,
    justifyContent:"flex-start",
  },
  texto: {
    textAlign: "left",
    color: "black",
    fontSize: 15,
  },
  button: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#28a745",
    margin: 5,
    width: 80,
  },

});

export default User;