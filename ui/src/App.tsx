import { UI_PATHS } from "lib/constants/paths";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AtlasCreatorScreen from "screens/AtlasCreator";
import SignUpScreen from "screens/SignUp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AtlasCreatorScreen />} />
        <Route path={UI_PATHS.SIGN_UP} element={<SignUpScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
