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
    if (email === '') {
      return this.setState({
        error: 'Debes completar el espacio de email'
      })
    } else if (pass === '') {
        return this.setState({
          error: 'Debes completar el espacio de contraseña'
        })
    }

    auth.signInWithEmailAndPassword(email, pass)
      .then((response) => {
        console.log("Se logueo correctamente", response);
        this.props.navigation.navigate("Menu");
      })
      .catch((error) => {
        console.log(error);
      });
  }
    render(){
        return(
              <View style={styles.formContainer}>
                <Text>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='* email'
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

                 <TouchableOpacity style={styles.button} onPress={()=> 
                this.login(this.state.email, this.state.password)}>
                    
                    <Text style={styles.textButton} > Login </Text>    
                
                </TouchableOpacity> 

            
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
        borderRadius: 6,
        marginVertical:10,
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
    buttonRegister:{
        color: '#000',
        padding: 10,
        marginVertical: 15, 
        
        borderSolid: 'solid',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "red",

    }
    
});

export default Login;
