import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { ForgotPassword } from '../store';
const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (email.trim() == '') {
      Alert.alert('Nhập email');
    } else {
      ForgotPassword(email)
      Alert.alert('Đã gửi link reset mật khẩu tới ' + email);
      setEmail('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên mật khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:12,
    alignItems: 'center',
  },
  title: {
    color:'#E92c4c',
    fontWeight:'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width:350,
    height:60,
    padding:10,
    borderColor:"#e92c4c",
    borderWidth:1,
    borderRadius:8,
    backgroundColor:"black"
  },
  button: {
    marginTop:7,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    marginTop:15
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
