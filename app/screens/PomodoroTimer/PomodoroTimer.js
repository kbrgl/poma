import React from "react"
import { View, StyleSheet, Platform } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Timer from "./Timer"
import Scratchpad from "../../components/Scratchpad"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
})

const PomodoroTimer = () => (
  <KeyboardAwareScrollView
    alwaysBounceVertical={false}
    keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
    viewIsInsideTabBar
    keyboardOpeningTime={0}
  >
    <View style={styles.container}>
      <Timer />
      <Scratchpad />
    </View>
  </KeyboardAwareScrollView>
)

export default PomodoroTimer
