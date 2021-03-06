import NavBar from './components/NavBar';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import CustomerSignupScreen from './screens/Signup/CustomerSignupScreen';
import VendorSignupScreen from './screens/Signup/VendorSignupScreen';
import TailorSignupScreen from './screens/Signup/TailorSignupScreen';
import ProductsScreen from './screens/ProductsScreen';
import ServicesScreen from './screens/ServicesScreen';
import ServicesDetailsScreen from './screens/ServicesDetailsScreen';
import CartScreen from './screens/CartScreen';
import CustomRequestsSceen from './screens/CustomRequestsSceen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CustomFormScreen from './screens/CustomFormScreen';

function App() {
  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path='/' element={<LandingScreen />} exact />
          <Route path='/login' element={<LoginScreen />} exact />
          <Route path='/customer' element={<CustomerSignupScreen />} exact />
          <Route path='/vendor' element={<VendorSignupScreen />} exact />
          <Route path='/tailor' element={<TailorSignupScreen />} exact />
          <Route path='/products' element={<ProductsScreen />} exact />
          <Route path='/services' element={<ServicesScreen />} exact />
          <Route path='/services/:id' element={<ServicesDetailsScreen />} />
          <Route path='/requests' element={<CustomRequestsSceen />} exact />
          <Route path='/requests/form' element={<CustomFormScreen />} exact />
          <Route path='/product/:id' element={<ProductDetailsScreen />} />
          <Route path='/cart/'>
            <Route path='' element={<CartScreen />} exact />
            <Route path=':id' element={<CartScreen />} exact />
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
