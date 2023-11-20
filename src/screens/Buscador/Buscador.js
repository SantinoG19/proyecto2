import react, { Component } from 'react';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import { db, auth } from '../../firebase/config';


class Buscador extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buscador: "",
      resultado: [],
      selectedUserId: "",
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



  handleUserSelect(selectedUserId) {
    {selectedUserId != auth.currentUser.email ? 
      this.props.navigation.navigate('Profile', selectedUserId )
      :
      this.props.navigation.navigate('MyProfile', selectedUserId )
    }
    console.log(selectedUserId);
  }

  render() {
    const filteredResults = this.state.resultado.filter((user) =>
      user.datos.userName.toLowerCase().includes(this.state.buscador.toLowerCase())
    );

    console.log(filteredResults)
    console.log(this.state.resultado);
    return (
      <View >
        <TextInput
          placeholder="Busca el usuario"
          keyboardType="default"
          value={this.state.buscador}
          style={styles.busc}
          onChangeText={(text) => this.setState({ buscador: text })}
        />

        <FlatList
          data={filteredResults}
          keyExtractor={(user) => user.id}
          style={styles.container}
          renderItem={({ item }) => (
            <TouchableOpacity 
            onPress={() => this.handleUserSelect(item.datos.owner)}
            style={styles.containerProfile}>
             
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
  email:{color:'black'},
  containerProfile:{
    flexDirection: 'row',
    height:50
  },
  busc: {
    height: 40,
    backgroundColor:'red',
    paddingLeft: 10,
    margin:10,
    
  },

});

export default Buscador;