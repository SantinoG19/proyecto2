import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';


class Login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            password:'',
            textError:''
        }
    }


  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("Menu");
      }
    });
  }

  login(email, pass) {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((response) => {
        this.props.navigation.navigate("Menu");
      })
      .catch((error) => {
        if (error.code == 'auth/internal-erro'){
          this.setState({
            textError: "El mail o contraseña es incorrecto"
            
          })
        }
        else {
        this.setState({
          textError: error.message
      })}
        console.log(error);
      });
  }


  
    render(){
        return(
              <View style={styles.formContainer}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder=' email'
                    keyboardType='default'
                    value={this.state.email}
                    />
                  <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='email-address'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                  {this.state.email.length > 0 && this.state.password.length > 0 ? 

                  
                  <TouchableOpacity style={styles.button}
                    onPress={() => this.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Login</Text>
                  </TouchableOpacity> :
                  <TouchableOpacity style={styles.errorButton} onPress={()=> this.setState({textError: 'Debes completar los campos vacios'})}>
                  <Text style={styles.textButton} > Login</Text>    
                  </TouchableOpacity> }  
                  {this.state.textError.length > 0 ? <Text style={styles.textError}> {this.state.textError} </Text> : false }
                  <TouchableOpacity style={styles.buttonRegister} onPress={() => this.props.navigation.navigate('Register')}>
                    
                    <Text> ¿No tienes cuenta? Registrate </Text>    
    
                </TouchableOpacity>  
                </View>
            
        )
    }

}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
      height:20,
      paddingVertical:15,
      paddingHorizontal: 10,
      borderWidth:1,
      borderColor: '#ccc',
      borderStyle: 'solid',
      backgroundColor:'#ccc',
      borderRadius: 6,
      marginVertical:10,
  },
    title:{
      fontWeight: 'bold',
      color: 'purple',
      marginTop:10,
      fontSize: 20
    },
    button:{
        
        backgroundColor:'purple',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'purple'
    },
    textButton:{
        color: '#fff'
    },
    errorButton:{
      flex:1,
      backgroundColor:'#896a92',
      paddingHorizontal: 10,
      color: 'white',
      paddingVertical: 6,
      borderRadius:4, 
      
    },
    buttonRegister:{
        color: '#000',
        padding: 10,
        marginVertical: 15, 
        
        borderSolid: 'solid',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#28a745",

    }
    
});

export default Login;
