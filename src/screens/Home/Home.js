import react, { Component } from "react";
import {
  
  View,
  Text,
  StyleSheet,
  FlatList 
} from "react-native";
import Post from "../../componentes/Post";

import { auth, db } from "../../firebase/config";



class Home extends Component {
  constructor() {
    super();
    this.state = {listaPost: []};
  }

  componentDidMount(){
    //Traer datos
    db.collection('posts').orderBy('createdAt' , 'desc').onSnapshot(
        posteos => {
            let posts = [];

            posteos.forEach( unPost => {
                posts.push(
                    {
                        id: unPost.id,
                        datos: unPost.data()
                    }
                )
            })

            this.setState({
                listaPost: posts
            })
        }
    )
}


  render() {
    console.log(this.state.listaPost);
    return (
      < >
        <Text style={styles.title}>HOME</Text>

        <Text style={styles.lista}>Lista de Posteos</Text>
                {
                    this.state.listaPost.length === 0 
                    ?
                    <Text>Cargando...</Text>
                    :

                    
                    <FlatList 
                        data= {this.state.listaPost}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post infoPost = { item } /> }
                    />
                }

      </>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: '100vh',
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20,
    marginVertical: 10,
    color:'#4169E1'
},
lista:{
  fontSize: 15,
  color:'#4169E1',

}
});

export default Home;