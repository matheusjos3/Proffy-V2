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
import Loading from './components/Loading';
import SuccessCreateClass from './pages/SuccessCreateClass';
import { useAuth } from './contexts/AuthContext';

function PrivateRoute({ component: Component, ...rest }: any) {
    const { authenticated, loading } = useAuth()

    if (loading) {
        return <Loading color='#6A6180' />
    }

    return (
        <Route
            {...rest}
            render={props => (
                authenticated
                    ?
                    (<Component {...props} />)
                    :
                    (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
            )
            }
        />
    )
}

function Routes() {
    return (
        <Switch>
            <PrivateRoute path="/" exact component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/success-create-account" component={SuccessCreateAccount} />
            <Route path="/success-create-class" component={SuccessCreateClass} />
            <Route path="/success-reset-credentials" component={SuccessResetPassword} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/give-classes" component={TeacherForm} />
            <PrivateRoute path="/study" component={TeacherList} />
        </Switch>
    )
}

export default Routes;