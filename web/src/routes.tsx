import { Redirect, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import SuccessCreateAccount from './pages/SuccessCreateAccount';
import ForgotPassword from './pages/ForgotPassword';
import SuccessResetPassword from './pages/SuccessResetPassword';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import TeacherForm from './pages/TeacherForm';
import TeacherList from './pages/TeacherList';
import { useAuth } from './contexts/AuthContext';

function PrivateRoute({ component: Component, ...rest }: any) {
    const { authenticated, loading } = useAuth()

    if (loading) {
        return <h1>Carregando</h1>
    }

    return (
        <Route
            {...rest}
            render={props => (
                authenticated
                    ?
                    (<Component {...props} />)
                    :
                    (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
            )
            }
        />
    )
}

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/success-create-account" component={SuccessCreateAccount} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/success-reset-credentials" component={SuccessResetPassword} />
            <PrivateRoute path="/home" component={Landing} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/give-classes" component={TeacherForm} />
            <PrivateRoute path="/study" component={TeacherList} />
        </Switch>
    )
}

export default Routes;