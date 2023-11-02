import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import WrapperContainer from '../components/WrapperContainer/WrapperContainer';
import {RootNavigatorProps} from '../navigators/AppNavigator';

interface MyProps {
  navigation: StackNavigationProp<RootNavigatorProps, 'Login'>;
}

const Splash = ({navigation}: MyProps) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <WrapperContainer style={{backgroundColor: 'black', flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Notes App</Text>
      </View>
    </WrapperContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  textStyle: {
    fontSize: 30,
    color: 'white',
  },
});
export default Splash;
