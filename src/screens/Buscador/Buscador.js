 import React, { Component } from "react";
import { TextInput, View, Text, FlatList, TouchableOpacity, StyleSheet , Image} from "react-native";

import { auth, db } from "../../firebase/config";

class Buscador extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buscador: "",
      resultado: [],
      selectedUser: "",
    };
  }


  componentDidMount() {
      db.collection("user").onSnapshot((snapshot) => {
      let info = [];
      snapshot.forEach((doc) => {
        info.push({
          id: doc.id,
          datos: doc.data(),
        });
      });

      this.setState({
        resultado: info,
      });
    });
  }



  handleUserSelect(selectedUser) {

    this.props.navigation.navigate('Profile', selectedUser );
  }

  render() {

    const ResultadoFilter = this.state.resultado.filter((user) =>
      user.datos.userName.toLowerCase().includes(this.state.buscador.toLowerCase())
    );

    console.log(ResultadoFilter)

    return (
      <View >
        <TextInput
          placeholder="Busca un usuario..."
          keyboardType="default"
          value={this.state.buscador}
          style={styles.input}
          onChangeText={(text) => this.setState({ buscador: text })}
        />

        <FlatList
          data={ResultadoFilter}
          keyExtractor={(user) => user.id}
          style={styles.container}
          renderItem={({ item }) => (
            <TouchableOpacity 
            onPress={() => this.handleUserSelect(item.datos.owner)}
            style={styles.containerProfile}>
              {item.datos.profilePic != '' ?
                    <Image 
                        style={styles.profilePic} 
                        source={{uri:item.datos.profilePic}}
                        resizeMode='contain'/> :
                        <Image 
                      
                        resizeMode='contain'/> }
              <View>
              <Text >{item.datos.userName}</Text>
              <Text style={styles.email}>{item.datos.owner}</Text>
              
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{marginLeft:10,},
  email:{color:'grey'},
  containerProfile:{
    flexDirection: 'row',
    height:50
  },
  input: {
    height: 40,
    backgroundColor:'blue',
    paddingLeft: 10,
    margin:10,
    borderRadius:15,
  },
  profilePic:{
    height:40,
    width:40,
    borderWidth:2,
    borderRadius:25,
    borderColor:'white',
    marginRight:10
},
})

export default Buscador; 