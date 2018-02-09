import React from "react"
import { Text, StyleSheet, Platform, View } from "react-native"
import { formatMS } from "../utils/time"

const TimerDisplay = ({ ms, type }) => (
  <Text numberOfLines={1} style={styles.display}>
    {formatMS(ms)}
  </Text>
)

const styles = StyleSheet.create({
  display: {
    fontSize: 110,
    fontWeight: "200",
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 2,
    paddingTop: 30,
    paddingBottom: 30,
    textAlign: "center"
  }
})

export default TimerDisplay
