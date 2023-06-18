import { NavigationContainer } from "@react-navigation/native";
import StackNavigators from "./StackNavigators";
import { AuthProvider } from "./hooks/useAuth";
import "expo-dev-client";
export default function App() {
  return (
    <NavigationContainer>
      {/* HOC -- Higher Order Components */}
      <AuthProvider>
        {/* Passes down the cool auth stuff to children ... */}
        <StackNavigators />
      </AuthProvider>
    </NavigationContainer>
  );
}
