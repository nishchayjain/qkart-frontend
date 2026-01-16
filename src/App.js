import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
// CRIO_SOLUTION_START_MODULE_CART
import Checkout from "./components/Checkout";
// CRIO_SOLUTION_END_MODULE_CART
// CRIO_SOLUTION_START_MODULE_CHECKOUT
import Thanks from "./components/Thanks";
// CRIO_SOLUTION_END_MODULE_CHECKOUT

export const config = {
  // endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
  // CRIO_SOLUTION_START_MODULE_DEPLOYMENT
  // endpoint: `https://qkart-frontend.herokuapp.com/api/v1`,
  endpoint: `https://content-qkart-frontend-v2-backend.azurewebsites.net/api/v1`,
  // CRIO_SOLUTION_END_MODULE_DEPLOYMENT
};

function App() {
  return (
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
      {/* CRIO_SOLUTION_START_MODULE_LOGIN */}
      <Switch>
        <Route path="/register">
          {/* CRIO_SOLUTION_END_MODULE_LOGIN */}
          <Register />
          {/* CRIO_SOLUTION_START_MODULE_LOGIN */}
        </Route>
        {/* CRIO_SOLUTION_END_MODULE_LOGIN */}
        {/* CRIO_SOLUTION_START_MODULE_LOGIN */}
        {/* TODO: CRIO_TASK_MODULE_REGISTER - To add route for /login */}
        <Route path="/login">
          <Login />
        </Route>
        {/* CRIO_SOLUTION_END_MODULE_LOGIN */}
        {/* CRIO_SOLUTION_START_MODULE_LOGIN */}
        <Route exact path="/">
          <Products />
        </Route>
        {/* CRIO_SOLUTION_END_MODULE_LOGIN */}
        {/* CRIO_SOLUTION_START_MODULE_CART */}
        <Route path="/checkout">
          <Checkout />
        </Route>
        {/* CRIO_SOLUTION_END_MODULE_CART */}
        {/* CRIO_SOLUTION_START_MODULE_CHECKOUT */}
        <Route path="/thanks">
          <Thanks />
        </Route>
        {/* CRIO_SOLUTION_END_MODULE_CHECKOUT */}
        {/* CRIO_SOLUTION_START_MODULE_LOGIN */}
      </Switch>
      {/* CRIO_SOLUTION_END_MODULE_LOGIN */}
    </div>
  );
}

export default App;
