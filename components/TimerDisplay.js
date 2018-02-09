import React from "react"
import PropTypes from "prop-types"
import { Text, StyleSheet } from "react-native"
import { formatMS } from "../utils/time"

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

const TimerDisplay = ({ ms }) => (
  <Text numberOfLines={1} style={styles.display}>
    {formatMS(ms)}
  </Text>
)
TimerDisplay.propTypes = {
  ms: PropTypes.number.isRequired
}

export default TimerDisplay
