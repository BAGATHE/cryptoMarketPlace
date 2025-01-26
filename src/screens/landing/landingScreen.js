// Page d'accueil (votre code actuel)
import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import logo from '../../assets/images/crypto.png';
export default function LandingScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.avatar} />
        <Text style={styles.title}>Relax on</Text>
        <Text style={styles.subtitle}>"Rejoignez la révolution crypto, sécurisez votre futur."</Text>
        
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('SignUp')}
            style={styles.button}
          >
            Create my Account
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('SignIn')}
            style={styles.button}
          >
            I have an Account
          </Button>
        </View>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    avatar: {
      width: 100, // Taille de l'image
      height: 100,
      borderRadius: 50, // Rend l'image circulaire
      marginBottom: 20, // Espace entre l'image et le titre
      backgroundColor: "#d9d9d9", // Couleur de fond si l'image ne charge pas
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 30,
      textAlign: "center",
    },
    buttonContainer: {
      width: "100%",
    },
    button: {
      marginVertical: 10,
    },
  });