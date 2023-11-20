import React, { Component } from 'react';
import { auth, db } from "../../firebase/config";
import Post from '../../componentes/Post';


import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';

class Profile extends Component {
  constructor(){
      super()
      this.state={
          usuario: [],
          listaP: []
      }   
  }
  componentDidMount(){
    
      db.collection("user").where('owner', '==', auth.currentUser.email).onSnapshot(
          docs =>{
              let users = [];
              docs.forEach( doc => {
                  users.push({
                     id: doc.id,
                     data: doc.data()
                  })
              this.setState({
                  usuario: users
              })
              })
          }
      )
      db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
          posteos => {
              let TodosLosPost = [];

              posteos.forEach( unPost => {
                TodosLosPost.push(
                      {
                          id: unPost.id,
                          datos: unPost.data()
                      }
                  )
              })

              this.setState({
                listaP: TodosLosPost
              })
          }
      )
  }



 
 borrar(){

 
 
  auth.currentUser.delete().then(() => {
                  this.props.navigation.navigate('Register', {navigation: this.props.navigation.navigate })
                

                }).catch((error) => {
                   console.log(error)
                })
          }

  logout(){
      auth.signOut()
      .then(() => {
          this.props.navigation.navigate('Login')
          console.log(auth.currentUser.email);
      })
      .catch(e => {console.log(e)})
  }

  render(){
      return(
          <ScrollView>
              <Text style={styles.titulo}>My Profile</Text>
             
              <FlatList 
                      data= {this.state.users}
                      keyExtractor={ user => user.id }
                      renderItem={ ({item}) => <View>
                          <Text>Usuario: {item.data.owner} </Text>
                          <Text>Bio: {item.data.bio}</Text>
                          
                          <Image
                              style={styles.imagen}
                              source={item.data.fotoPerfil}
                              resizeMode="contain"/>
                          
                      </View>
                      }
                      style={styles.datosP}
                  />
              
              <TouchableOpacity style={styles.boton} onPress={()=>this.logout()}>
                  <Text style={styles.textButton}>Log out</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.boton} onPress={()=> this.props.navigation.navigate('EditProfile', { userData: this.state.users,navigation: this.props.navigation.navigate })}>
                  <Text style={styles.textButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.boton} onPress={() => this.borrar()}>
               <Text style={styles.textoBoton}>Delete account</Text>
              </TouchableOpacity>
                 
            
                  
              <Text style={styles.titulo}>My Posts</Text>
              
              {
                  this.state.listaP.length === 0 
                  ?
                  <Image
                     
                  />
                  :
                 
                  <FlatList 
                      data= {this.state.listaP}
                      keyExtractor={ unPost => unPost.id }
                      renderItem={ ({item}) => <Post infoPost = { item } navigate={this.props.navigation.navigate}/> }
                      style= {styles.listaP}
                  />
                  
              }
              
          </ScrollView>
          
      )}
      }

const styles = StyleSheet.create({

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20,
    marginVertical: 10,
    color:'#4169E1'
  },
  imagen: {
      height: 200
  },
 
  datosP:{
      backgroundColor: '#ffffff',
      borderRadius: 6,
      marginHorizontal: 20,
      padding: 5,
      marginVertical: 5,
  },
  mainContainer:{
      flex: 1,
      backgroundColor: 'red',
      borderRadius: 6,
      marginHorizontal: 20,
      padding: 5,
      marginVertical: 5,
      height: 100
  },
  imagen: {
      width: 300, 
      height: 150,
  },
  boton:{
      alignSelf: 'flex-end',
      height:30,
      width: 150,
      backgroundColor:'red',
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: 'center',
      borderRadius:4, 
      borderWidth:1,
      borderStyle: 'solid',
      borderColor: '#46627f',
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center'
  },
  textoBoton:{
      color: 'white',
      textAlign: 'center',
      fontSize: 15,
      fontWeight: 'bold'

  }

}) //

export default Profile;