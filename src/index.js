import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./pages/Auth/auth-context";
import { DataProvider } from "./pages/data-context";
import { ProductsProvider } from "./pages/Products/products-context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <DataProvider>
          <Router>
            <App />
          </Router>
        </DataProvider>
      </ProductsProvider>
    </AuthProvider>
  </StrictMode>,
  rootElement
);
