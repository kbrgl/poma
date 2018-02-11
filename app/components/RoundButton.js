import React from "react"
import PropTypes from "prop-types"
import { TouchableHighlight, Text, Platform, Vibration } from "react-native"
import ReactNativeHaptic from "react-native-haptic"

const RoundButton = ({ onPress, title, backgroundColor, clickColor }) => (
  <TouchableHighlight
    style={{
      height: 80,
      width: 80,
      borderRadius: 80,
      backgroundColor,
      alignItems: "center",
      justifyContent: "center"
    }}
    underlayColor={clickColor}
    onPress={() => {
      if (Platform.OS === "ios") ReactNativeHaptic.generate("impact")
      else Vibration.vibrate(3)
      onPress()
    }}
  >
    <Text
      style={{
        fontSize: 15,
        color: "#fff",
        fontWeight: "600"
      }}
    >
      {title}
    </Text>
  </TouchableHighlight>
)
RoundButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  clickColor: PropTypes.string.isRequired
}

export default RoundButton
