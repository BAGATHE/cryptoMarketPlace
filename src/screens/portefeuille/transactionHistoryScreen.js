// screens/TransactionHistoryScreen.js
import TransactionRow from '@components/TransactionRow';
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Chip, useTheme } from 'react-native-paper';


// Données d'exemple
const transactionData = [
  {
    id: 1,
    crypto: 'Bitcoin',
    amount: '0.05 BTC',
    date: '2024-01-27T10:30:00',
    type: 'ACHAT',
  },
  {
    id: 2,
    crypto: 'Ethereum',
    amount: '1.5 ETH',
    date: '2024-01-26T15:45:00',
    type: 'VENTE',
  },
  {
    id: 3,
    crypto: 'Bitcoin',
    amount: '0.03 BTC',
    date: '2024-01-25T09:15:00',
    type: 'VENTE',
  },
];

const TransactionHistoryScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Appbar.Header style={[styles.appBar, { backgroundColor: '#002967' }]}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Historique des transactions" color="white" />
        <Appbar.Action icon="filter" onPress={() => {}} color="white" />
      </Appbar.Header>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Chip 
            selected 
            onPress={() => {}} 
            style={styles.filterChip}
          >
            Tout
          </Chip>
          <Chip 
            onPress={() => {}} 
            style={styles.filterChip}
          >
            Achats
          </Chip>
          <Chip 
            onPress={() => {}} 
            style={styles.filterChip}
          >
            Ventes
          </Chip>
        </ScrollView>
      </View>

      <ScrollView style={styles.transactionList}>
        {transactionData.map((transaction) => (
          <TransactionRow 
            key={transaction.id} 
            transaction={transaction}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  appBar: {
    elevation: 0,
  },
  filterContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterChip: {
    marginRight: 8,
  },
  transactionList: {
    flex: 1,
    padding: 16,
  },
});

export default TransactionHistoryScreen;