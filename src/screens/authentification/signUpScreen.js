// screens/SignUp.js
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function  SignUp({ navigation }) {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an account</Text>
        <TextInput
          label="Name"
          mode="flat"
          style={styles.input}
          underlineColor="#e0e0e0"
        />
        
        <TextInput
          label="Email"
          mode="flat"
          style={styles.input}
          keyboardType="email-address"
          underlineColor="#e0e0e0"
        />
        
        <TextInput
          label="Phone number"
          mode="flat"
          style={styles.input}
          keyboardType="phone-pad"
          underlineColor="#e0e0e0"
        />
        
        <TextInput
          label="Password"
          mode="flat"
          style={styles.input}
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          underlineColor="#e0e0e0"
        />
        
        <TextInput
          label="Confirm password"
          mode="flat"
          style={styles.input}
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          underlineColor="#e0e0e0"
        />
        
        <Button
          mode="contained"
          onPress={() => {/* Ajoutez votre logique d'inscription */}}
          style={styles.signupButton}
          labelStyle={styles.signupButtonText}
        >
          Sign up
        </Button>

        <View style={styles.loginSection}>
          <Text style={styles.loginText}>Already have an Account? </Text>
          <Text 
            style={styles.loginLink}
            onPress={() => navigation.navigate('SignIn')}
          >
            Log in
          </Text>
        </View>

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
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  signupButton: {
    marginTop: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  signupButtonText: {
    fontSize: 16,
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  loginText: {
    color: '#666',
  },
  loginLink: {
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
  }
});