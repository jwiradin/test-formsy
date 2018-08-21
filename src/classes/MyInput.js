import { withFormsy } from 'formsy-react';
import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Col, Row, Alert } from 'react-bootstrap';

class MyInput extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    // An error message is returned only if the component is invalid
    const errorMessage = this.props.getErrorMessage();
    return (
      <FormGroup>
        <Row>
          <Col sm={2}>
            <ControlLabel>{this.props.label}</ControlLabel>
          </Col>
          <Col sm={6}>
            <FormControl
              onChange={this.changeValue}
              type="text"
              value={this.props.getValue() || ''}
            />
          </Col>
          <Col sm={3}>
            <HelpBlock>{errorMessage}</HelpBlock>
          </Col>
        </Row>
      </FormGroup>
    );
  }
}

export default withFormsy(MyInput);