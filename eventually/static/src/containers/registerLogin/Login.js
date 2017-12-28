import React from 'react';
import {withRouter} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {loginService} from './registrationService.js';

const style = {
    margin: 12,
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    handleEmail = event => {
        this.setState({email: event.target.value});
    };

    handlePassword = event => {
        this.setState({password: event.target.value});
    };

    handleSubmit = event => {
        const email = this.state.email;
        const password = this.state.password;
        loginService(email, password)
            .then((response) => {
                this.props.history.push('/home');
            });
        event.preventDefault();
    };

    render() {
        return (
            <div style={style}>
                <h2>Email</h2>
                <TextField
                    onChange={this.handleEmail}
                    hintText='email'
                /><br/>
                <br/>
                <h2>Password</h2>
                <TextField
                    onChange={this.handlePassword}
                    hintText='password'
                    type="password"
                /><br/>
                <RaisedButton
                    label='Login'
                    primary={true}
                    onClick={this.handleSubmit}
                />
            </div>
        );
    }
}

export default withRouter(Login);