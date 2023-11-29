
import './TodoApp.css';
import {BrowserRouter, Routes, Route, useNavigate, Link, Navigate} from 'react-router-dom';

import LogoutComponent from './LogoutComponent';
import FooterComponent from './Footer';
import HeaderComponent from './Header';
import ListTodosComponent from './ListComponent';
import ErrorComponent from './ErrorComponent';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent';
import AuthProvider, {useAuth} from './security/AuthContext';
import TodoComponent from './TodoComponent';

function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    
    if(authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export default function TodoApp() {

    

    return (
      <div className="TodoApp">
        <AuthProvider>
          <BrowserRouter>
            <HeaderComponent />
            <Routes>
              <Route path="/" element={<LoginComponent />}></Route>
              {/* <Route path='/welcome' element={<WelcomeComponent />}></Route> */}
              <Route
                path="/welcome/:username"
                element={
                  <AuthenticatedRoute>
                    <WelcomeComponent />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/todos"
                element={
                  <AuthenticatedRoute>
                    <ListTodosComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/todo/:id"
                element={
                  <AuthenticatedRoute>
                    <TodoComponent />
                  </AuthenticatedRoute>
                }
              />

              <Route
                path="/logout"
                element={
                  <AuthenticatedRoute>
                    <LogoutComponent />
                  </AuthenticatedRoute>
                }
              />
              <Route path="*" element={<ErrorComponent />}></Route>
            </Routes>
            {/* <FooterComponent /> */}
          </BrowserRouter>
        </AuthProvider>
      </div>
    );
}
