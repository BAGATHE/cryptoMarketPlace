import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Text, IconButton, Divider } from 'react-native-paper';

const CryptoCard = ({ crypto }) => {
  const { id, name, symbol, amount, icon, value, change } = crypto;
  
  return (
    <Card key={id} style={styles.cryptoCard}>
      <Card.Content>
        <View style={styles.cryptoHeader}>
          <View style={styles.leftContent}>
            <IconButton icon={icon} size={30} />
            <View>
              <Title style={styles.cryptoName}>{name}</Title>
              <Paragraph style={styles.cryptoSymbol}>{symbol}</Paragraph>
            </View>
          </View>
          <View style={styles.rightContent}>
            <Text style={styles.cryptoValue}>{value}</Text>
            <Text style={[
              styles.cryptoChange,
              { color: change.includes('+') ? '#4CAF50' : '#F44336' }
            ]}>
              {change}
            </Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Quantité</Text>
          <Text style={styles.amount}>{amount} {symbol}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cryptoCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  cryptoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  cryptoName: {
    fontSize: 18,
    marginBottom: 2,
  },
  cryptoSymbol: {
    color: '#666',
  },
  cryptoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cryptoChange: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    marginVertical: 12,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountLabel: {
    color: '#666',
  },
  amount: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CryptoCard;