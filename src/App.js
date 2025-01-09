import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import 'react-toastify/dist/ReactToastify.css';
import OrdersScreen from "./screens/OrdersScreen";
import UsersScreen from "./screens/UsersScreen";
import RiderScreen from "./screens/RiderScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import CouponsScreen from "./screens/CouponsScreen";
import Example from "./components/Example";
// import RestroScreen from "./screens/RestroScreen";

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
            <Route path="/admin/orders" element={<OrdersScreen />} />
            <Route path="/admin/users" element={<UsersScreen />} />
            <Route path="/admin/rider" element={<RiderScreen />} />
            <Route path="/admin/restaurents" element={<RestaurantScreen />} />
            <Route path="/admin/coupons" element={<CouponsScreen />} />
            <Route path="/example" element={<Example />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
