import React from 'react';
import Joi from 'joi';
import JoiAPI from '../services/JoiAPI';
import reactJoiValidation from 'react-joi-validation';

class TestJoi extends React.Component{

    testJoi () {
        var schema = Joi.object().options({abortEarly:false})
        .keys({
            name: Joi.string().alphanum().min(3).max(30).required().label("User Name").notes(['Line1','Line2']).description('This is a description'),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).options({ language: { string :{regex: { base: 'Invalid {{label}} format'}}}}),
            access_token: [Joi.string(), Joi.number()],
            birthyear: Joi.number().integer().min(1900).max(2013),
            email: Joi.string().email({ minDomainAtoms: 2 })
        }).with('username', 'birthyear').without('password', 'access_token');

        return <div><pre>{JSON.stringify(Joi.validate({name:'bc',birthyear:1899, email: 'abc', password: '1'},schema),null, 4)}</pre></div>;

    }

    testObject() {
        const joiTest = JoiAPI.dependency();
        
        return  joiTest.data.map( d => <div><pre>{JSON.stringify(Joi.validate(d, joiTest.schema),null, 4)}</pre></div>);

    }

    testObject() {

        //const joiTest = JoiAPI.dependency();
        const joiTest = JoiAPI.conditional();
        return  joiTest.data.map( d => <div><pre>{JSON.stringify(Joi.validate(d, joiTest.schema),null, 4)}</pre></div>);

    }

    testConditional(){
        const schema = {
            type: Joi.string().required(),
            subtype: Joi.alternatives()
                .when('type', {is: 'video', then: Joi.valid('mp4', 'wav')})
                .when('type', {is: 'audio', then: Joi.valid('mp3')})
                .when('type', {is: 'image', then: Joi.valid('jpg', 'png')})
                .when('type', {is: 'pdf'  , then: Joi.valid('document')})
        };
        
        const result = 
        <div>
            <div><pre>{JSON.stringify(Joi.validate({ type: 'video', subtype: 'mp4' }, schema),null,4)}</pre></div>
            <div><pre>{JSON.stringify(Joi.validate({ type: 'video', subtype: 'wav' }, schema),null,4)}</pre></div>
            <div><pre>{JSON.stringify(Joi.validate({ type: 'other', subtype: 'something' }, schema),null,4)}</pre></div>
            <div><pre>{JSON.stringify(Joi.validate({ type: 'audio', subtype: 'mp4' }, schema),null,4)}</pre></div>
        </div>

        return result;
    }


    render() {
        var source = {test: {name:"name",password:"123"}};
        const {
            password
        } = source.test;
      
        console.log(password);

        return(          
            this.testObject()
        );
    };
};

export default TestJoi;