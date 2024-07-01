import Home from './components/pages/Home';
import Navbar from './components/utils/Navbar';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Features/Auth/Signup';
import Menu from './components/pages/Menu';
import MenuBar from './components/Features/Menu/MenuBar';
import Cart from './components/pages/Cart';
import AppLayout from './components/ui/FormComponents/AppLayout';
import AdminAppLayout from './components/ui/Admin/AdminAppLayout';
import Dashboard from './components/pages/Dashboard';
import Order from './components/pages/Order';
import User from './components/pages/User';
import Pizza from './components/pages/Pizza';
import Setting from './components/pages/Setting';
import ProtectedRoutes from './components/ui/ProtectedRoutes';
import ForgotPassword from './components/Features/Auth/ForgotPassword';
import ResetPassword from './components/Features/Auth/ResetPassword';
import UpdateMe from './components/Features/Auth/UpdateMe';
import OrderView from './components/Features/Order/OrderView';
import { Web3Provider } from './components/Service/Web3Context';
import ProtectedAdminRoutes from './components/ui/Admin/ProtectedAdminRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
});

function App() {
  return (
    <Web3Provider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<OrderView />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/:token" element={<ResetPassword />} />
            <Route path="/updateMe" element={<UpdateMe />} />
            <Route element={<ProtectedRoutes><AppLayout /></ProtectedRoutes>}>
              <Route path="/menu" element={<MenuBar />} />
              <Route path="/cart" element={<Cart />} />
              <Route element={<ProtectedAdminRoutes> <AdminAppLayout /></ProtectedAdminRoutes>}>
                <Route element={<Dashboard />} path="/dashboard" />
                <Route element={<Order />} path="/allorder" />
                <Route element={<User />} path="/user" />
                <Route element={<Pizza />} path="/pizza" />
                <Route element={<Setting />} path="/setting" />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Web3Provider>
  );
}

export default App;
