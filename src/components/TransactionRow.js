// components/TransactionRow.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, Chip } from 'react-native-paper';

const TransactionRow = ({ transaction }) => {
  const { crypto, amount, date, type } = transaction;
  const isPositive = type === 'ACHAT';

  return (
    <Surface style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={styles.cryptoInfo}>
          <Text style={styles.cryptoName}>{crypto}</Text>
          <Text style={[
            styles.amount,
            { color: isPositive ? '#4CAF50' : '#F44336' }
          ]}>
            {isPositive ? '+' : '-'}{amount}
          </Text>
        </View>
        <Chip
          mode="flat"
          style={[
            styles.typeChip,
            { backgroundColor: isPositive ? '#E8F5E9' : '#FFEBEE' }
          ]}
        >
          <Text style={{ 
            color: isPositive ? '#4CAF50' : '#F44336',
            fontWeight: '500'
          }}>
            {type}
          </Text>
        </Chip>
      </View>
      <Text style={styles.date}>{date}</Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  transactionCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: 'white',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cryptoInfo: {
    flex: 1,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  amount: {
    fontSize: 15,
    fontWeight: '500',
  },
  typeChip: {
    borderRadius: 8,
  },
  date: {
    color: '#666666',
    fontSize: 14,
  },
});

export default TransactionRow;