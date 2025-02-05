import TransactionRow from '@components/TransactionRow';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Chip, useTheme } from 'react-native-paper';
import { useRoute } from "@react-navigation/native";
import database from '@react-native-firebase/database';

const TransactionHistoryScreen = ({ navigation }) => {
  const theme = useTheme();
  const route = useRoute();
  const { userId } = route.params;
  const [transactionData, setTransactionData] = useState([]);
  const [filter, setFilter] = useState('Tout'); 

  useEffect(() => {
    if (userId) {
      const portefeuilleRef = database().ref(`/utilisateurs/${userId}/transactionCrypto`);

      portefeuilleRef.on('value', snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const transactionArray = Object.values(data);
          setTransactionData(transactionArray);
        } else {
          setTransactionData([]);
        }
      });

      return () => portefeuilleRef.off();
    }
  }, [userId]);


  const filteredTransactions = transactionData.filter(transaction => {
    if (filter === 'Tout') return true; 
    if (filter === 'Achats') return transaction.type === 'achat'; 
    if (filter === 'Ventes') return transaction.type === 'vente'; 
    return true;
  });

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
            selected={filter === 'Tout'}
            onPress={() => setFilter('Tout')}
            style={styles.filterChip}
          >
            Tout
          </Chip>
          <Chip
            selected={filter === 'Achats'}
            onPress={() => setFilter('Achats')}
            style={styles.filterChip}
          >
            Achats
          </Chip>
          <Chip
            selected={filter === 'Ventes'}
            onPress={() => setFilter('Ventes')}
            style={styles.filterChip}
          >
            Ventes
          </Chip>
        </ScrollView>
      </View>

      <ScrollView style={styles.transactionList}>
        {filteredTransactions.map((transaction) => (
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