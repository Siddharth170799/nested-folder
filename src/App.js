import "./App.css";
import NestedFolder from "./NestedFolder";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        style={{
          "--success-bg": "#16a34a",
          "--success-border": "#15803d",
          "--success-text": "#ffffff",
        }}
      />
      <NestedFolder />
    </>
  );
}

export default App;
