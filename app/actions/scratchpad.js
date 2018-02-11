import { SCRATCHPAD_UPDATE } from "../constants/scratchpad"

// eslint-disable-next-line
export const update = ({ text }) => ({
  type: SCRATCHPAD_UPDATE,
  text
})
