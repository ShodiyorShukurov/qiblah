import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from "react-query";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
