import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/signUp/SignUp';
import SignIn from './components/signIn/SignIn';
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
function App() {

  return (
    <>
     <Routes>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/' element={<SignIn/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
     </Routes>
    </>
  );
}

export default App;
