import './App.css'
import { Route, Routes } from 'react-router'
import RegisterPage from './pages/RegisterPage'
import MainLayout from './components/layouts/MainLayout'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
