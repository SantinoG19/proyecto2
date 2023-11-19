import react, { Component } from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

class PostCom extends Component {
    constructor(props){
        super(props)
        this.state={
            img: '',
            description: '',
            date: '',
            email: '',
            likes: '',
            comments: '',
        }
    }

    render(){
        console.log(this.props.infoPostComentario.datos);
        return(
            <View style={styles.contenedor}>
                <View>
                {this.props.infoPostComentario.datos.comments.length === 0 
                ?
                <Text>Aún no hay comentarios</Text>
                :
                <FlatList
                    data= {this.props.infoPostComentario.datos.comments.reverse()}
                    keyExtractor={ id => id.toString() }
                    renderItem={ ({item}) => <Text style={styles.ContCom}>{item.autor} <br/> {item.texto}</Text> }
                /> }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
       justifyContent: 'center',
       alignContent: 'center',
      },
    ContCom: {
      flex: 1,
      paddingTop: 5,
      paddingBottom: 10,
      paddingLeft: 10,
      margin: 4,
      backgroundColor: 'lightgrey',
      borderRadius: 5,
      },
});

export default PostCom