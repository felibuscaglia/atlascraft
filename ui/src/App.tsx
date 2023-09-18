import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AtlasCreatorScreen from "screens/AtlasCreator";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AtlasCreatorScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
