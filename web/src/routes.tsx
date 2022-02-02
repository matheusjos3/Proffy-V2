import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import SuccessCreateAccount from './pages/SuccessCreateAccount';
import ForgotPassword from './pages/ForgotPassword';
import SuccessResetPassword from './pages/SuccessResetPassword';
import Landing from './pages/Landing';
import Profile from './pages/Profile';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/create-account" component={CreateAccount} />
                <Route path="/success-create-account" component={SuccessCreateAccount} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/success-reset-credentials" component={SuccessResetPassword} />
                <Route path="/home" component={Landing} />
                <Route path="/profile" component={Profile} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;