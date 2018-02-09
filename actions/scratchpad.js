import { UPDATE } from "../constants/scratchpad"

// eslint-disable-next-line
export const update = ({ text }) => ({
  type: UPDATE,
  text
})
