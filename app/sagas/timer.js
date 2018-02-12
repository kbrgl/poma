import { delay } from "redux-saga"
import { race, take, select, put, takeEvery } from "redux-saga/effects"
import { TIMER_PAUSE, TIMER_START, TIMER_RESET } from "../constants/timer"
import { time } from "../selectors/timer"
import { complete, tick } from "../actions/timer"

function* startTimer() {
  let offset = Date.now()
  while (true) {
    const winner = yield race({
      paused: take(TIMER_PAUSE),
      reset: take(TIMER_RESET),
      tick: delay(1000)
    })

    if (winner.tick) {
      const now = Date.now()
      const delta = now - offset
      offset = now
      let newTime = yield select(time)
      newTime -= delta
      if (newTime < 0) {
        yield put(complete(-newTime))
      } else {
        yield put(tick(newTime))
      }
    } else {
      break
    }
  }
}

// eslint-disable-next-line
export function* watchTimer() {
  yield takeEvery(TIMER_START, startTimer)
}
