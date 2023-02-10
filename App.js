import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Svg,
  Button,
  TextInput,
  Icon,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TailwindProvider } from "tailwindcss-react-native";

export default function App() {
  const [goalText, setGoalText] = useState("");
  const [allText, setAllText] = useState([]);
  function goalTextHandler(goalText) {
    setGoalText(goalText);
  }
  function allTextHandler() {
    if (goalText.length !== 0) {
      setAllText((prev) => [...prev, goalText]);
    } else {
      Alert.alert("No Input", "Dont Have Any hands Mate");
    }
  }

  return (
    <TailwindProvider>
      <View className="flex-1  items-center flex-col bg-white">
        <View className="mt-16 shadow-md">
          <TextInput
            multiline
            value={goalText}
            placeholder="What you Want to Do Today"
            onChangeText={goalTextHandler}
            className="w-80 rounded-xl border-2 border-gray-200 py-2.5 pl-4 text-left relative"
          />
          <TouchableOpacity
            className="rounded-full bg-rose-600 p-2  absolute right-4 top-3"
            style={{ elevation: 8 }}
            onPress={() => {
              allTextHandler();
              setGoalText("");
            }}
          >
            <AntDesign name="plus" style={{ color: "white" }} />
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView className="flex-1 flex-col bg-white ">
            {allText.map((goal) => (
              <View className="mt-3 w-80 rounded-lg shadow-sm">
                <Text key={goal} className=" text-md p-3 text-center">
                  {goal}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </TailwindProvider>
  );
}
