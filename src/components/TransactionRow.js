// components/TransactionRow.js
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Surface, Chip } from 'react-native-paper';

const TransactionRow = ({ transaction }) => {
  const { cryptomonnaie_id, cryptomonnaie_image, cryptomonnaie_nom, quantite, date, type, valeur } = transaction;
  const isPositive = type === 'achat';

  // Formatage de la date
  const formattedDate = new Date(date.date).toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Surface style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={styles.cryptoInfo}>
          <Image source={{ uri: cryptomonnaie_image }} style={styles.cryptoImage} />
          <Text style={styles.cryptoName}>{cryptomonnaie_nom}</Text>
          <Text style={[styles.amount,{ color: isPositive ? '#4CAF50' : '#F44336' }]}>
            {isPositive ? '+' : '-'}{parseFloat(quantite).toFixed(2)} ({parseFloat(valeur).toFixed(2)} $)
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
      <Text style={styles.date}>{formattedDate}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  amount: {
    fontSize: 12,
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