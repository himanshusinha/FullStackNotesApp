import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import WrapperContainer from '../components/WrapperContainer/WrapperContainer';
import {RootNavigatorProps} from '../navigators/AppNavigator';
import {useRoute} from '@react-navigation/native';
interface MyProps {
  navigation: StackNavigationProp<RootNavigatorProps, 'Login'>;
}

type Notes = {
  id: string;
  title: string;
  description: string;
};

const Home = ({navigation}: MyProps) => {
  const route = useRoute();
  useEffect(() => {
    getNotes();
  }, []);
  const [notesList, setNotesList] = useState<Notes[]>([]);

  const getNotes = async () => {
    const headers = new Headers();
    const res = await fetch(
      'http://localhost:8000/api/notes/getNotes/' + route.params.id,
      {
        headers: headers,
        method: 'GET',
      },
    );
    const data = await res.json();
    setNotesList(data);
  };
  const deleteNotes = async (id: string) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const res = await fetch(
      'http://localhost:8000/api/notes/deleteNotes/' + id,
      {
        headers: headers,
        method: 'DELETE',
      },
    );
    const data = await res.json();
    console.log(data);
    getNotes();
  };
  return (
    <WrapperContainer style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {notesList.length > 0 ? (
          <FlatList
            data={notesList}
            renderItem={({item, index}: {item: Notes; index: number}) => {
              return (
                <View
                  style={{
                    paddingHorizontal: 20,
                    height: 40,
                    borderWidth: 1,
                    borderColor: 'black',
                    margin: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <TouchableOpacity>
                      <Text>{item.title}</Text>
                      <Text>{item.description}</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('AddNotes', {
                          id: route?.params?.id,
                          type: 'EDIT',
                          data: item,
                        });
                      }}>
                      <Text style={{color: 'blue'}}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        deleteNotes(item._id);
                      }}>
                      <Text style={{color: 'red'}}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No notes found</Text>
          </View>
        )}
      </View>
      <View style={{alignItems: 'flex-end', padding: 10}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddNotes', {
              id: route?.params?.id,
              type: 'NEW',
            });
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '40%',
            borderRadius: 10,
            height: 50,
            backgroundColor: 'black',
          }}>
          <Text style={{color: 'white'}}>Add Notes</Text>
        </TouchableOpacity>
      </View>
    </WrapperContainer>
  );
};

export default Home;
