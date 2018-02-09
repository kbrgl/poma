import * as time from "../utils/time"
import { WORK, LONG_BREAK, BREAK, START, PAUSE, RESET, COMPLETE, TICK } from "../constants/timer"

const initialState = {
  // type of cycle
  type: WORK,
  // duration of different cycle types
  times: {
    work: time.seconds(25),
    shortBreak: time.seconds(5),
    longBreak: time.seconds(30)
  },
  // whether the timer has been started
  started: false,
  // whether the timer is currently ticking
  active: false,
  // number of pomodoros (work cycles) completed
  count: 0
}
initialState.time = initialState.times.work

const timer = (state = initialState, action) => {
  switch (action.type) {
    // tick of the internal timer, not managed by the reducer
    case TICK:
      // The component managing the timer passes the new time to the reducer
      // which updates the state.
      // The new time is passed to the component through its props, and at
      // the next tick of the timer, the process repeats.
      return {
        ...state,
        time: action.time
      }
    case START:
      return {
        ...state,
        active: true,
        started: true
      }
    case PAUSE:
      return {
        ...state,
        active: false
      }
    case COMPLETE:
      if (state.type === WORK) {
        // if timer type is WORK, then work cycle is currently ending

        if (state.count !== 0 && (state.count + 1) % 4 === 0) {
          // if another 4 pomodoros are done, then give long break
          return {
            ...state,
            count: state.count + 1,
            type: LONG_BREAK,
            // for explanation of overflow see lib/Timer.js
            time: state.times.longBreak - action.overflow
          }
        }
        // else give a short break
        return {
          ...state,
          count: state.count + 1,
          type: BREAK,
          time: state.times.shortBreak - action.overflow
        }
      }
      // if none of the above matched, start work cycle
      return {
        ...state,
        type: WORK,
        time: state.times.work - action.overflow
      }
    case RESET:
      return initialState
    default:
      return state
  }
}

export default timer
