import React, { useState } from 'react';
import { View, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';

export default function RetraitScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWithdrawal = () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Erreur', 'Veuillez entrer un montant valide');
      return;
    }
    setLoading(true); // Démarre le chargement
    setTimeout(() => {
      setLoading(false); // Arrête le chargement après 2 secondes (simule un traitement)
      Alert.alert('Retrait', 'En attente de validation');
      setAmount('');
      navigation.navigate('ConfirmationPage'); // Redirige vers une page de confirmation
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Retrait</Title>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: "#F44336",
  },
  loading: {
    marginVertical: 20,
  },
});
