import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Appbar, Avatar, Button, IconButton, useTheme } from "react-native-paper";
import { launchCamera } from "react-native-image-picker";

export default function ProfileScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState(require("../../assets/images/profil.jpg"));
  const theme = useTheme();

  const handleTakePhoto = () => {
    launchCamera(
      {
        mediaType: "photo",
        saveToPhotos: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled camera");
        } else if (response.errorMessage) {
          console.error("Camera error: ", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setProfileImage({ uri: response.assets[0].uri });
        }
      }
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* AppBar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Modifier le Profil" />
      </Appbar.Header>

      {/* Content */}
      <View style={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Avatar.Image size={150} source={profileImage} style={styles.avatar} />
          <TouchableOpacity style={styles.editIconContainer} onPress={handleTakePhoto}>
            <IconButton
              icon="camera"
              size={24}
              iconColor="#fff"
              style={styles.editIcon}
            />
          </TouchableOpacity>
          <Text style={styles.infoText}>Appuyez sur l'icône pour modifier votre photo.</Text>
        </View>

        {/* Validation Button */}
        <View style={styles.buttonSection}>
          <Button
            mode="contained"
            onPress={() => console.log("Modifications validées")}
            buttonColor={theme.colors.primary}
            style={styles.validateButton}
            labelStyle={styles.buttonText}
          >
            Valider les modifications
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profileSection: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    marginBottom: 15,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#007bff", // Bleu vif pour contraster avec l'avatar
    borderRadius: 50,
    padding: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 10,
  },
  buttonSection: {
    width: "100%",
    paddingHorizontal: 20,
  },
  validateButton: {
    borderRadius: 25,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
