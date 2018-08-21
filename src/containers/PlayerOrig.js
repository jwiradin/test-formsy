import React from 'react';
import Formsy from 'formsy-react';
import MyInput from '../classes/MyInput';
import {Grid} from 'react-bootstrap';

export default class PlayerOrig extends React.Component{

  constructor(props){
    super(props);
    this.state = {canSubmit:false};
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

      <Formsy onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="login">
        <Grid>
          <MyInput value="" name="email" label="Email" title="Email" validations="isEmail" validationError="This is not a valid email" required />
          <MyInput value="" name="password" label="Password" title="Password"  validations={{minLength:8}} validationError="Password minimum length is 8" required />
          <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
        </Grid>
      </Formsy>
    );
  };
};

