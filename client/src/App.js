import React, { useState, useEffect } from "react";
import Pixels from "./contracts/Pixels.json";
import BuyPixelForm from "./BuyPixelForm";
import getWeb3 from "./getWeb3";
import Pixel from "./Pixel";
import Loader from "react-loader-spinner";

import "./App.css";

function App(props) {

  const [pixels, setPixels] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [selectedColor, setSelectedColor] = useState("FFFFFF");
  const [selectedX, setSelectedX] = useState(null);
  const [selectedY, setSelectedY] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const getAllPixels = async () => {
    setLoading(true);
    // Get all the pixels from the contract.
    const response = await contract.methods.getAllPixels().call();

    // Update state with the result.
    setPixels(response);
    setLoading(false);
  };

  const loadContract = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      setWeb3(web3);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Pixels.networks[networkId];
      const instance = new web3.eth.Contract(
        Pixels.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(instance);

      // Get all the pixels from the contract.
      const response = await instance.methods.getAllPixels().call();
      // Update state with the result.
      setPixels(response);
      setLoading(false);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  useEffect(() => {
    loadContract();
  }, []);

  const selectPixel = async (x, y) => {
    setSelectedX(x);
    setSelectedY(y);
    setModalIsOpen(true);
  };

  const buyPixel = async () => {    
    setModalIsOpen(false);
    setLoading(true);
    if (pixels[selectedX][selectedY] !== '') {
      await contract.methods
      .updatePixel(selectedX, selectedY, selectedColor.slice(1))
      .send({ from: accounts[0]});      
    } else {
      console.log('set')
      await contract.methods
        .setPixel(selectedX, selectedY, selectedColor.slice(1))
        .send({ from: accounts[0], value: 1 });
    }
    getAllPixels();
    setLoading(false);
  };

  var elements = [];
  for (var i = 0; i < pixels.length; i++) {
    var pixel = pixels[i];
    for (var j = 0; j < pixel.length; j++) {
      const color = "#" + pixel[j];
      elements.push(
        <Pixel color={color} selectPixel={selectPixel} x={i} y={j} />
      );
    }
  }

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  // if (loading) {
  //   return (
  //     <div className="App">
  //     <h1>The Grid</h1>

  //       <Loader
  //         type="Puff"
  //         color="#00BFFF"
  //         height={100}
  //         width={100}
  //         visible={loading}
  //       />
  //     </div>
  //   );
  // }

  return (
    <div className="App">
      <h1>The Grid</h1>
      <h3>Click any pixel to buy it (cost 1 wei)</h3>
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
        visible={loading}
      />
      

      {!loading &&
        <div className="pixels">{elements}</div>
      }

      <BuyPixelForm
        modalIsOpen={modalIsOpen}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        buyPixel={buyPixel}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
}

export default App;
