import React, { useState } from 'react';
import { View, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Appbar,Title,Button,TextInput} from 'react-native-paper';
import { useRoute } from "@react-navigation/native";
import database from '@react-native-firebase/database';
export default function DepotScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { userId } = route.params;

    const handleDeposit = () => {
      if (!amount || isNaN(amount)) {
        Alert.alert('Erreur', 'Veuillez entrer un montant valide');
        return;
      }
  
      setLoading(true); 
  
      const currentDate = new Date().toISOString();
  
      const transaction = {
        userId: userId, 
        montant: parseFloat(amount), 
        type: 'depot', 
        date: currentDate, 
      };
  
      database()
        .ref('transactionFond')
        .push(transaction)
        .then(() => {
          setLoading(false); 
          Alert.alert('Succès', 'Dépôt enregistré avec succès Opération en attente de validation');
          setAmount(''); // Réinitialise le champ de saisie
        })
        .catch((error) => {
          setLoading(false); // Arrête le chargement en cas d'erreur
          Alert.alert('Erreur', 'Une erreur est survenue lors de l\'enregistrement du dépôt');
          console.error(error); // Affiche l'erreur dans la console
        });
    };
  

    return (
      <View style={styles.container}>
        <Appbar.Header style={[styles.appBar, { backgroundColor: '#002967' }]}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Transaction Fond" color="white" />
        <Appbar.Action icon="bell-outline" onPress={() => {}} color="white" />
      </Appbar.Header>
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
