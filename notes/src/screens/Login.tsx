import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import WrapperContainer from '../components/WrapperContainer/WrapperContainer';
import {RootNavigatorProps} from '../navigators/AppNavigator';
interface MyProps {
  navigation: StackNavigationProp<RootNavigatorProps, 'Login'>;
}

const Login = ({navigation}: MyProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [badEmail, setBadEmail] = useState<boolean>(false);
  const [badPassword, setBadPassword] = useState<boolean>(false);
  const validate = () => {
    let valid = true;

    if (email === '') {
      setBadEmail(true);
      valid = false;
    } else {
      setBadEmail(false);
    }

    if (password === '') {
      setBadPassword(true);
      valid = false;
    } else {
      setBadPassword(false);
    }

    return valid;
  };
  const login = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = {email: email, password: password};
    const res = await fetch('http://localhost:8000/api/auth/login', {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);

    navigation.navigate('Home', {id: data._id});
    Alert.alert('User login successfully !!!');
  };
  return (
    <WrapperContainer style={{flex: 1, backgroundClip: 'white'}}>
      <View>
        <View style={{paddingTop: 100, paddingHorizontal: 20}}>
          <Text style={{fontSize: 25}}>Welcome Back</Text>
          <View style={{paddingVertical: 20}}>
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
          <View>
            <TextInput
              value={password}
              onChangeText={e => setPassword(e)}
              style={{
                borderWidth: 1,
                borderColor: 'grey',
                height: 40,
                paddingStart: 20,
              }}
              placeholder="Enter password"
              autoCapitalize={'none'}
              autoCorrect={false}
            />
            {badPassword && (
              <Text style={{color: 'red'}}>Please enter password</Text>
            )}
          </View>
          <View style={{marginTop: 20}}>
            <TouchableOpacity
              onPress={() => {
                if (validate()) {
                  login();
                }
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
                height: 45,
                borderRadius: 10,
              }}>
              <Text style={{color: 'white'}}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 20}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                height: 45,
                borderRadius: 10,
              }}>
              <Text>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default Login;
