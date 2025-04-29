import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import LoginPage from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Sidebar from './components/sidebar/sidebar';
import Tenders from './pages/tenders/tenders';
import Users from './pages/users/users';
import { useDispatch } from 'react-redux';
import NewTender from './pages/tenderCRUD/tenderCRUD';
import TenderDetails from './pages/tenderDetails/tenderDetails';
import CarDetails from './pages/carDetails/carDetails';
import SaleCalendar from './pages/saleCalendar/saleCalendar';
import CommunityManagement from './pages/community/community';
import UserDetails from './pages/userDetails/userDetails';
import NewSaleCalendar from './pages/newSaleCalendar/newSaleCalendar';
import NewUser from './pages/newUsers/newUsers';
import NewCommunity from './pages/newCommunity/newCommunity';
import CommunityDetails from './pages/communityDetails/communityDetails';
import SnackbarAlert from './components/snackbar/snackbar';
import PrivateRoute from './components/privateRoute/privateRoute';
import { logoutUser } from './slices/authSlice';
import { isSessionExpired } from './utility/sessionUtlis';
import { showSnackbar } from '../src/slices/snackbarSlice';
import Profile from './pages/profile/profile';
import Reports from './pages/reports/reports';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
  },
})

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSessionExpired()) {
        dispatch(logoutUser());
        dispatch(showSnackbar({ message: 'Session expired. Please login again', severity: 'warning' }))
        navigate('/');
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch, navigate])

  return (
    <ThemeProvider theme={theme}>
        <MainLayout />
    </ThemeProvider>
  );
}

function MainLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div style={{ display: 'flex' }}>
      {!isLoginPage && <Sidebar />}
      <div
        style={{
          width: '100%',
          padding: '0',
        }}
      >
          <SnackbarAlert />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/dashboard" element={<PrivateRoute>
                <Dashboard />
              </PrivateRoute>} />
              <Route path="/tenders" element={<Tenders />} />
              <Route path="/tenders/newTender" element={<NewTender />} />
              <Route path='/tenders/tenderDetail' element={<TenderDetails />} />
              <Route path='/tenders/tenderDetail/carDetail' element={<CarDetails />} />
              <Route path='/saleCalender' element={<SaleCalendar />} />
              <Route path='/saleCalender/newSaleCalendar' element={<NewSaleCalendar />} />
              <Route path='/community' element={<CommunityManagement />} />
              <Route path='/community/newCommunity' element={<NewCommunity />} />
              <Route path='/community/communityDetails' element={<CommunityDetails />} />
              <Route path='/users' element={<Users />} />
              <Route path='/users/userDetails' element={<UserDetails />} />
              <Route path='/users/newUsers' element={<NewUser />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/reports' element={<Reports />} />
            </Routes>
      </div>
    </div>
  );
}

export default App;