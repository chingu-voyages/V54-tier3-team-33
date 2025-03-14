import "./index.css";
// @ts-expect-error fix later
import Grid from "./components/Grid.jsx";

function App() {
  return (
    <>
    
    <h1 className="bg-gray-700 py-10 text-center text-5xl text-red-500">
      hello react vite+TS
    </h1>
    <Grid />
    </>
  );
}

export default App;
