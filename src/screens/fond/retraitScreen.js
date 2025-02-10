import React, { useState } from 'react';
import { View, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Appbar,Title,Button,TextInput} from 'react-native-paper';
import { useRoute } from "@react-navigation/native";
import database from '@react-native-firebase/database';

export default function RetraitScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { email ,fond} = route.params;

  const handleWithdrawal = () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Erreur', 'Veuillez entrer un montant valide');
      return;
    }
    if(parseFloat(fond)< parseFloat(amount)){
      Alert.alert('Warning', 'montant retirer doit etre inferieur au fond');
      return;
    }

    setLoading(true); 

    const currentDate = new Date().toISOString();

    const transaction = {
      email: email, 
      montant: parseFloat(amount), 
      type: 'retrait', 
      date: currentDate, 
    };

    database()
      .ref('transactionFond')
      .push(transaction)
      .then(() => {
        setLoading(false); 
        Alert.alert('Succès', 'Retrait enregistré avec succès');
        setAmount(''); 
      })
      .catch((error) => {
        setLoading(false); 
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'enregistrement du retrait');
        console.error(error); 
      });
  };

  return (
    <View style={styles.container}>
        <Appbar.Header style={[styles.appBar, { backgroundColor: '#002967' }]}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Transaction Fond" color="white" />
        <Appbar.Action icon="bell-outline" onPress={() => {}} color="white" />
      </Appbar.Header>
      <Title style={styles.title}>Retrait</Title>
      <Title style={styles.title}>disponible : {fond} </Title>
      <TextInput
        label="Montant à retirer"
        mode="outlined"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#F44336" style={styles.loading} />
      ) : (
        <Button mode="contained" onPress={handleWithdrawal} style={styles.button}>
          Valider
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#F44336', // Couleur rouge pour le bouton de retrait
  },
  loading: {
    marginTop: 16,
  },
});