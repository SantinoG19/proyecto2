import React, { Component } from 'react';
import { TouchableOpacity,TextInput ,View, Text, StyleSheet, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      comments:'',
    };
  }

  componentDidMount() {
    // Indicar si el post ya está likeado o no
    let likes = this.props.infoPost.datos.likes;

    if (likes.length === 0) {
      this.setState({
        like: false,
      });
    }
    if (likes.length > 0) {
      likes.forEach((like) => {
        if (like === auth.currentUser.email) {
          this.setState({ like: true });
        }
      });
    }
  }

  likear() {
    // El post tendría que guardar una propiedad like con un array de los usuario que lo likearon.
    db.collection('posts')
      .doc(this.props.infoPost.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(this.setState({ like: true }));
  }

  dislike() {
    // Quitar del array de likes al usario que está mirando el post.
    db.collection('posts')
      .doc(this.props.infoPost.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then(this.setState({ like: false }));
  }
  Comentario() {
    db.collection("posts")
      .doc(this.props.infoPost.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          autor: auth.currentUser.email,
          texto: this.state.comments,
        }),
      })
      .then(() => {
        this.setState({
          comments: '',
        });
      });
  }

  eliminar(){
    db.collection('posts')
    .doc(this.props.infoPost.id).delete()
    
   }

  render() {
    return (
      <View style={styles.formContainer}>
        <Text>----------------------------------------------------</Text>
        <Text style={styles.texto}>Datos del Post</Text>
        <Text style={styles.texto}>Email: {this.props.infoPost.datos.owner}</Text>
        <Text style={styles.texto}>Texto: {this.props.infoPost.datos.post}</Text>
        <Image style={styles.camera} source={{ uri: this.props.infoPost.datos.photo }} />
        <Text style={styles.texto} >Cantidad de Likes: {this.props.infoPost.datos.likes.length}</Text>

        {/* If ternario */}
        {this.state.like ? (
          <TouchableOpacity style={styles.button} onPress={() => this.dislike()}>
            <Text style={styles.textButton}>Dislike</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => this.likear()}>
            <Text style={styles.textButton}>Like</Text>
          </TouchableOpacity>
        )}

{auth.currentUser.email == this.props.infoPost.datos.owner && 
                        <TouchableOpacity style={styles.button} onPress={()=>this.eliminar()} activeOpacity={0.7}>
                            <Text style={styles.textButton}>eliminar</Text>
                        </TouchableOpacity>
                        } 

<TouchableOpacity style={styles.buttonCommentariosTotales} onPress={() => this.props.navigation.navigate("Comentario", {id: this.props.infoPost})}>
                    <Text style = {styles.textButton}>Cantidad total de comentarios</Text>
                </TouchableOpacity>
                <View style={styles.seccionComments}>
                    <TextInput
                    style={styles.inputComments}
                    onChangeText={(text) => this.setState({ comments: text })}
                    placeholder="Insertar comentario"
                    keyboardType="default"
                    value={this.state.comments}
                    />
                    {this.state.comments === '' ? null : 
                        <TouchableOpacity style={styles.buttonComments} onPress={() => this.Comentario()}>
                            <Text style={styles.textButton}>Comentar</Text>
                        </TouchableOpacity>
                    }
                </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    height: '60vh',
    width: '100vw',
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    marginHorizontal: 20,
    padding: 5,
    marginVertical: 5
  },
  camera: {
    width: '50%',
    height: 220,
  },
  input: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'salmon',
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'salmon',
    width: '30%',
  },
  texto:{
    color: 'black',
    fontSize: 15,
    

  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'

  },
});

export default Post;
