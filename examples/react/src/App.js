import React from "react";
import Subspace from "@embarklabs/subspace";
import { scan } from 'rxjs/operators';
import MyComponentObserver from "./MyComponentObserver";
import web3 from './web3';
import MyContract from './MyContract';

let MyContractInstance;

class App extends React.Component {
  state = {
    myEventObservable$: null
  };

  async componentDidMount() {
    MyContractInstance = await MyContract.getInstance(); //

    const subspace = new Subspace(web3.currentProvider);
    await subspace.init();
    
    const myEventObservable$ = subspace.trackEvent(MyContractInstance, "MyEvent", {filter: {}, fromBlock: 1 });

    // If you want to return all the events in an array, you can pipe the scan operator to the observable
    // const myEventObservable$ = subspace.trackEvent(MyContractInstance, "MyEvent", {filter: {}, fromBlock: 1 })
    //                                      .pipe(scan((accum, val) => [...accum, val], []));
    // Your observable component would receive the eventData as an array instead of an object

    this.setState({ myEventObservable$ });
  }

  createTrx = () => {
    MyContractInstance.methods
      .myFunction()
      .send({ from: web3.eth.defaultAccount });
  };

  render() {
    return (
      <div>
        <button onClick={this.createTrx}>Create a Transaction</button>
        <MyComponentObserver eventData={this.state.myEventObservable$} />
      </div>
    );
  }
}

export default App;
