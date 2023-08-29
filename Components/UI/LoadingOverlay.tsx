import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import { loadingProps } from "./types";

function LoadingOverlay({ uploading }: loadingProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.backgroundContainer}>
        <ActivityIndicator />
        {uploading && (
          <Text style={styles.text}>Uploading - Please wait..</Text>
        )}
      </View>
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  backgroundContainer: {
    borderRadius: 20,
    height: 200,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C7EECE",
  },
  text: {
    fontSize: 25,
    fontWeight: "300",
    color: "Black",
  },
});
