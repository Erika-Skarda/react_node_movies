import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoutes path="/dashboard" exact component={Dashboard} role="ROLE_Admin"/>
    </Switch>
  )
}

export default Routes;