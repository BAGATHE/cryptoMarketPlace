import React, { useState } from 'react';
import { StyleSheet, View, ScrollView,TouchableOpacity} from 'react-native';
import {
  Appbar,
  Text,
  Card,
  IconButton,
  List,
  Button,
  Drawer,
  Avatar, 
  useTheme,
} from 'react-native-paper';
import UserCard from '@components/user/UserCard';
import ActionList from '@components/ActionList';
const initialCryptomonnaies = [
  { id: 1, icon: 'bitcoin', title: 'Bitcoin', subtitle: 'BTC', amount: '98000 USD', color: '#FF9900', isFavorite: false },
  { id: 2, icon: 'ethereum', title: 'Ethereum', subtitle: 'ETH', amount: '3000 USD', color: '#3C3C3D', isFavorite: true },
  { id: 3, icon: 'litecoin', title: 'Litecoin', subtitle: 'LTC', amount: '400 USD', color: '#BEBEBE', isFavorite: false },
];
const actions = [
  { icon: require('../../assets/images/depot.png'), label: 'Dépôt', route: 'Depot' },
  { icon: require('../../assets/images/retrait.png'), label: 'Retrait', route: 'Retrait' },
  { icon: require('../../assets/images/wallet2.png'), label: 'Wallet', route: 'WalletPage' },
];

const user = {
  name: "Emadaly", // Nom de l'utilisateur
  fond: 1500, // Valeur des fonds actuels
};
export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const [fond,setFond] = useState(25000)
  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const [cryptomonnaiesList, setCryptoMonnaieList] = useState(initialCryptomonnaies);
  
  const toggleFavorite = (id) => {
    setCryptoMonnaieList(prevList =>
      prevList.map(cryptomonnaie =>
        cryptomonnaie.id === id ? { ...cryptomonnaie, isFavorite: !cryptomonnaie.isFavorite } : cryptomonnaie
      )
    );
  };

  return (
    <>
      {/* Appbar */}
      <Appbar.Header style={styles.head}>
        <Appbar.Action icon="menu" onPress={toggleDrawer} />
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome back</Text>
        </View>
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>

      {/* Drawer Content */}
      {drawerVisible && (
        <Drawer.Section style={styles.drawer}>
          <Drawer.Item
            icon="home"
            label="Home"
            onPress={() => {
              setDrawerVisible(false);
              navigation.navigate('Home');
            }}
          />
          <Drawer.Item
            icon="credit-card"
            label="Portefeuille Crypto"
            onPress={() => {
              setDrawerVisible(false);
              navigation.navigate('Landing');
            }}
          />
          <Drawer.Item
            icon="chart-bar"
            label="Historique Vente/Achat"
            onPress={() => {
              setDrawerVisible(false);
              navigation.navigate('Statistics');
            }}
          />
        </Drawer.Section>
      )}

      {/* Content */}
      <ScrollView style={styles.container}>
        <UserCard name={user.name} fond={user.fond} navigation={navigation} />
        <ActionList actions={actions} navigation={navigation} />

        {/* Transactions */}
        <View style={styles.transactionHeader}>
          <Text>Cryptomonnaie</Text>
          <Text>Cours Actuel</Text>
        </View>
        {cryptomonnaiesList.map((cryptomonnaie) => (
        <List.Item
          key={cryptomonnaie.id}
          style={styles.listItem}
          title={cryptomonnaie.title}
          description={cryptomonnaie.subtitle}
          left={() => (
            <View style={styles.leftContainer}>
              <List.Icon
                icon={cryptomonnaie.icon}
                color={cryptomonnaie.color}
                style={styles.icon}
              />
            </View>
          )}
          right={() => (
            <View style={styles.rightContainer}>
              <Text
                style={[
                  styles.amount,
                  { color: cryptomonnaie.amount.startsWith('-') ? 'red' : theme.colors.primary },
                ]}
              >
                {cryptomonnaie.amount}
              </Text>
              <IconButton
                icon={cryptomonnaie.isFavorite ? 'heart' : 'heart-outline'}
                color={cryptomonnaie.isFavorite ? 'red' : 'black'}
                onPress={() => toggleFavorite(cryptomonnaie.id)}
              />
            </View>
          )}
        />
      ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {['home', 'credit-card', 'chart-bar'].map((icon, index) => (
          <IconButton key={index} icon={icon} />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  head:{
    backgroundColor: '#002967',
  },
  headerContent: {
    flex: 1,
    marginLeft: 10,
  },
  welcomeText: {
    color: '#666',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  amount: {
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 8,
  },
  drawer: {
    backgroundColor: '#fff',
  },
  amount: {
    fontSize: 16,
    alignSelf: 'center',
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  listItem: {
    marginVertical: 8, // Espacement entre chaque élément
    paddingHorizontal: 16, // Espacement à gauche et à droite pour chaque item
    backgroundColor: '#fff', // Fond blanc pour chaque item
    borderRadius: 8, // Coins arrondis
    elevation: 2, // Ombre pour Android
    shadowColor: '#000', // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8, // Espacement entre l'icône et le texte
  },
  icon: {
    margin: 0,
  },
});
