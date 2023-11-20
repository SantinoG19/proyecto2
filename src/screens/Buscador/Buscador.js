import react, { Component } from 'react';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import { db, auth } from '../../firebase/config';


class Buscador extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      results: [],
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
        results: info,
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
    const filteredResults = this.state.results.filter((user) =>
      user.datos.userName.toLowerCase().includes(this.state.search.toLowerCase())
    );

    console.log(filteredResults)
    console.log(this.state.results);
    return (
      <View >
        <TextInput
          placeholder="Search by username ..."
          keyboardType="default"
          value={this.state.search}
          style={styles.input}
          onChangeText={(text) => this.setState({ search: text })}
        />

        <FlatList
          data={filteredResults}
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
                       /> }
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
    backgroundColor:'#eae0ed',
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
});

export default Buscador;