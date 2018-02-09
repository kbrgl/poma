import React from "react"
import { TextInput, Text, StyleSheet, View } from "react-native"
import { connect } from "react-redux"
import { update } from "../actions/scratchpad"

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 40
  },
  title: {
    color: "gray",
    letterSpacing: 1,
    fontSize: 12,
    paddingLeft: 10,
    marginBottom: 5
  },
  input: {
    backgroundColor: "#fff",
    fontSize: 18,
    height: 18 * 8,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 20
  }
})

const Scratchpad = ({ text, update }) => (
  <View style={styles.container} behavior="padding">
    <Text style={styles.title}>{"Scratchpad".toUpperCase()}</Text>
    <TextInput
      style={styles.input}
      multiline
      placeholder="Enter distractions here..."
      placeholderColor="gray"
      onChangeText={newText => update(newText)}
      value={text}
    />
  </View>
)

const mapStateToProps = state => ({
  text: state.scratchpad.text
})

const mapDispatchToProps = dispatch => ({
  update: text => {
    dispatch(update(text))
  }
})

const connectedScratchpad = connect(mapStateToProps, mapDispatchToProps)(Scratchpad)

export default connectedScratchpad
