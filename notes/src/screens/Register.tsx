import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import WrapperContainer from '../components/WrapperContainer/WrapperContainer';
import {RootNavigatorProps} from '../navigators/AppNavigator';
interface MyProps {
  navigation: StackNavigationProp<RootNavigatorProps, 'Login'>;
}

const Register = ({navigation}: MyProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [badName, setBadName] = useState<boolean>(false);
  const [badEmail, setBadEmail] = useState<boolean>(false);
  const [badPassword, setBadPassword] = useState<boolean>(false);
  const validate = () => {
    let valid = true;
    if (name == '') {
      setBadName(true);
      valid = false;
    } else if (name !== '') {
      setBadName(false);
    }
    if (email == '') {
      setBadEmail(true);
      valid = false;
    } else if (email !== '') {
      setBadEmail(false);
    }
    if (password == '') {
      setBadPassword(true);
      valid = false;
    } else if (password !== '') {
      setBadPassword(false);
    }
    return valid;
  };

  const register = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = {name: name, email: email, password: password};
    const res = await fetch('http://localhost:8000/api/auth/register', {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);
    navigation.goBack();
    Alert.alert('User created successfully !!!');
  };
  return (
    <WrapperContainer style={{flex: 1, backgroundClip: 'white'}}>
      <View>
        <View style={{paddingTop: 100, paddingHorizontal: 20}}>
          <Text style={{fontSize: 25}}>Create Account</Text>
          <View style={{paddingVertical: 20}}>
            <TextInput
              value={name}
              onChangeText={e => setName(e)}
              autoCapitalize={'none'}
              autoCorrect={false}
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                height: 40,
                paddingStart: 20,
              }}
              placeholder="Enter name"
            />
            {badName && <Text style={{color: 'red'}}>Please enter name</Text>}
          </View>
          <View>
            <TextInput
              value={email}
              onChangeText={e => setEmail(e)}
              autoCapitalize={'none'}
              autoCorrect={false}
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                height: 40,
                paddingStart: 20,
              }}
              placeholder="Enter email"
            />
            {badEmail && <Text style={{color: 'red'}}>Please enter email</Text>}
          </View>
          <View style={{marginTop: 20}}>
            <TextInput
              value={password}
              onChangeText={e => setPassword(e)}
              autoCapitalize={'none'}
              autoCorrect={false}
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                height: 40,
                paddingStart: 20,
              }}
              placeholder="Enter password"
            />
            {badPassword && (
              <Text style={{color: 'red'}}>Please enter password</Text>
            )}
          </View>

          <View style={{marginTop: 20}}>
            <TouchableOpacity
              onPressIn={() => {
                if (validate()) {
                  register();
                }
              }}
              onPress={() => navigation.navigate('Register')}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                height: 45,
                borderRadius: 10,
                backgroundColor: 'black',
              }}>
              <Text style={{color: 'white'}}>Create Account</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                height: 45,
                borderRadius: 10,
              }}>
              <Text>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default Register;
