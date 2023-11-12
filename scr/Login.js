import React from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [err, setErr] = React.useState('');

  const handleLogin = () => {
    console.log('click');
    // Xử lý đăng nhập ở đây
    fetch('https://654bab935b38a59f28ef7db7.mockapi.io/account?email=' + email)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((json) => {
        console.log(json);
        if (password === json[0].password) {
          navigation.navigate('DisplayNote', {json});
        } else {
          setErr('Password không đúng');
        }
      })
      .catch((err) => {
        setErr('Email không đúng');
      });
  };

  const handleRegister = () => {
    // Xử lý chuyển hướng đến màn hình đăng ký
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Đăng ký</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 20, fontFamily: 'arial', fontWeight: '500', marginTop: 15, color: 'red' }}>{err}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
  },
  registerButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
