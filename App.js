import React from "react"
import Icon from "react-native-vector-icons/Ionicons"
import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { StatusBar, Platform } from "react-native"

import PomodoroTimer from "./components/PomodoroTimer"
import Settings from "./components/Settings"
import Todos from "./components/Todos"

import pomodoroApp from "./reducers"

const store = createStore(pomodoroApp)

const headerStyles = {
  headerStyle: { backgroundColor: "tomato" },
  headerTitleStyle: {
    color: "#ffffff"
  }
}

const PomodoroStack = StackNavigator({
  PomodoroTimer: {
    screen: PomodoroTimer,
    navigationOptions: () => ({
      title: "Pomodoro Timer",
      ...headerStyles
    })
  }
})
const TodosStack = StackNavigator({
  Todos: {
    screen: Todos,
    navigationOptions: () => ({
      title: "Todos",
      ...headerStyles
    })
  }
})
const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: () => ({
      title: "Settings",
      ...headerStyles
    })
  }
})

const Tabs = TabNavigator(
  {
    Timer: { screen: PomodoroStack },
    Todos: { screen: TodosStack },
    Settings: { screen: SettingsStack }
  },
  {
    navigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === "Timer") {
          iconName = `ios-timer${focused ? "" : "-outline"}`
        } else if (routeName === "Settings") {
          iconName = `ios-cog`
        } else if (routeName === "Todos") {
          iconName = `ios-star${focused ? "" : "-outline"}`
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={25} color={tintColor} />
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    },
    animationEnabled: Platform.OS !== "ios",
    swipeEnabled: false
  }
)

const App = () => {
  StatusBar.setBarStyle("light-content", true)
  return (
    <Provider store={store}>
      <Tabs />
    </Provider>
  )
}

export default App
