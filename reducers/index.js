import { combineReducers } from "redux"
import timer from "./timer"
import scratchpad from "./scratchpad"

const pomodoroApp = combineReducers({
  timer,
  scratchpad
})

export default pomodoroApp
