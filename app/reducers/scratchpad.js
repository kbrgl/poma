import { UPDATE } from "../constants/scratchpad"

const initialState = {
  text: ""
}

const scratchpad = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        text: action.text
      }
    default:
      return state
  }
}

export default scratchpad
