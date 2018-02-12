import React from "react"
import { View, StyleSheet } from "react-native"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { start, pause, reset } from "../../actions/timer"
import TimerDisplay from "./TimerDisplay"
import TimerControls from "./TimerControls"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch"
  }
})

// eslint-disable-next-line
const Timer = ({ isActive, isRunning, time, start, pause, reset }) => (
  <View style={styles.container}>
    <TimerDisplay time={time} />
    <TimerControls
      start={start}
      pause={pause}
      reset={reset}
      isRunning={isRunning}
      isActive={isActive}
    />
  </View>
)
Timer.propTypes = {
  start: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isRunning: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  time: state.timer.time,
  isRunning: state.timer.isRunning,
  isActive: state.timer.isActive
})

const mapDispatchToProps = dispatch => ({
  start: () => {
    dispatch(start())
  },
  pause: () => {
    dispatch(pause())
  },
  reset: () => {
    dispatch(reset())
  }
})

const connectedTimer = connect(mapStateToProps, mapDispatchToProps)(Timer)

export default connectedTimer
