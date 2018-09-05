// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
import Joi from "joi"

var JoiAPI = {

    dependency: function () { 
        const schema = {
            type: Joi.string().required(),
            subtype: Joi.alternatives()
                .when('type', {is: 'video', then: Joi.valid('mp4', 'wav')})
                .when('type', {is: 'audio', then: Joi.valid('mp3')})
                .when('type', {is: 'image', then: Joi.valid('jpg', 'png')})
                .when('type', {is: 'pdf'  , then: Joi.valid('document')})
        };
        const data = [
            { type:'video', subtype:'mp4'},
            { type: 'video', subtype: 'wav' },
            { type: 'other', subtype: 'something' },
            { type: 'audio', subtype: 'mp4' }
        ];

        const result ={};
        result.schema = schema;
        result.data = data;

        return result 
    },
    conditional: function () {
        const intRating = Joi.number().integer().min(1).max(5);

        const schema = Joi.object().keys({
            // Do you know any French people? yes or no (required)
            q1: Joi.boolean().required(),
            // Do you know any Parisians? yes or no (required if answered yes in q1)
            q2: Joi.boolean()
                .when('q1', { is: true, then: Joi.required() }),
            // How many french in paris do you know? 1-6, 6-10, 11-50 or 50+ (required if answered yes in q2)
            q3: Joi.string()
                .when('q2', { is: true, then: Joi.valid('1-5', '6-10', '11-50', '50+').required() }),
            // Rate 20% of most friendly Parisians, from how many people you know answered in q3, individually on 1-5 rating
            q4: Joi.array()
                .when('q3', {is: '1-5', then: Joi.array().min(0).max(1).items(intRating).required() })
                .when('q3', {is: '6-10', then: Joi.array().min(1).max(2).items(intRating).required() })
                .when('q3', {is: '11-50', then: Joi.array().min(2).max(10).items(intRating).required() })
                .when('q3', {is: '50+', then: Joi.array().min(10).items(intRating).required() }),
            // Rate remaining 80% of Parisians, from how many people you know answered in q3, individually on 1-5 rating
            q5: Joi.array()
                .when('q3', {is: '1-5', then: Joi.array().min(1).max(4).items(intRating).required() })
                .when('q3', {is: '6-10', then: Joi.array().min(4).max(8).items(intRating).required() })
                .when('q3', {is: '11-50', then: Joi.array().min(8).max(40).items(intRating).required() })
                .when('q3', {is: '50+', then: Joi.array().min(40).items(intRating).required().required() }),
            // Rate the reputation of Parisians in general, 1-5 rating
            q6: intRating.required()
        });
        
        const data = [{
            q1: false,
            q2: false,
            q3: '1-5',
            q4: [5],
            q5: [1],
            q6: 8
        }];

        const result ={};
        result['schema'] = schema;
        result['data'] = data;

        return result; 
    }
}

export default JoiAPI;