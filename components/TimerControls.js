import React from "react"
import { Button, View, StyleSheet, TouchableHighlight, Text } from "react-native"

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
    onPress={onPress}
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

const TimerControls = ({ start, pause, reset, active, started }) => {
  return (
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
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 40
  }
})

export default TimerControls
