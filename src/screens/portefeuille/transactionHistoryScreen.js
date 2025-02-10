import TransactionRow from '@components/TransactionRow';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Chip, useTheme,Text } from 'react-native-paper';
import { useRoute } from "@react-navigation/native";
import database from '@react-native-firebase/database';
import {findUserByEmail} from '@services/firebaseService';
const TransactionHistoryScreen = ({ navigation }) => {
  const theme = useTheme();
  const route = useRoute();
  const { email } = route.params;
  const [userEmail,setUserEmail] = useState("");
  const [transactionData, setTransactionData] = useState([]);
  const [filter, setFilter] = useState('Tout'); 
  const [userKey, setUserKey] = useState(null);

  useEffect(() => {
    if (email) {
      const fetchUserData = async () => {
        try {
          const { matchingUserKey } = await findUserByEmail(email);  
          setUserKey(matchingUserKey); 
          setUserEmail(email);
        } catch (error) {
          console.error("Erreur lors de la récupération de l'utilisateur :", error);
        }
      };

      fetchUserData();  
    }
  }, [email]);

  useEffect(() => {
    if (userKey) {
      const portefeuilleRef = database().ref(`/utilisateurs/${userKey}/transactionCrypto`);

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
  }, [userKey]);


  const filteredTransactions = transactionData && transactionData.length > 0
  ? transactionData.filter((transaction) => {
      if (!transaction) return false; 
      if (filter === 'Tout') return true;
      if (filter === 'Achats') return transaction.type === 'achat';
      if (filter === 'Ventes') return transaction.type === 'vente';
      return true;
    })
  : []; 

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
      {filteredTransactions.length > 0 ? (
        filteredTransactions.map((transaction) => (
          transaction ? ( 
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
            />
          ) : null
        ))
      ) : (
        <Text style={styles.noDataText}>Aucune transaction disponible.</Text>
      )}
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