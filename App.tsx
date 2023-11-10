import Home from "./src/screens/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider } from "native-base";

// const queryClient = new QueryClient();

export default function App() {
  return (
    // <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
      <Home />
      </NativeBaseProvider>
    // </QueryClientProvider>
  );
}
