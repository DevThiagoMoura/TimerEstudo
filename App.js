import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import TimerEstudo from "./components/TimerEstudo";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <StatusBar barStyle="light-content" />
      <TimerEstudo />
    </SafeAreaView>
  );
}
