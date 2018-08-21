import React, {Component} from 'react';
import Joi from 'joi';
import {Form, HelpBlock, FormGroup, FormControl, Button} from 'react-bootstrap';
import validate from "react-joi-validation";

var schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().min(8).required()
  });
   
  export default class App extends Component {
    render() {

     console.log(this.props);
      const {
        username, password ,
        errors, changeHandler, validateHandler 
      } = this.props;
   
      return(
        <div >
          <input type="text"
            value={username}
            onChange={ changeHandler('username') }
            onBlur={ validateHandler('username') }
          />
   
          <span className="style.error"> { errors.username } </span>
   
          <input type="password"
            value={password}
            onChange={ changeHandler('password') }
            onBlur={ validateHandler('password') }
          />
   
          <span className="style.error"> { errors.password } </span>
   
          <input type="Submit" value="Sign In" />
        </div>
      );
    }
  }
   
  App.defaultProps = {
    username: '',
    password: ''
  };
   
  var validationOptions = {
    joiSchema: schema,
    only: 'user'
  };
   
  validate(App, validationOptions)