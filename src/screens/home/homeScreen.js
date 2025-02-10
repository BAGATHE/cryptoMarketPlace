import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView,TouchableOpacity, Alert,Image} from 'react-native';
import {Appbar,Text,IconButton,List,Drawer,useTheme,} from 'react-native-paper';
import UserCard from '@components/user/UserCard';
import ActionList from '@components/ActionList';
import BottomNav from '@components/BottomNav';
import database from '@react-native-firebase/database';
import { useRoute } from "@react-navigation/native";
import {findUserByEmail} from '@services/firebaseService';
const actions = [
  { icon: require('../../assets/images/depot.png'), label: 'Dépôt', route: 'Depot' },
  { icon: require('../../assets/images/retrait.png'), label: 'Retrait', route: 'Retrait' },
  { icon: require('../../assets/images/wallet2.png'), label: 'Portefeuille', route: 'PorteFeuille' },
];

export default function HomeScreen({ navigation }) {
  const route = useRoute();
  const [user,setUser]= useState(null);
  const [userKey,setUserKey] = useState("");
  const [userFond, setUserFond] = useState(0);
  const [favoris, setFavoris] = useState({});
  const {email } = route.params || {};
  const theme = useTheme();
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const [cryptomonnaiesList, setCryptoMonnaieList] = useState([]);

  const handleRefreshFond = () => {
    navigation.navigate("Home", { email: email });
    Alert.alert("refresh","les fond serons rafraichis ils sont deja visible dans depot et retrait");
  };



  useEffect(() => {
    const fetchUserData = async () => {
      if (email) {
        const { matchingUser, matchingUserKey } = await findUserByEmail(email);
        setUser(matchingUser);
        setUserKey(matchingUserKey);
      }
    };
    
    fetchUserData();
  }, [email]);

  useEffect(() => {
    if (userKey) {
      const fondRef = database().ref(`/utilisateurs/${userKey}/fond`);
      const fondListener = fondRef.on('value', snapshot => {
        setUserFond(snapshot.val());
      });
      return () => fondRef.off('value', fondListener);
    }
  }, [userKey]);


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



  const toggleFavorite = async (cryptoId) => {
    try {
      const favorisRef = database().ref(`utilisateurs/${userKey}/favoris/${cryptoId}`);
      const snapshot = await favorisRef.once("value");
      if (snapshot.exists()) {
        await favorisRef.remove();
        Alert.alert("Succès", "Crypto retiré des favoris.");
      } else {
        await favorisRef.set(true);
        Alert.alert("Succès", "Crypto ajouté aux favoris.");
      }
  
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris:", error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la mise à jour des favoris.");
    }
  };
  
  

  useEffect(() => {
    if (userKey) {  
      const favorisRef = database().ref(`utilisateurs/${userKey}/favoris`);
      const favorisListener = favorisRef.on("value", (snapshot) => {
        setFavoris(snapshot.val() || {}); 
      });
      return () => {
        favorisRef.off("value", favorisListener);
      };
    }
  }, [userKey]); 
  

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
        <Appbar.Action icon="refresh" onPress={handleRefreshFond} />
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
            user && navigation.navigate('PorteFeuille', { email: user.email });
            }}
          />
          <Drawer.Item
            icon="chart-bar"
            label="Historique Vente/Achat"
            onPress={() => {
              setDrawerVisible(false);
              navigation.navigate('HistoriqueAV', { email: user.email });
            }}
          />
        </Drawer.Section>
      )}
  
      {/* Content */}
      <ScrollView style={styles.container}>
      {user && (<UserCard user={user} email={user.email}  navigation={navigation} />)}
      {user && <ActionList actions={actions} navigation={navigation} email={user.email} fond={typeof userFond === 'number' ? userFond : 0}/>}

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
      {user &&  <BottomNav navigation={navigation}  email={user.email}/>}
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
