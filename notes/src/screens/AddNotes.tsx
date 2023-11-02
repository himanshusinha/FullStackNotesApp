import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import WrapperContainer from '../components/WrapperContainer/WrapperContainer';
import {RootNavigatorProps} from '../navigators/AppNavigator';
import {useRoute} from '@react-navigation/native';
interface MyProps {
  navigation: StackNavigationProp<RootNavigatorProps, 'AddNotes'>;
}

const AddNotes = ({navigation}: MyProps) => {
  const route = useRoute();
  const [title, setTitle] = useState<string>(
    route.params.type == 'EDIT' ? route.params.data.title : '',
  );
  const [description, setDescription] = useState<string>(
    route.params.type == 'EDIT' ? route.params.data.description : '',
  );
  const [badTitle, setBadTitle] = useState<boolean>(false);
  const [badDescription, setBadDescription] = useState<boolean>(false);

  const validate = () => {
    let valid = true;

    if (title === '') {
      setBadTitle(true);
      valid = false;
    } else {
      setBadTitle(false);
    }

    if (description === '') {
      setBadDescription(true);
      valid = false;
    } else {
      setBadDescription(false);
    }

    return valid;
  };
  const addNotes = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = {
      title: title,
      description: description,
      postedBy: route.params.id,
    };
    const res = await fetch('http://localhost:8000/api/notes/addNotes', {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);

    // navigation.navigate('Home');
    Alert.alert('Notes created successfully !!!');
  };
  const updateNotes = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = {
      title: title,
      description: description,
      postedBy: route.params.id,
    };
    const res = await fetch(
      'http://localhost:8000/api/notes/updateNotes/' + route.params.data._id,
      {
        headers: headers,
        method: 'PUT',
        body: JSON.stringify(body),
      },
    );
    const data = await res.json();
    navigation.goBack();
    console.log(data);
  };

  return (
    <WrapperContainer style={{flex: 1, backgroundClip: 'white'}}>
      <View>
        <View style={{paddingTop: 100, paddingHorizontal: 20}}>
          <Text style={{fontSize: 25}}>Create New Notes</Text>
          <View style={{paddingVertical: 20}}>
            <TextInput
              value={title}
              onChangeText={e => setTitle(e)}
              autoCapitalize={'none'}
              autoCorrect={false}
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                height: 40,
                paddingStart: 20,
              }}
              placeholder="Enter title"
            />
            {badTitle && <Text style={{color: 'red'}}>Please enter title</Text>}
          </View>
          <View>
            <TextInput
              value={description}
              onChangeText={e => setDescription(e)}
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                height: 40,
                paddingStart: 20,
              }}
              placeholder="Enter description"
              autoCapitalize={'none'}
              autoCorrect={false}
            />
            {badDescription && (
              <Text style={{color: 'red'}}>Please enter password</Text>
            )}
          </View>
          <View style={{marginTop: 20}}>
            <TouchableOpacity
              onPress={() => {
                if (validate()) {
                  if (route.params.type == 'NEW') {
                    addNotes();
                  } else {
                    updateNotes();
                  }
                }
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
                height: 45,
                borderRadius: 10,
              }}>
              <Text style={{color: 'white'}}>
                {route.params.type == 'EDIT' ? 'Update Notes' : 'Add Notes'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default AddNotes;
