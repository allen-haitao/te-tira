import React,  { useEffect }  from "react";
import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, LogInPage, RegisterPage, DetailPage, RoomPage, SearchPage, ShoppingCartPage, BookingPage } from "./pages";
import { Navigate } from "react-router-dom";
import { useSelector, useAppDispatch } from "./redux/hooks";
import { getShoppingCart } from "./redux/shoppingCart/slice";

const PrivateRoute = ({ children }) => {
  const jwt = useSelector((s) => s.user.token);
  return jwt ? children : <Navigate to="/login" />;
};

function App() {
  const jwt = useSelector((s) => s.user.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);
  
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:hotelId" element = {<DetailPage />} />
          <Route path="/rooms/roomTypeId" element = {<RoomPage />} />
          <Route path="/search/:keywords" element = {<SearchPage />} />
          <Route
            path="/shoppingCart"
            element={
              <PrivateRoute>
                <ShoppingCartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <PrivateRoute>
                <BookingPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element = {<h1>404 not found Welcome to Mars</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;