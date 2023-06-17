import { NavigationContainer } from "@react-navigation/native";
import StackNavigators from "./StackNavigators";

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigators />
    </NavigationContainer>
  );
}
