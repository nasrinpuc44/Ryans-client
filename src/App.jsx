// App.jsx (updated)
import { Routes, Route } from "react-router-dom";
import Root from "./Root.jsx";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import Printer from "./pages/Printer.jsx"; // Add this import

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="order/:id" element={<OrderPage />} />
        <Route path="category/printer" element={<Printer />} /> {/* Add this route */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;