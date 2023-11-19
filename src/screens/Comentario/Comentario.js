import react, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity} from 'react-native';
import { db, auth } from '../../firebase/config';
import PostCom from '../../componentes/PostCom';
import firebase from 'firebase';

class Comentario extends Component {
    constructor(props){
        super(props)
        this.state={
            listaComments:[],
            comments: '',
            owner: ''
        }
    }

    componentDidMount(){
        db.collection('posts').onSnapshot(
            comentarios => {
                let comentariosAMostrar = [];
                comentarios.forEach( unComentario => {
                    if (unComentario.id == this.props.route.params.id.id) {
                        comentariosAMostrar.push({
                            creador: auth.currentUser.email,
                            id: unComentario.id,
                            datos: unComentario.data()
                        })
                    }
                })
                this.setState({
                    listaComments: comentariosAMostrar
                })
            }
        )
    }

    Comentario(){
        db.collection("posts").doc(this.props.route.params.id.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion({autor: auth.currentUser.email, texto: this.state.comments, createdAt: Date.now()})
        })
        .then(
            this.setState({
                comments: ''
            })
        )
    }

    // cree un nuevo componente y screen para comentarios pero no se si esta bien. Hay que ver si se puede iterar la FlatList
    render(){
        console.log(this.state.listaComments);
        console.log(this.props.route.params.id.id);
        return(
            <View>
                {this.state.listaComments.length === 0 
                ?
                <Text>Cargando...</Text>
                :
                <FlatList
                    data= {this.state.listaComments}
                    keyExtractor={ unComentario => unComentario.id }
                    renderItem={ ({item}) => <PostComentario infoPostComentario = { item } navigation = {this.props.navigation} id = {this.state.listaComments.id}/> }
                />}
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
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
      flex: 1,
      flexDirection: 'column',
      paddingTop: 5,
      paddingLeft: 10,
      margin: 15,
      backgroundColor: 'lightgrey',
      borderRadius: 5,

    },
    inputComments: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
        width: 225,
      },
    button: {
      backgroundColor: "white",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "black",
      width: 100,
    },
    buttonComments: {
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        width: "30%",
        height: '130%',
        marginLeft: 10,
        marginTop: 10
    },
    buttonCommentariosTotales: {
        backgroundColor: "grey",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 7,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        width: "64%",
        marginTop: 10
    },
    seccionComments: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    textButton: {
      color: "black",
      fontSize: 15,
    },
    image: {
        width: 150,
        height: 150,
    }
});

export default Comentario;