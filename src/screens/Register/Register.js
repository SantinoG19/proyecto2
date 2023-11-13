import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';


class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            password:'',
            textError: false,
        }
    }

    register(email,pass){
        if(this.state.email == '' || this.state.email.includes("@") == false){
            return this.setState({textError: "You must enter a valid email address"})
        }else if (this.state.password == '' || this.state.password.length <6){
            return this.setState({textError: "Your password must be at least 6 characters long"})
        }else if (this.state.userName == '') {
            return this.setState({textError:'You must complete the username'})
        }
        auth.createUserWithEmailAndPassword(email,pass)
            .then(()=>{
                console.log("Registrado ok");
            })
            .catch(error => {
                console.log(error);
            })

    }

    render(){
        return(
              <View style={styles.formContainer}>
                <Text>Register</Text>
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
                    placeholder='* User name'
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

                 <TouchableOpacity style={styles.button} onPress={()=> 
                this.register(this.state.email, this.state.password)}>
                    
                    <Text style={styles.textButton} > Registrarse </Text>    
                </TouchableOpacity> 

                <TouchableOpacity style={styles.buttonError} onPress={()=> this.setState({textError: 'You must complete the required fields'})}>
                    <Text style={styles.textButton} > Register</Text>    
                </TouchableOpacity> 

                <TouchableOpacity style={styles.buttonRegister} onPress={() => this.props.navigation.navigate('Login')}>
                    
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

export default Register;
