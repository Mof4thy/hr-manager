import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HrDashboard from './pages/HrDashboard/HrDashboard'
import ApplicantForm from './pages/ApplicantForm/ApplicantForm'
import { FormProvider } from './context/FormContext'
import { LanguageProvider } from './context/LanguageContext'
import Login from './pages/Login'
import ApplicationDetails from './pages/HrDashboard/ApplicationDetails'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedRouteUserManagment from './pages/userManagment/components/ProtectedRoute'
import Profile from './pages/profile'
import Layout from './components/Layout'
import UserManagment from './pages/UserManagment/userManagment'


function App() {

  return (
    <>
      <LanguageProvider>
        <FormProvider>
          <Router>
            <Routes>
              <Route path='/applicant-form' element={<ApplicantForm />} />
              <Route path='/login' element={<Login />} />
              
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout/>}>
                  <Route index element={<HrDashboard />} />
                  <Route path='/applications/:id' element={<ApplicationDetails />} />
                  <Route path='/profile' element={<Profile />} /> 
                  <Route element={<ProtectedRouteUserManagment />}>
                    <Route path='/user-managment' element={<UserManagment />} />
                  </Route>
                </Route> 
              </Route>
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </Router> 
        </FormProvider>
      </LanguageProvider>
    </>
  ) 
}

export default App
