import { UI_PATHS } from "lib/constants/paths";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "screens/Home";
import SignInScreen from "screens/SignIn";
import SignUpScreen from "screens/SignUp";
import MapEditorScreen from "screens/MapEditor";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<HomeScreen />} />
        <Route path={UI_PATHS.EDIT_MAP} element={<MapEditorScreen />} />
        <Route path={UI_PATHS.SIGN_UP} element={<SignUpScreen />} />
        <Route path={UI_PATHS.SIGN_IN} element={<SignInScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
