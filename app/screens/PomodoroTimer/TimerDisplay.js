import React from "react"
import PropTypes from "prop-types"
import { Text, StyleSheet, View } from "react-native"
import { formatMS } from "../../utils/time"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30
  },
  text: {
    fontSize: 110,
    fontWeight: "200"
  }
})

const TimerDisplay = ({ time }) => (
  <View style={styles.container}>
    <Text style={styles.text} numberOfLines={1}>
      {formatMS(time)}
    </Text>
  </View>
)
TimerDisplay.propTypes = {
  time: PropTypes.number.isRequired
}

export default TimerDisplay
