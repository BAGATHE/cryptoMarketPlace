import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function ConfirmationPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Opération en attente de validation</Text>
      <Button title="Retour à l'accueil" onPress={() => navigation.navigate('Home')} />
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
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});
