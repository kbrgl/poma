import { all } from "redux-saga/effects"
import { watchTimer } from "./timer"

export default function* rootSaga() {
  yield all([watchTimer()])
}
