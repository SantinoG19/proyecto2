import { Text, View, TextInput, TouchableOpacity, StyleSheet,FlatList} from 'react-native'
  import React, { Component } from 'react'
  import {db, auth} from '../../firebase/config'
  import firebase from 'firebase'
  import Post from '../../componentes/Post'
  
  
  class Comentario extends Component {
    constructor(props){
      super(props)
      this.state = {
        nuevoComentario:'',
        id:'',
        data:{}
      }
    }
  
    componentDidMount() {
      if (this.props.route && this.props.route.params && this.props.route.params.id) {
        const postId = this.props.route.params.id;
        db
          .collection('post')
          .doc(postId)
          .onSnapshot(com => {
            if (com.exists) {
              this.setState({
                id: postId,
                data: com.data(),
              });
            } else {
              // Manejar el caso en el que el documento no existe
            }
          });
      } else {
        // Manejar el caso en el que el parámetro id no está disponible
      }
    }
    
  
    addComment(idDoc, text){
      db
      .collection('post')
      .doc(idDoc)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          owner:auth.currentUser.email,
          createdAt: Date.now(),
          comment: text
        })
      })
    }
  
    render() {
      return (
        <View>
          {this.state.data?.comments?.length === 0 ?
          <View style={styles.texto}>
            <Text>
              No hay comentarios!
            </Text> 
            
          </View>
        :
        <View style={styles.texto}>
            <FlatList
            data={this.state.data.comments}
            keyExtractor={item => item.createdAt.toString()}
            renderItem={({item}) => <View>
              <Text style={styles.textox}>{item.owner} comentó:</Text>
              <Text style={styles.textox}>{item.comment}</Text>
            </View>
              }
            />
          </View>
        }
          
          <View style={styles.boton}>
            <TextInput
              onChangeText={text => this.setState({nuevoComentario: text})}
              style = {styles.input}
              keyboardType='default'
              placeholder='Agrega un comentario'
              value={this.state.nuevoComentario}
            />
            <TouchableOpacity onPress={()=> this.addComment(this.state.id, this.state.nuevoComentario)}>
              <Text style={styles.boton}>Enviar comentario</Text>
            </TouchableOpacity>
          </View>

          <Text onPress={ () => this.props.navigation.navigate ("PostForm")} style={styles.botonx}>Volver al inicio</Text>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    input: {
      justifyContent: 'center',
      textAlign: 'center' ,
      fontFamily: 'monospace',
    } ,

    texto:{
      backgroundColor: 'rgb(255,255,242)',
      fontFamily: 'monospace',
      fontSize: 13,
      margin: 14,
      borderRadius: 12,
      textAlign: 'center',
      color: 'rgb(128, 128, 128)',
      padding: 8

  }, 

  textox:{
    backgroundColor: 'rgb(255,255,242)',
    fontFamily: 'monospace',
    fontSize: 13,
    margin: 1,
    borderRadius: 12,
    textAlign: 'center',
    color: 'rgb(128, 128, 128)',
    padding: 8

}, 

  boton:{
    fontFamily: 'monospace',
    fontSize: 16,
    margin: 10,
    backgroundColor: 'rgb(173, 216, 230)',
    borderRadius: 20,
    textAlign: 'center',
    padding: 5
  
  },

  botonx:{
    fontFamily: 'monospace',
    fontSize: 16,
    margin: 10,
    backgroundColor: 'rgb(173, 216, 230)',
    borderRadius: 20,
    textAlign: 'center',
    justifyContent: 'flex-end' ,
    padding: 5
  
  },
  })
  
  export default Comentario