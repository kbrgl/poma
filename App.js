import React from "react"

import { StyleSheet, SafeAreaView, View, TabBarIOS, StatusBar, Platform } from "react-native"
import PomodoroTimer from "./components/PomodoroTimer"
import Todos from "./components/Todos"
import { Ionicons } from "@expo/vector-icons"
import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation"

import { Provider } from "react-redux"
import { createStore } from "redux"
import pomodoroApp from "./reducers"

const safePomodoroTimer = () => (
  <SafeAreaView>
    <PomodoroTimer />
  </SafeAreaView>
)
const safeTodos = () => (
  <SafeAreaView>
    <Todos />
  </SafeAreaView>
)

const headerStyles = {
  headerStyle: { backgroundColor: "tomato" },
  headerTitleStyle: {
    color: "#ffffff"
  }
}

const PomodoroStack = StackNavigator({
  PomodoroTimer: {
    screen: safePomodoroTimer,
    navigationOptions: ({ navigation }) => ({
      title: "Pomodoro Timer",
      ...headerStyles
    })
  }
})
const TodosStack = StackNavigator({
  Todos: {
    screen: safeTodos,
    navigationOptions: ({ navigation }) => ({
      title: "Todos",
      ...headerStyles
    })
  }
})

let store = createStore(pomodoroApp)

const Tabs = TabNavigator(
  {
    Timer: { screen: PomodoroStack },
    Todos: { screen: TodosStack }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === "Timer") {
          iconName = `ios-timer${focused ? "" : "-outline"}`
        } else if (routeName === "Todos") {
          iconName = `ios-star${focused ? "" : "-outline"}`
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    },
    animationEnabled: Platform.OS === "ios" ? false : true,
    swipeEnabled: false
  }
)

export default class App extends React.Component {
  render() {
    StatusBar.setBarStyle("light-content", true)
    return (
      <Provider store={store}>
        <Tabs />
      </Provider>
    )
  }
}
