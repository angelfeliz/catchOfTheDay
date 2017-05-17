import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';


class App extends React.Component {
   constructor(props){
     super(props);
     this.state= {
       fishes: {},
       order: {},
     };
     this.addFish = this.addFish.bind(this);
     this.loadSamples = this.loadSamples.bind(this);
     this.addToOrder = this.addToOrder.bind(this);
     this.updateFish = this.updateFish.bind(this);
     this.removeFish = this.removeFish.bind(this);
     this.removeFromOrder = this.removeFromOrder.bind(this);
   }

   componentWillMount() {
      this.ref = base.syncState(`${this.props.storeId}/fishes`,
        {
          context: this,
          state: 'fishes'
        });

        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

        if(localStorageRef) {
          this.setState({
            order: JSON.parse(localStorageRef)
          });
        }
   }

   componentWillUnmount() {
     base.removeBinding(this.ref);
   }

   componentWillUpdate(nextProps, nextState) {
     localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
   }

   addFish(fish) {
     const fishes = {...this.state.fishes};
     const timestamp = Date.now();
     fishes[`fish${timestamp}`] = fish
     this.setState({ fishes })
   }

   loadSamples() {
        this.setState({ fishes: sampleFishes })
   }

   addToOrder(key) {
     const order = { ...this.state.order };
     order[key] = order[key] + 1 || 1;
     this.setState({ order });
   }

   removeFromOrder(key) {
     const order = {...this.state.order};
     delete order[key];
     this.setState({ order });
   }

   updateFish(key, updatedFish) {
     const fishes = { ...this.state.fishes };
     fishes[key] = updatedFish;
     this.setState({fishes});
   }

   removeFish(key) {
     const fishes = {...this.state.fishes};
     fishes[key] = null;
     this.setState({ fishes });
     this.removeFromOrder(key);
   }

    render() {
      return (
        <div className="catch-of-the-day">
          <div className="menu">
            <Header tagline="Fresh seafood market" />
            <ul className="list-of-fishes">
              {
                Object
                   .keys(this.state.fishes)
                   .map(key => <Fish addToOrder={this.addToOrder} index={key} key={key} details={this.state.fishes[key]}/>)}
            </ul>
          </div>
          <Order
             removeFromOrder={this.removeFromOrder}
             fishes={this.state.fishes}
             order={this.state.order}
             params={this.props.params}
          />
          <Inventory
            removeFish={this.removeFish}
            updateFish={this.updateFish}
            loadSamples={this.loadSamples}
            addFish={this.addFish}
            fishes={this.state.fishes}
          />
        </div>
      )
    }
}


export default App;
