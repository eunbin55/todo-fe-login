import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { PrivateRoute } from "./route/PrivateRoute";
import { useEffect, useState } from "react";
import api from "./utils/api";

function App() {
  const [user, setUser] = useState(null);

  // token을 통해 유저 정보를 가져온다.
  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        const response = await api.get("/user/me");
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    // 웹사이트 시작하자마자 token을 통해 유저 정보 가져오기
    getUser();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage setUser={setUser} />
          </PrivateRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/login"
        element={<LoginPage user={user} setUser={setUser} />}
      />
    </Routes>
  );
}

export default App;
