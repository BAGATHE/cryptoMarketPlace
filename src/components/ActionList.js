import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function ActionList({ actions, navigation ,email,fond}) {
  return (
    <View style={styles.actions}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={styles.actionItem}
          onPress={() => navigation.navigate(action.route, { email,fond })}
        >
          {/* Affichage de l'image PNG */}
          <Image
            source={action.icon}
            style={styles.actionIcon}
            resizeMode="contain" // Ajuste l'image pour qu'elle soit bien contenue
          />
          <Text style={styles.actionLabel}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  actionItem: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10, // Pour espacer chaque élément
  },
  actionIcon: {
    width: 50, // Largeur de l'icône
    height: 50, // Hauteur de l'icône
    marginBottom: 5, // Espacement entre l'image et le label
  },
  actionLabel: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
  },
});
