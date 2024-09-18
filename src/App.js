import React from 'react';
import { Box, CssBaseline, Toolbar, Container } from '@mui/material';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import Footer from './Components/Footer';
import Login from './Components/Login';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import Categories from './Components/Categories';
import CategoriesItem from './Components/CategoriesItem';
const App = () => {
  const [isSidebarOpen, setSidebar] = React.useState(false); // Fix variable name to use lowercase

  const handleClick = () => {
    setSidebar(!isSidebarOpen); // Call to open the sidebar
  };

  return (
    <Router>
    <Box sx={{ display: 'flex' }}>

      {/* Sidebar */}
      {isSidebarOpen && <Sidebar />}

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f0f0f0', p: 3, minHeight: '100vh' }}>
      <Header handleClick={handleClick} isSidebarOpen={isSidebarOpen} />
       <Toolbar />
      
        <Container>
        <Routes>
  <Route path="/" exact element={<Dashboard />} />
  <Route path="/login" element={<Login />} />
  <Route path="/task" element={<Categories />} />
  <Route path="/categories-item" element={<CategoriesItem />} />
</Routes>
          
          </Container>
        
      </Box>

     
    </Box>
    </Router>
  );
};

export default App;
