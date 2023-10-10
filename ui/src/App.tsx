import { UI_PATHS } from "lib/constants/paths";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AtlasCreatorScreen from "screens/AtlasCreator";
import SignInScreen from "screens/SignIn";
import SignUpScreen from "screens/SignUp";
import { AuthProvider } from "react-auth-kit";

const App = () => {
  return (
    <AuthProvider
      authType="cookie"
      authName="_auth"
      cookieDomain={window.location.hostname}
      cookieSecure
    >
      <Router>
        <Routes>
          <Route path="/" element={<AtlasCreatorScreen />} />
          <Route path={UI_PATHS.SIGN_UP} element={<SignUpScreen />} />
          <Route path={UI_PATHS.SIGN_IN} element={<SignInScreen />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
