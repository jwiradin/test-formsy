import React from 'react';
import { Form, Input } from 'formsy-react-components';

class Player extends React.Component{

  constructor(props){
    super(props);
    this.setState({canSubmit:false});
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.submit = this.submit.bind(this);
  }

  getInitialState() {
    return { canSubmit: false };
  }
  submit(data) {
    alert(JSON.stringify(data, null, 4));
  }
  enableButton() {
    this.setState({ canSubmit: true });
  }
  disableButton() {
    this.setState({ canSubmit: false });
  }
  
  render() {
    return (
      <Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
        <Input value="" name="email" title="Email" validations="isEmail" validationError="This is not a valid email" required />
        <Input value="" name="password" title="Password" type="password" required />
        <button type="submit">Submit</button>
      </Form>
    );
  };
};

export default Player;