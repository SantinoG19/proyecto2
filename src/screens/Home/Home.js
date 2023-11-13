import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import { View, Text} from 'react-native';
import Register from '../Register/Register';


class Home extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            password:'',
        }
    }


    render(){
        return(
              <View>
                <Text>Home</Text>
            
                </View>
            
        )
    }

}

export default Home