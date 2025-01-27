// screens/SignIn.js
import { StyleSheet, View, Text, ScrollView,Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import React, { useState } from 'react';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSignIn = () => {
    if (email && password) {
      setOtpSent(true);
      Alert.alert('OTP Sent', 'An OTP has been sent to your email.');
    } else {
      Alert.alert('Validation Error', 'Please fill in both email and password.');
    }
  };

  const handleVerifyOtp = () => {
    if (otp === '123456') {
      Alert.alert('Success', 'You have successfully signed in.');
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
      <Text style={styles.title}>{otpSent ? 'Enter OTP' : 'Sign In'}</Text>
         {!otpSent ? (
            <>
          <TextInput
          label="Email"
          mode="flat"
          style={styles.input}
          keyboardType="email-address"
          underlineColor="#e0e0e0"
          value={email?email:"lol@gmail.com"}
          onChangeText={setEmail}
        />

        <TextInput
          label="Password"
          mode="flat"
          style={styles.input}
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          underlineColor="#e0e0e0"
          value={password?password:'pass'}
          onChangeText={setPassword}
        />
        
        <Button
          mode="contained"
          style={styles.buttonCto}
          onPress={handleSignIn}
          labelStyle={styles.signInButtonText}
        >
          Send OTP
        </Button>
        </>
        ) : (
        <>
         <TextInput
              label="OTP"
              mode="flat"
              style={styles.input}
              keyboardType="numeric"
              underlineColor="#e0e0e0"
              value={otp?otp:'123456'}
              onChangeText={setOtp}
        />

        <Button
              mode="contained"
              onPress={handleVerifyOtp}
              style={styles.buttonCto}
              labelStyle={styles.signInButtonText}
            >
              Verify OTP
        </Button>
        </>
        )}
        {!otpSent && (
        <View style={styles.registerSection}>
          <Text style={styles.registerText}>Don't have an Account? </Text>
          <Text 
            style={styles.registerLink}
            onPress={() => navigation.navigate('SignUp')}
          >
            Register
          </Text>
        </View>
        )}
        <View style={styles.socialSection}>
          <Text style={styles.orText}>Or</Text>
          <Text style={styles.loginWithText}>Login with</Text>

          <View style={styles.socialButtons}>
            <Button
              mode="contained"
              onPress={() => {/* Ajoutez votre logique Facebook */}}
              style={styles.facebookButton}
              icon="facebook"
            >
              Login with Facebook
            </Button>

            <Button
              mode="contained"
              onPress={() => {/* Ajoutez votre logique Gmail */}}
              style={styles.gmailButton}
              icon="google"
            >
              Login with Gmail
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    marginTop: 40,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  signInButton: {
    marginTop: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  signInButtonText: {
    fontSize: 16,
  },
  registerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  registerText: {
    color: '#666',
  },
  registerLink: {
    color: '#000',
    fontWeight: '600',
  },
  socialSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  orText: {
    color: '#666',
    marginBottom: 10,
    fontSize: 16,
  },
  loginWithText: {
    marginBottom: 15,
    fontSize: 16,
  },
  socialButtons: {
    width: '100%',
    gap: 10,
  },
  facebookButton: {
    backgroundColor: '#666',
  },
  gmailButton: {
    backgroundColor: '#666',
  },
  buttonCto: {
    marginVertical: 10,
    backgroundColor:'#002967',
  },
});