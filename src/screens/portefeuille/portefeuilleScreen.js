import CryptoCard from '@components/crypto/CryptoCard';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Appbar, 
  Text, 
  Surface, 
  Title, 
  IconButton,
  useTheme,
} from 'react-native-paper';

// Données des cryptos (exemple)
const cryptoData = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', amount: 2.5, icon: 'bitcoin', change: '+5.2%', value: '95,000€' },
  { id: 2, name: 'Ethereum', symbol: 'ETH', amount: 10, icon: 'ethereum', change: '-2.1%', value: '25,000€' },
  { id: 3, name: 'Litecoin', symbol: 'LTC', amount: 50, icon: 'litecoin', change: '+1.8%', value: '5,000€' },
];

export default function PortefeuilleScreen({ navigation }) {
  const theme = useTheme();

  const totalValue = '125,000€';
  const dailyChange = '+4.2%';

  return (
    <View style={styles.container}>
      <Appbar.Header style={[styles.appBar, { backgroundColor: '#002967' }]}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Mon Portefeuille" color="white" />
        <Appbar.Action icon="bell-outline" onPress={() => {}} color="white" />
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
        <Surface style={styles.headerCard}>
          <Text style={styles.portfolioLabel}>Valeur totale du portefeuille</Text>
          <Text style={styles.totalValue}>{totalValue}</Text>
          <View style={styles.changeContainer}>
            <IconButton 
              icon={dailyChange.includes('+') ? 'trending-up' : 'trending-down'} 
              size={20}
              iconColor={dailyChange.includes('+') ? '#4CAF50' : '#F44336'}
            />
            <Text style={[
              styles.changeText,
              { color: dailyChange.includes('+') ? '#4CAF50' : '#F44336' }
            ]}>
              {dailyChange} aujourd'hui
            </Text>
          </View>
        </Surface>

        <Title style={styles.sectionTitle}>Mes Actifs</Title>

        {cryptoData.map((crypto) => (
        <CryptoCard key={crypto.id} crypto={crypto} />
      ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  appBar: {
    elevation: 0,
  },
  scrollView: {
    flex: 1,
  },
  headerCard: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 4,
  },
  portfolioLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#002967',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  sectionTitle: {
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
    color: '#002967',
  },
  cryptoCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },


  
 
 
 

  amount: {
    fontSize: 16,
    fontWeight: '500',
  },
});