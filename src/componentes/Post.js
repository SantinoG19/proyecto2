import React, { Component } from 'react';
import {
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase/app';
import 'firebase/firestore';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      comentario: '',
    };
  }

  componentDidMount() {
    
    const likes = this.props.infoPost.datos.likes;

    if (likes.includes(auth.currentUser.email)) {
      this.setState({
        like: true,
      });
    }
  }

  likear() {
    
    db.collection('posts')
      .doc(this.props.infoPost.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        this.setState({ like: true });
      })
      .catch(error => {
        console.error('Error dando like:', error);
      });
  }

  dislike() {
    
    db.collection('posts')
      .doc(this.props.infoPost.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then(() => {
        this.setState({ like: false });
      })
      .catch(error => {
        console.error('Error quitando like:', error);
      });
  }

  eliminar() {
    
    db.collection('posts')
      .doc(this.props.infoPost.id)
      .delete()
      .catch(error => {
        console.error('Error eliminando el post:', error);
      });
  }

  comentar() {
  
    const { comentario } = this.state;

    db.collection('posts')
      .doc(this.props.infoPost.id)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion(comentario),
      })
      .then(() => {
        this.setState({ comentario: '' });
      })
      .catch(error => {
        console.error('Error agregando comentario:', error);
      });
  }
llevarme(){
  navigation.navigate('Register', {
    postId: this.props.infoPost.id,
    owner: this.props.infoPost.datos.owner,})
};
  render() {
    const { infoPost, navigation } = this.props;

    return (
      <View style={styles.formContainer}>
        <Text>----------------------------------------------------</Text>
        <Text style={styles.texto}>Datos del Post</Text>
        <Text style={styles.texto}>Email: {infoPost.datos.owner}</Text>
        <Text style={styles.texto}>Texto: {infoPost.datos.post}</Text>
        <Image style={styles.camera} source={{ uri: infoPost.datos.photo }} />
        <Text style={styles.texto}>
          Cantidad de Likes: {infoPost.datos.likes.length}
        </Text>

        {/* Botón de like/dislike */}
        {this.state.like ? (
          <TouchableOpacity style={styles.button} onPress={() => this.dislike()}>
            <Text style={styles.textButton}>Dislike</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => this.likear()}>
            <Text style={styles.textButton}>Like</Text>
          </TouchableOpacity>
        )}

        
        {auth.currentUser.email === infoPost.datos.owner && (
          <TouchableOpacity style={styles.button} onPress={() => this.eliminar()}>
            <Text style={styles.textButton}>Eliminar</Text>
          </TouchableOpacity>
        )}

        
        <TouchableOpacity
          onPress={() => this.llevarme()}
        >
          <Text> Cantidad:3</Text>
        </TouchableOpacity>

        {/* {infoPost.datos.comentarios.length} deberia funcionar nose que pasa*/}
        <View>
          <TextInput style={styles.texto}
            onChangeText={(text) => this.setState({ comentario: text })}
            placeholder="Comentario..."
            keyboardType="default"
            value={this.state.comentario}
          />
          <TouchableOpacity onPress={() => this.comentar()}>
            <Text style={styles.texto} >Enviar comentario</Text>
          </TouchableOpacity>
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
    color: '#46627f',
      fontSize: 15,
      fontWeight: 'bold'
   
    
    

  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'

  },
});

export default Post;
