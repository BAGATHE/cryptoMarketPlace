import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { sendLoginRequest,updateOtpStatus,waitForResponse,handleUserAuthentication} from '@services/firebaseService';
import { ActivityIndicator } from 'react-native-paper';
import database from '@react-native-firebase/database';



export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(90);
  const [requestId, setRequestId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [otpStatus, setOtpStatus] = useState(null);


  useEffect(() => {
    let countdown;
    if (otpSent && timer > 0 && otpStatus !== "success") {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (otpStatus === "success" || timer === 0) {
      clearInterval(countdown);
      if (timer === 0) {
        Alert.alert('OTP Expiré', 'Veuillez vous reconnecter.');
        setOtpSent(false);
        setTimer(90);
        setOtp("");
        setRequestId(null);
      }
    }
    return () => clearInterval(countdown);
  }, [otpSent, timer, otpStatus]); 
  

  const handleSignIn = async () => {
    if (email && password) {
      try {
        setIsLoading(true);
        const reqId = await sendLoginRequest(email, password);
        setRequestId(reqId);        
        const responseRef = database().ref(`/requests/${reqId}`);
        // Attente active jusqu'à ce que response soit rempli
        const data = await waitForResponse(responseRef);
        // Une fois la réponse reçue, continuer le processus normalement
        let cleanedResponse = data.response.replace(/[\u0000-\u001F\u007F-\u009F]/g, "").trim();
        let responseObject = JSON.parse(cleanedResponse);
        let code = responseObject?.code || 200;
        let message = responseObject?.data?.message || "utilisateur non trouver veuillez revenir en arriere";

        if (code === 401) {
          Alert.alert("Erreur", responseObject.error?.message);
          responseRef.remove();
        } 
        if(code === 200 ) {
          setIsLoading(false);
          setOtpSent(true);
          Alert.alert("OTP Envoyé", message);
          setTimer(90);
        } else {
          setIsLoading(false);
          Alert.alert("Erreur", responseObject.error?.message || "Erreur inconnue");
          responseRef.remove();
        }
      } catch (error) {
        setIsLoading(false);
        Alert.alert("Erreur", "Échec de l'envoi de l'OTP. Veuillez réessayer.");
      }
    } else {
      Alert.alert("Erreur de validation", "Veuillez remplir l'email et le mot de passe.");
    }
  };
    
  const handleVerifyOtp = async () => {
    if (otp && requestId) {
      try {
        await updateOtpStatus(requestId, otp);
        const responseRef = database().ref(`/requests/${requestId}`);
  
        responseRef.on('value', async (snapshot) => {
          const data = snapshot.val();
          if (data && data.status === "success") {
            setOtpStatus("success"); 
            setOtp(false);
            responseRef.remove();
  
            await handleUserAuthentication(email);
  
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              navigation.navigate("Home", { email: email });
            }, 5000);
          }
        });
      } catch (error) {
        Alert.alert("Erreur", error.message);
      }
    } else {
      Alert.alert("Erreur de validation", "Veuillez entrer l'OTP.");
    }
  };
  
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>{otpSent ? 'Enter OTP' : 'Sign In'}</Text>

        {isLoading ? (
          // Afficher l'indicateur d'activité pendant le chargement
          <ActivityIndicator animating={true} color={'red'} size="large" />
        ) : (
          <>
            {!otpSent ? (
              <>
                <TextInput
                  label="Email"
                  mode="flat"
                  style={styles.input}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                <TextInput
                  label="Password"
                  mode="flat"
                  style={styles.input}
                  secureTextEntry
                  right={<TextInput.Icon icon="eye" />}
                  value={password}
                  onChangeText={setPassword}
                />
                <Button mode="contained" style={styles.buttonCto} onPress={handleSignIn}>
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
                  value={otp}
                  onChangeText={setOtp}
                />
                <Text style={styles.timerText}>OTP expires in: {timer}s</Text>
                <Button mode="contained" onPress={handleVerifyOtp} style={styles.buttonCto}>
                  Verify OTP
                </Button>
              </>
            )}
          </>
        )}
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    marginTop: 40,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'white',
  },
  buttonCto: {
    marginVertical: 10,
    backgroundColor: '#002967',
    width: '100%',
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginVertical: 10,
  },
});
