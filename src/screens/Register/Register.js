import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Cam from "../../componentes/Cam";


class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            password:'',
            bio:'',
            fotoPerfil: '',
            formError: false,
        }
    }

    register(email,pass,userName,bio,fotoPerfil){
        if(this.state.email == '' || this.state.email.includes("@") == false){
            return this.setState({formError: "Por favor ingrese un email valido"})
        }else if (this.state.password == '' || this.state.password.length <6){
            return this.setState({formError: "La contraseña debe tener 6 caracteres"})
    
        }
        auth.createUserWithEmailAndPassword(email,pass)
        .then( response => {
            console.log(response);
            db.collection("user").add({
                owner: email,
                createdAt: Date.now(),
                userName: userName,
                bio: bio,
                fotoPerfil: fotoPerfil
            })
            this.props.navigation.navigate("Login")
        })
        .catch((error) => {
            this.setState({
              formError: error.message
          })
            console.log(error);
          });

          

}

    render(){
        return(
           
            
              <View style={styles.formContainer}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='* email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                 <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder=' User name'
                    keyboardType='default'
                    value={this.state.userName}
                    />
                  <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='email-address'
                    secureTextEntry={true}
                    value={this.state.password}

                />
                <TextInput
                        style={styles.input}
                        onChangeText={(bio)=>this.setState({bio: bio})}
                        placeholder='Escribe una mini biografia'
                        keyboardType='default'
                        value={this.state.bio}
                        />

                
                    <TextInput
                        style={styles.input}
                        onChangeText={(url)=>this.setState({fotoPerfil: url})}
                        placeholder='Subi la url de tu foto de perfil'
                        keyboardType='default'
                        value={this.state.fotoPerfil}
                        />

                    {this.state.email.length > 0 && this.state.password.length >0 && this.state.userName.length > 0 ? 

                    <TouchableOpacity style={styles.button} onPress={()=> 
                    this.register(this.state.email, this.state.password, this.state.userName)}>
                        
                        
                        <Text style={styles.textButton} > Registrate</Text>    

                    </TouchableOpacity> : 

                    <TouchableOpacity style={styles.buttonError} onPress={()=> this.setState({formError: 'Debes completar los espacios requeridos'})}>
                        <Text style={styles.textButton} > </Text>    
                    </TouchableOpacity> }
                
                {this.state.formError.length > 0 ? <Text style={styles.formError}> {this.state.formError} </Text> : false }
                
                <TouchableOpacity style={styles.buttonLogin} onPress={() => this.props.navigation.navigate('Login')}>
                    
                    <Text> Iniciar sesión </Text>    
                    
    
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
    button:{
        
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    title:{
        fontWeight: 'bold',
        color: 'green',
        marginTop:10,
        fontSize: 20
      },
    textButton:{
        color: '#fff'
    },
    buttonLogin:{
        color: 'purple',
        padding: 10,
        marginVertical: 15, 
        
        borderSolid: 'solid',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "purple",

    }
});

export default Register;
