import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { auth, db } from "../../firebase/config";
import Cam from "../../componentes/Cam";

class PostForm extends Component {
  constructor() {
    super();
    this.state = { post: "", showCamera: true, url:'' };
  }

  postear() {
    db.collection("posts")
      .add({
        owner: auth.currentUser.email,
        post: this.state.post,
        photo: this.state.url,
        likes: [],
        createdAt: Date.now(),
        
      })
      .then((response) => {
        console.log("Se posteo correctamente", response);
        this.props.navigation.navigate("Home");
      })
      .catch((error) => console.log(`El error fue: ${error}`));


  }
  subirla(url){
    this.setState({ url: url , showCamera: false});
  }

  render() {
    return (
      <View>
        <Text>PostForm</Text>

        {this.state.showCamera ? (
          <Cam  subirla={(url) => this.subirla(url)} />
        ) : (
          <>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ post: text })}
              placeholder="Escribe un post"
              keyboardType="default"
              value={this.state.post}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.postear()}
            >
              <Text style={styles.textButton}>Postear</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  input: {
    height: 40, // Se cambió la altura a 40 para mejorar la visibilidad
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 6,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#f94144",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  textButton: {
    color: "#fff",
  },
});

export default PostForm;
