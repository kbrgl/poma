import React from "react"
import PropTypes from "prop-types"
import { View, StyleSheet, Platform } from "react-native"
import { connect } from "react-redux"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Timer from "../lib/Timer"
import { tick, start, pause, reset, complete } from "../actions/timer"
import TimerDisplay from "./TimerDisplay"
import TimerControls from "./TimerControls"
import Scratchpad from "./Scratchpad"

class PomodoroTimer extends React.Component {
  static styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center"
    }
  })

  constructor(props) {
    super(props)
    this.timer = null
    this.start = this.start.bind(this)
    this.pause = this.pause.bind(this)
    this.complete = this.complete.bind(this)
    this.reset = this.reset.bind(this)
  }

  componentDidMount() {
    this.timer = new Timer(this.props.tick, this.complete)
  }

  componentWillUnmount() {
    this.timer.reset()
  }

  complete(overflow) {
    this.props.complete(overflow)
    this.timer.start(this.props.time)
  }

  start() {
    this.timer.start(this.props.time)
    this.props.start()
  }

  pause() {
    this.timer.pause()
    this.props.pause()
  }

  reset() {
    this.timer.pause()
    this.props.reset()
  }

  render() {
    return (
      <KeyboardAwareScrollView
        alwaysBounceVertical={false}
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        viewIsInsideTabBar
        keyboardOpeningTime={0}
      >
        <View style={PomodoroTimer.styles.container}>
          <TimerDisplay ms={this.props.time} type={this.props.type} />
          <TimerControls
            start={this.start}
            pause={this.pause}
            reset={this.reset}
            active={this.props.active}
            started={this.props.started}
          />
          <Scratchpad />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
PomodoroTimer.propTypes = {
  tick: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  complete: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  started: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  time: state.timer.time,
  type: state.timer.type,
  active: state.timer.active,
  started: state.timer.started
})

const mapDispatchToProps = dispatch => ({
  tick: time => {
    dispatch(tick(time))
  },
  start: () => {
    dispatch(start())
  },
  pause: () => {
    dispatch(pause())
  },
  complete: time => {
    dispatch(complete(time))
  },
  reset: () => {
    dispatch(reset())
  }
})

const connectedPomodoroTimer = connect(mapStateToProps, mapDispatchToProps)(PomodoroTimer)

export default connectedPomodoroTimer
