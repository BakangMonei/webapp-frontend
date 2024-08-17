import { lazy } from "react";
import {
  BrowserRouter as Router,
  Route, Routes, Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux"; // Import createStore from redux
import rootReducer from "./redux/reducers"; // Import your root reducer
import "./App.css";
import { auth } from "./database/firebase";

const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));


// Create Redux store
const store = createStore(rootReducer);

// Function to check if user is authenticated
const isAuthenticated = () => {
  return auth.currentUser !== null;
};

// Private Route component to handle authentication
const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? element : <Navigate to="/LoginPage" />;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* <Route path="/LandingPage" element={<LandingPage />} /> */}
          {/* <Route path="/SplashScreen" element={<SplashScreen />} /> */}

          {/* More functionality routes as needed */}
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/RegistrationPage" element={<RegistrationPage />} />
          
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;