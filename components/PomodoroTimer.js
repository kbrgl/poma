import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Timer from "../lib/Timer"
import { connect } from "react-redux"
import { tick, start, pause, reset, complete } from "../actions/timer"
import TimerDisplay from "./TimerDisplay"
import TimerControls from "./TimerControls"

class PomodoroTimer extends React.Component {
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
      <View style={styles.container}>
        <TimerDisplay ms={this.props.time} type={this.props.type} />
        <TimerControls
          start={this.start}
          pause={this.pause}
          reset={this.reset}
          active={this.props.active}
          started={this.props.started}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
})

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

PomodoroTimer = connect(mapStateToProps, mapDispatchToProps)(PomodoroTimer)

export default PomodoroTimer
