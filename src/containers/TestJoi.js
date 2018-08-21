import React from 'react';
import Joi from 'joi';

class TestJoi extends React.Component{

    testJoi () {
        var schema = Joi.object().options({abortEarly:false})
        .keys({
            name: Joi.string().alphanum().min(3).max(30).required().label("User Name"),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            access_token: [Joi.string(), Joi.number()],
            birthyear: Joi.number().integer().min(1900).max(2013),
            email: Joi.string().email({ minDomainAtoms: 2 })
        }).with('username', 'birthyear').without('password', 'access_token');

        return Joi.validate({username:'bc',birthyear:1899},schema);
    }

    testObject() {

    }

    render() {
        var source = {username:"name",password:"123"};
        const {
            username, password
        } = source;
      
        console.log(username, password);

        return(                 
            <div>{JSON.stringify(this.testJoi())}</div>
        );
    };
};

export default TestJoi;