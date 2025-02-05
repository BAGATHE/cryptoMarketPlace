import React from 'react';
import { View, StyleSheet ,Image} from 'react-native';
import { Card, Title, Paragraph, Text, IconButton, Divider } from 'react-native-paper';

const CryptoCard = ({ crypto }) => {
  const { id, cryptomonnaie_nom, cryptomonnaie_image, quantite } = crypto;
  
  return (
    <Card key={id} style={styles.cryptoCard}>
      <Card.Content>
        <View style={styles.cryptoHeader}>
          <View style={styles.leftContent}>
            <Image source={{ uri: cryptomonnaie_image }} style={styles.cryptoImage} />
            <View>
              <Title style={styles.cryptoName}>{cryptomonnaie_nom}</Title>
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Quantité</Text>
          <Text style={styles.amount}>{quantite}</Text>
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
    backgroundColor:'#002967',
    marginVertical: 12,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#002967',
  },
  amountLabel: {
    color: 'white',
  },
  amount: {
    fontSize: 16,
    fontWeight: '500',
    color:'white'
  },
  cryptoImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});

export default CryptoCard;