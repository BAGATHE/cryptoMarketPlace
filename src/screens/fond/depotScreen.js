import React, { useState } from 'react';
import { View, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';

export default function DepotScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeposit = () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Erreur', 'Veuillez entrer un montant valide');
      return;
    }
    setLoading(true); // Démarre le chargement
    setTimeout(() => {
      setLoading(false); // Arrête le chargement après 2 secondes (simule un traitement)
      Alert.alert('Dépôt', 'En attente de validation');
      setAmount('');
      navigation.navigate('ConfirmationPage'); // Redirige vers une page de confirmation
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Dépôt</Title>
      <TextInput
        label="Montant à déposer"
        mode="outlined"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loading} />
      ) : (
        <Button mode="contained" onPress={handleDeposit} style={styles.button}>
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
    backgroundColor: "#4CAF50",
  },
  loading: {
    marginVertical: 20,
  },
});
