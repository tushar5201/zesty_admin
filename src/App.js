import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <main>
          <ToastContainer position="bottom-center" limit={1} />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/admin/signin" element={<SigninScreen />} />
            <Route path="/admin/signup" element={<SignupScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
