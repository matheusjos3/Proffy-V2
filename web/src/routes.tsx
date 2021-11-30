import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import SuccessCreateAccount from './pages/SuccessCreateAccount';
import ForgotPassword from './pages/ForgotPassword';
import SuccessResetPassword from './pages/SuccessResetPassword';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/create-account" component={CreateAccount} />
                <Route path="/success-create-account" component={SuccessCreateAccount} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/success-reset-credentials" component={SuccessResetPassword} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;