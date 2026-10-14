// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing'; 
import Home from './pages/home';
import Layout from './layout/layout';
import Pacientes from './pages/pacientes';
function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Layout />} >
          <Route index element={<Home />} />
        </Route>
        <Route path="/pacientes" element={<Layout />} >
          <Route index element={<Pacientes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;   