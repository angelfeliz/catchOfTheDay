import React from 'react';
import { render } from 'react-dom';
import { getFunName } from '../helpers.js';

class StorePicker extends React.Component {
  constructor(props){
    super(props);
    //this.gotToStore = this.goToStore.bind(this);
  }
  goToStore(event) {
    event.preventDefault();
    const storeId = this.storeInput.value;
    console.log(`Going to ${storeId}`);
    console.log(this.storeInput.value);
    this.context.router.transitionTo(`/store/${storeId}`);
  }
  render(){
    return (
      <form className="store-selector" onSubmit={(e) => {this.goToStore(e)}}>
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name"
        defaultValue={getFunName()}
        ref={(input) => { this.storeInput = input }} />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
