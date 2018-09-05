import React from 'react';
import Joi from 'joi';
import {Form, Button} from 'react-bootstrap';
import GBInput from '../classes/GBInput';

class MyPlayer extends React.Component{
    constructor(props){
        super(props);

        this.myData = {
            components: [{ 
                name: "name",
                label: "User Name",
                placeholder : "Please enter User Name",
                type: "text"
                },{
                    name: "birthyear",
                    label: "Birth Year",
                    placeholder : "Please enter Birth Year",
                    type: "number"
                },
            ],
            values : {
                name:"Zorro",
                birthyear: 0
                }
            };

        this.myComponent = this.myData.components;
        const user = this.myData.values;

        this.state ={
            user
        };

        this.validation = this.getDefaultValidation(this.state.user);
        this.submit = this.submit.bind(this);
        this.handleChildChange = this.handleChildChange.bind(this);
        this.schema = Joi.object().options({abortEarly:false}).keys({
            name: Joi.string().alphanum().min(3).max(30).required().label("User Name"),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            access_token: [Joi.string(), Joi.number()],
            birthyear: Joi.number().integer().min(1900).max(2013).label("Birth Year"),
            email: Joi.string().email({ minDomainAtoms: 2 })
        }).with('name', 'birthyear').without('password', 'access_token');

        console.log(Joi.validate({name:'abc'},this.schema));
        //var result = Joi.validate({username:'abc',birthyear:1994},schema);

        this.validate(this.state.user);
    }

    getDefaultValidation(par){
        //initialised validation
        let result = {disabled:true};
        let keys = Object.keys(par);

        keys.forEach( k => {
            result[k] = {valid:true, message:""}
        });
        return result;
    }
 
    getMyInput(par){
        var attrs = par;
        par['onValueChange'] = this.handleChildChange;
        par['validation'] = this.validation[par['name']];
        par['value'] = this.state.user[par['name']];
        par['key'] = par['name'];
        return (
            <GBInput {...attrs} />
        )
    }

    validate(val){
        let validation = this.getDefaultValidation(val);
        validation.disabled = false;
    
        var err = Joi.validate(val, this.schema);
            
        if(err.error){
            validation.disabled = true;
            err.error.details.forEach((detail)=>{
                validation[detail.path[0]].valid = false;
                validation[detail.path[0]].message = detail.message;
            })
        }

        this.validation=validation;
    }

    handleChildChange(val){
        let user = Object.assign({}, this.state.user);
        let key = Object.keys(val);
        user[key[0]] = val[key[0]];

        this.validate(user);
        this.setState({user});
    }

    submit(e) {
        alert('MyPlayer' + JSON.stringify(this.state.user, null , 4));
        e.preventDefault();
    }
    
    render() {
        const Test = this.myComponent.map((par) => {return this.getMyInput(par)});

        return(
            <Form onSubmit={this.submit}>
                {Test}
            <Button type="submit" disabled={this.validation.disabled}>Submit</Button>
        </Form>
        );

/*
        return(                 
            <Form onSubmit={this.submit}>
                <GBInput value={this.state.user.name} name="name" onValueChange={this.handleChildChange} label="User Name" placeholder="Enter user name" type="text" validation={this.validation['name']}/>
                <GBInput value={this.state.user.birthyear} name="birthyear" label="Birth Year" onValueChange={this.handleChildChange} placeholder="Enter user birth year" type="number" validation={this.validation['birthyear']}/>
            <Button type="submit" disabled={this.validation.disabled}>Submit</Button>
        </Form>)
        */
    };
};

export default MyPlayer;