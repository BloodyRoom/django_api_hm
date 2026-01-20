import './App.css'
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MePage from "./pages/MePage.tsx";

import {Route, Routes} from "react-router";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";

function App() {

    return (
        <Routes>
            <Route path={"/"}>
                <Route index element={<MePage />}/>
                <Route path={"register"} element={<RegisterPage />}/>
                <Route path={"login"} element={<LoginPage />}/>
                <Route path={"forgot"} element={<ForgotPassword />}/>
                <Route path="reset-password/:uid/:token" element={<ResetPassword />} />
            </Route>
        </Routes>
    )
}

export default App
