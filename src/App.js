// import "./App.css";
// import Index from "./pages/Home/Index";
// import Login from "./pages/Auth/Login";
// import CampaignDetail from "./pages/Home/CampaignDetail";
// import ForgotPassword from "./pages/Auth/Forgot-password";
// import ExamScheduleManagement from "./pages/Admin/ExamScheduleManagement/ExamScheduleManagement";
// import ExamSecretaryManagement from "./pages/Admin/ExamSecretaryManagement/ExamSecretaryManagement";
// import Register from "./pages/Auth/Register";
// import Secretary from "./pages/User/Secretary";
// import SecretaryRegister from "./pages/User/Secretary-register";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { getProfileAction } from "./redux/auth/Auth.action";

// function App() {
//   const {auth} = useSelector(store => store)
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem("jwt");
//   useEffect(() => {
//     console.log(auth.user)
//     dispatch(getProfileAction(jwt));
//   }, [jwt]);
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={auth.user?<Index />: <Login/>} />
//           <Route path="/campaign-detail" element={<CampaignDetail />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route
//             path="/exam-schedule-management"
//             element={<ExamScheduleManagement />}
//           />
//           <Route
//             path="/exam-secretary-management"
//             element={<ExamSecretaryManagement />}
//           />
//           <Route path="/register" element={<Register />} />
//           <Route path="/secretary" element={<Secretary />} />
//           <Route path="/secretary-register" element={<SecretaryRegister />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import Index from "./pages/Home/Index";
import Login from "./pages/Auth/Login";
import CampaignDetail from "./pages/Home/CampaignDetail";
import ForgotPassword from "./pages/Auth/Forgot-password";
import ExamScheduleManagement from "./pages/Admin/ExamScheduleManagement/ExamScheduleManagement";
import ExamSecretaryManagement from "./pages/Admin/ExamSecretaryManagement/ExamSecretaryManagement";
import Register from "./pages/Auth/Register";
import Secretary from "./pages/User/Secretary";
import SecretaryRegister from "./pages/User/Secretary-register";

import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileAction } from "./redux/auth/Auth.action";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getProfileAction(jwt));
    }
  }, [jwt, dispatch]);

  const isAdmin = auth.user?.role === "admin";
  const isUser = auth.user?.role === "user";
  
  console.log(auth.user?.role);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={auth.user? <Index /> : <Login />} />

          {/* Admin-Only Routes */}
          {isAdmin && (
            <>
              <Route path="/" element={<Index />} />
              <Route path="/campaign-detail" element={<CampaignDetail />} />
              <Route
                path="/exam-schedule-management"
                element={<ExamScheduleManagement />}
              />
              <Route
                path="/exam-secretary-management"
                element={<ExamSecretaryManagement />}
              />
            </>
          )}

          {/* User-Only Routes */}
          {isUser && (
            <>
              <Route path="/" element={<Index />} />
              <Route path="/secretary" element={<Secretary />} />
              <Route
                path="/secretary-register"
                element={<SecretaryRegister />}
              />
            </>
          )}          
          {/* Fallback Route */}
          {auth.user && <Route path="*" element={<Navigate to="/" />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
