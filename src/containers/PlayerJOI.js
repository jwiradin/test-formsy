import React from 'react';
import Joi from 'joi';
import {Form, HelpBlock, FormGroup, FormControl, Button, ControlLabel} from 'react-bootstrap';
class PlayerJOI extends React.Component{
    constructor(props){
        super(props);
        
        this.state ={
            user: { name: "",birthyear:""}
        };

        this.validation = this.getDefaultValidation(this.state.user);

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.schema = Joi.object().options({abortEarly:false}).keys({
            name: Joi.string().alphanum().min(3).max(30).required().label("User Name"),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            access_token: [Joi.string(), Joi.number()],
            birthyear: Joi.number().integer().min(1900).max(2013).label("Birth Year"),
            email: Joi.string().email({ minDomainAtoms: 2 })
        }).with('username', 'birthyear').without('password', 'access_token');

        //var result = Joi.validate({username:'abc',birthyear:1994},schema);
    }

    getDefaultValidation(par){
        //initialised validation
        let result = {disabled:false};
        let keys = Object.keys(par);

        keys.forEach( k => {
            result[k] = {valid:true, message:""}
        });
        return result;
    }
 
    handleChange(e) {
        let user = Object.assign({}, this.state.user);
        user[e.target.name] = e.target.value;

        Joi.validate(user, this.schema, (err,value)=>{

            let validation = this.getDefaultValidation(user);

            if(err){
                validation.disabled = true;
                err.details.forEach((detail)=>{
                    validation[detail.path[0]].valid = false;
                    validation[detail.path[0]].message = detail.message;
                })
            }
            this.validation = validation;
            this.setState({user});
        });
    };

    submit(e) {
        alert(JSON.stringify(this.state.user, null , 4));
        e.preventDefault();
    }
    
    render() {

        return(                 
            <Form onSubmit={this.submit} className="login">
            <FormGroup
                controlId="username"
                validationState ={this.validation['name'].valid ? null : "error"}
            >
                <ControlLabel>User Name</ControlLabel>
                <FormControl type="text" value={this.state.user.name} 
                    onChange={this.handleChange} 
                    name="name" placeholder="Enter user name" />
                <FormControl.Feedback />
                <HelpBlock>{this.validation['name'].message}</HelpBlock>
            </FormGroup>
            <FormGroup
                controlId="userbirthyear"
                validationState ={this.validation['birthyear'].valid ? null : "error"}
            >
                <ControlLabel>Birth year</ControlLabel>
                <FormControl name="birthyear" value={this.state.user.birthyear} onChange={this.handleChange} placeholder="Enter user's birth year" type="number" />
                <FormControl.Feedback />
                <HelpBlock>{this.validation['birthyear'].message}</HelpBlock>
            </FormGroup>
            <Button type="submit" disabled={this.validation.disabled}>Submit</Button>
        </Form>)
    };
};

export default PlayerJOI;