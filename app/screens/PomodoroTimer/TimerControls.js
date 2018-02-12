import React from "react"
import PropTypes from "prop-types"
import { View, StyleSheet } from "react-native"
import RoundButton from "../../components/RoundButton"

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
    marginBottom: 40,
    alignSelf: "stretch"
  }
})

const TimerControls = ({ start, pause, reset, isRunning, isActive }) => (
  <View style={styles.view}>
    {isActive ? (
      <RoundButton onPress={reset} title="Reset" backgroundColor="gray" clickColor="black" />
    ) : (
      <RoundButton
        onPress={reset}
        title="Reset"
        backgroundColor="lightgray"
        clickColor="lightgray"
      />
    )}
    {isRunning ? (
      <RoundButton onPress={pause} title="Pause" backgroundColor="#eaa82e" clickColor="#8c7a2e" />
    ) : (
      <RoundButton
        onPress={start}
        title={isActive ? "Resume" : "Start"}
        backgroundColor="tomato"
        clickColor="#a34332"
      />
    )}
  </View>
)
TimerControls.propTypes = {
  start: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired
}

export default TimerControls
