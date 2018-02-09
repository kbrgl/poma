import React from "react"
import PropTypes from "prop-types"
import { View, StyleSheet, TouchableHighlight, Text, Vibration } from "react-native"

const Control = ({ onPress, title, backgroundColor, clickColor }) => (
  <TouchableHighlight
    style={{
      height: 80,
      width: 80,
      borderRadius: 80,
      backgroundColor,
      alignItems: "center",
      justifyContent: "center"
    }}
    underlayColor={clickColor}
    onPress={() => {
      Vibration.vibrate(50)
      onPress()
    }}
  >
    <Text
      style={{
        fontSize: 15,
        color: "#fff",
        fontWeight: "600"
      }}
    >
      {title}
    </Text>
  </TouchableHighlight>
)
Control.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  clickColor: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 40,
    marginBottom: 40
  }
})

const TimerControls = ({ start, pause, reset, active, started }) => (
  <View style={styles.view}>
    {started ? (
      <Control onPress={reset} title="Reset" backgroundColor="gray" clickColor="black" />
    ) : (
      <Control onPress={reset} title="Reset" backgroundColor="lightgray" clickColor="lightgray" />
    )}
    {active ? (
      <Control onPress={pause} title="Pause" backgroundColor="#eaa82e" clickColor="#8c7a2e" />
    ) : (
      <Control
        onPress={start}
        title={started ? "Resume" : "Start"}
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
  active: PropTypes.bool.isRequired,
  started: PropTypes.bool.isRequired
}

export default TimerControls
