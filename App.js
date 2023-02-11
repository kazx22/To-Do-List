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
  const [del, setdel] = useState([]);

  function goalTextHandler(goalText) {
    setGoalText(goalText);
  }
  function allTextHandler() {
    if (goalText.length !== 0) {
      setdel((prev) => [...prev, false]);
      setAllText((prev) => [...prev, goalText]);
      console.log(del);
      console.log(allText);
    } else {
      Alert.alert("No Input", "Dont Have Any hands Mate");
    }
  }
  function delButtonHandler(idx) {
    // console.log(del);
    setdel((prev) => [
      ...prev.slice(0, idx),
      !prev[idx],
      ...prev.slice(idx + 1),
    ]);
  }
  function taskDelHandler(idx) {
    setdel((prev) => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
    setAllText((prev) => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
  }
  return (
    <TailwindProvider>
      <View className="flex-1  items-center flex-col bg-white">
        <View className="mt-16 shadow-md">
          <TextInput
            multiline
            value={goalText}
            placeholder="What do you Want to Do Today"
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
            {allText.map((goal, idx) => (
              <View key={idx}>
                <TouchableOpacity
                  className="mt-4 w-80 rounded-lg shadow-sm"
                  onPress={() => delButtonHandler(idx)}
                >
                  <Text className=" text-md p-3 text-center">{goal}</Text>
                </TouchableOpacity>
                {del[idx] && (
                  <TouchableOpacity onPress={() => taskDelHandler(idx)}>
                    <AntDesign
                      name="caretup"
                      style={{
                        color: "#9D144C",
                        fontSize: 15,
                        marginBottom: -7,
                        marginLeft: 10,
                      }}
                    />
                    {allText.length > 0 && (
                      <View className="bg-pink-800 h-auto w-[27%] rounded-xl flex-row p-2 ">
                        <AntDesign
                          name="delete"
                          style={{
                            color: "white",
                            fontSize: 15,
                            marginTop: 2,
                            marginLeft: 2,
                          }}
                        />

                        <Text className="text-white text-center pl-2">
                          Delete
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </TailwindProvider>
  );
}
