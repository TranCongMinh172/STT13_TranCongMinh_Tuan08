

import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function SignUp({Navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');


  const dangKy =()=>{
    const data = {
        name:name,
        email: email,
        password, password,
   
    }
    fetch('https://654bab935b38a59f28ef7db7.mockapi.io/account', {
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(data)
    }).then(res=>{
        if(res.ok){
            return res.json();
        }
    }).then(json =>{console.log(json)})

    setName("")
    setEmail("")
    setPassword("")
    setResult('Đăng ký thành công')
  }

  return (
    <View style={styles.container}>
         <TouchableOpacity  onPress={() => navigation.navigate('Login')}>
        <Text >go Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Đăng ký</Text>
     
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      /> */}
      
      <TouchableOpacity style={styles.registerButton} onPress={dangKy}>
        <Text style={styles.registerButtonText}>Đăng ký</Text>
      </TouchableOpacity>

      <Text style={{fontSize:20, fontFamily:'arial',fontWeight:500}}>{result}</Text>
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
  registerButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
  },
  registerButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
