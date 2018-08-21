import React from 'react';
import { HelpBlock, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class GBInput extends React.Component{
    constructor(props){
        super(props);
        const {
            value
        } = props;

        this.state = {value:value};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        var value = {};
        value[this.props.name] = e.currentTarget.value;
        
        this.props.onValueChange(value);
        this.setState({value:e.currentTarget.value});
    }

    render(){

        return (
        <FormGroup
            validationState ={this.props.validation.valid ? null : "error"}
        >
            <ControlLabel>{this.props.label}</ControlLabel>
            <FormControl name={this.props.name} value={this.state.value} placeholder={this.props.placeholder} type={this.props.type} onChange={this.handleChange}/>
            <FormControl.Feedback />
            <HelpBlock>{this.props.validation.message}</HelpBlock>
        </FormGroup>
        );
    }
}
export default GBInput;