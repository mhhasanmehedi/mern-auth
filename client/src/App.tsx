import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./screens/home";
import About from "./screens/about";
import NotFound from "./screens/not-found";
import Header from "./components/layouts/header";
import Footer from "./components/layouts/footer";
import Login from "./screens/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterPage from "./screens/register";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
