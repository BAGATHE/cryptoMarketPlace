import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card, IconButton } from "react-native-paper";

const UserCard = ({ name, fond, navigation }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          {/* Avatar avec bouton d'édition */}
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/images/profil.jpg")}
              style={styles.avatar}
            />
            <IconButton
              icon="pencil"
              size={20}
              style={styles.editIcon}
              onPress={() => navigation.navigate("Profil")}
            />
          </View>
          {/* Nom et fond actuel */}
          <View style={styles.details}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.fond}>
              Fond actuel : <Text style={styles.fondValue}>{fond.toFixed(2)} $</Text>
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginVertical: 10,
    marginHorizontal: 20,
    elevation: 4,
    backgroundColor: '#002967',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    elevation: 3,
    borderRadius: 20,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  fond: {
    fontSize: 14,
    color: "#555",
  },
  fondValue: {
    fontWeight: "600",
    color: "#007bff", // Bleu pour mettre en évidence la valeur
  },
});

export default UserCard;
