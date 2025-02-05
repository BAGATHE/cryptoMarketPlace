import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView,TouchableOpacity, Alert,Image} from 'react-native';
import {Appbar,Text,IconButton,List,Drawer,useTheme,} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserCard from '@components/user/UserCard';
import ActionList from '@components/ActionList';
import BottomNav from '@components/BottomNav';
import database from '@react-native-firebase/database';
import { useRoute } from "@react-navigation/native";
const actions = [
  { icon: require('../../assets/images/depot.png'), label: 'Dépôt', route: 'Depot' },
  { icon: require('../../assets/images/retrait.png'), label: 'Retrait', route: 'Retrait' },
  { icon: require('../../assets/images/wallet2.png'), label: 'Portefeuille', route: 'PorteFeuille' },
];

export default function HomeScreen({ navigation }) {
  const route = useRoute();
  const [user,setUser]= useState(null);
  const [favoris, setFavoris] = useState({});
  const {userData } = route.params || {};
  const theme = useTheme();
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const [cryptomonnaiesList, setCryptoMonnaieList] = useState([]);


  useEffect(() => {
    if (userData?.email) {
      const userRef = database().ref(`/utilisateurs`);
  
      userRef.on("value", (snapshot) => {
        const users = snapshot.val();
        if (users) {
          const usersArray = Object.values(users).filter((user) => user !== null);
          const foundUser = usersArray.find((user) => user.email === userData.email);
          if (foundUser) {
            setUser(foundUser);
          }
        }
      });
  
      return () => userRef.off(); 
    }
  }, [userData]);


  useEffect(() => {
    const cryptoRef = database().ref(`/cryptos`);

    const onCryptoUpdate = (snapshot) => {
      const cryptoData = snapshot.val();
      if (cryptoData) {
        const cryptoArray = cryptoData.map((crypto) => ({
          id: crypto.id,
          image: crypto.image, // URL de l'image
          nom: crypto.nom,
          subtitle: crypto.nom.slice(0, 3).toUpperCase(), 
          prix: `${crypto.valeur.toFixed(2)} USD`, 
          color: "#BEBEBE",
          isFavorite: false, // Gérer les favoris (peut être stocké dans AsyncStorage)
        }));
        setCryptoMonnaieList(cryptoArray);
      }
    };

    cryptoRef.on("value", onCryptoUpdate);

    // Nettoyage de l'écouteur lorsqu'on quitte l'écran
    return () => cryptoRef.off("value", onCryptoUpdate);
  }, []);

  const toggleFavorite = (cryptoId) => {
    if (!user || !user.id) {
      Alert.alert("Erreur", "Utilisateur non trouvé.");
      return;
    }
  
    const favorisRef = database().ref(`utilisateurs/${user.id}/favoris/${cryptoId}`);
  
    favorisRef.once("value").then((snapshot) => {
      if (snapshot.exists()) {
        // Supprime des favoris
        favorisRef.remove();
      } else {
        // Ajoute aux favoris
        favorisRef.set(true);
      }
    });
  };
  

  useEffect(() => {
    if (user?.id) {
      const favorisRef = database().ref(`utilisateurs/${user.id}/favoris`);
  
      favorisRef.on("value", (snapshot) => {
        setFavoris(snapshot.val() || {}); 
      });
  
      return () => favorisRef.off();
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    navigation.navigate('SignIn');
  };
  return (
    <>
      {/* Appbar */}
      <Appbar.Header style={styles.head}>
        <Appbar.Action icon="menu" onPress={toggleDrawer} />
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome back</Text>
        </View>
        <Appbar.Action icon="logout" onPress={handleLogout} />
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
            user && navigation.navigate('PorteFeuille', { userId: user.id });
            }}
          />
          <Drawer.Item
            icon="chart-bar"
            label="Historique Vente/Achat"
            onPress={() => {
              setDrawerVisible(false);
              navigation.navigate('HistoriqueAV', { userId: user.id });
            }}
          />
        </Drawer.Section>
      )}
  
      {/* Content */}
      <ScrollView style={styles.container}>
        <UserCard
          name={user?.email || "Chargement..."}
          fond={user?.fond ?? 0}
          navigation={navigation}
        />
        {user && <ActionList actions={actions} navigation={navigation} userId={user.id} fond={user?.fond ?? 0}/>}

  
        {/* Transactions */}
        <View style={styles.transactionHeader}>
          <Text>Cryptomonnaie</Text>
          <Text>Cours Actuel</Text>
        </View>
  
        {cryptomonnaiesList.map((cryptomonnaie) => {
          // Déclarez isFavorite en dehors du JSX
          const isFavorite = favoris?.[cryptomonnaie.id] ?? false;
  
          return (
            <List.Item
              key={cryptomonnaie.id}
              style={styles.listItem}
              title={cryptomonnaie.nom}
              description={cryptomonnaie.subtitle}
              left={() => (
                <View style={styles.leftContainer}>
                   <Image source={{ uri: cryptomonnaie.image }} style={styles.cryptoImage} />
                </View>
              )}
              right={() => (
                <View style={styles.rightContainer}>
                  <Text
                    style={[
                      styles.amount,
                      {
                        color: cryptomonnaie.prix.startsWith('-')
                          ? 'red'
                          : theme.colors.primary,
                      },
                    ]}
                  >
                    {cryptomonnaie.prix}
                  </Text>
                  <IconButton
                    icon={isFavorite ? 'heart' : 'heart-outline'}
                    iconColor={isFavorite ? 'red' : 'black'}
                    onPress={() => toggleFavorite(cryptomonnaie.id)}
                  />
                </View>
              )}
            />
          );
        })}
      </ScrollView>
  
      {/* Bottom Navigation */}
      {user &&  <BottomNav navigation={navigation}  userId={user.id}/>}
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
  cryptoImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
});
