import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapCreatorScreen from "screens/MapCreator";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapCreatorScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
