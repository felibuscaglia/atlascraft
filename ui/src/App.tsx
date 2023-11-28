import { UI_PATHS } from "lib/constants/paths";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "screens/Home";
import SignInScreen from "screens/SignIn";
import SignUpScreen from "screens/SignUp";
import MapEditorScreen from "screens/MapEditor";
import { Toaster } from "react-hot-toast";
import MapViewerScreen from "screens/MapViewer";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<HomeScreen />} />
          <Route path={UI_PATHS.EDIT_MAP} element={<MapEditorScreen />} />
          <Route path={UI_PATHS.VIEW_MAP} element={<MapViewerScreen />} />
          <Route path={UI_PATHS.SIGN_UP} element={<SignUpScreen />} />
          <Route path={UI_PATHS.SIGN_IN} element={<SignInScreen />} />
        </Routes>
      </Router>
      <Toaster toastOptions={{
        error: {
          duration: 4000, iconTheme: { primary: "var(--secondary-brand-color)", secondary: "var(--error-color)" }, position: "bottom-center", style: { maxWidth: "500px", fontFamily: "var(--font-family-text)", background: "var(--error-color)", color: 'var(--secondary-brand-color)' }
        }
      }} />
    </>
  );
};

export default App;
