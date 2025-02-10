// components/TransactionRow.js
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Surface, Chip } from 'react-native-paper';

const TransactionRow = ({ transaction }) => {
  const { cryptomonnaie_id, cryptomonnaie_image, cryptomonnaie_nom, date, id, quantite, type, valeur } = transaction;
  const isPositive = type === 'achat';

  return (
    <Surface style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={styles.cryptoInfo}>
          {cryptomonnaie_image ? (
            <Image source={{ uri: cryptomonnaie_image }} style={styles.cryptoImage} />
          ) : (
            <View style={styles.placeholderImage} />
          )}
          <Text style={styles.cryptoName}>{cryptomonnaie_nom || 'Nom inconnu'}</Text>
          <Text style={[styles.amount, { color: isPositive ? '#4CAF50' : '#F44336' }]}> 
            {isPositive ? '+' : '-'}{quantite ? parseFloat(quantite).toFixed(2) : '0.00'}
          </Text>
        </View>

        <Chip
          mode="flat"
          style={[
            styles.typeChip,
            { backgroundColor: isPositive ? '#E8F5E9' : '#FFEBEE' }
          ]}
        >
          <Text style={{ color: isPositive ? '#4CAF50' : '#F44336', fontWeight: '500' }}>
            {type || 'Type inconnu'}
          </Text>
        </Chip>
      </View>

      <Text>
        valeur : ({valeur ? parseFloat(valeur).toFixed(2) : '0.00'} $)
      </Text>
      <Text style={styles.date}>
        {date? new Date(date).toLocaleDateString() : 'Date inconnue'}
      </Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  transactionCard: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cryptoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoImage: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  placeholderImage: {
    width: 40,
    height: 40,
    backgroundColor: '#E0E0E0',
    marginRight: 8,
    borderRadius: 20,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    marginLeft: 8,
    fontSize: 16,
  },
  typeChip: {
    paddingHorizontal: 8,
    height: 30,
    justifyContent: 'center',
  },
  date: {
    marginTop: 8,
    color: '#757575',
    fontSize: 14,
  },
});

export default TransactionRow;
