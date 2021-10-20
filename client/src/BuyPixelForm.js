import React from "react";
import ReactModal from 'react-modal';
import { HexColorPicker } from "react-colorful";
import "./BuyPixelForm.css";

const BuyPixelForm = props => {
    return (
        <ReactModal isOpen={props.modalIsOpen} className="modal"> 
        <h1>Select Color</h1>
        <HexColorPicker color={props.selectedColor} onChange={props.setSelectedColor} className="colorPicker"/><br></br>
        <button onClick={props.buyPixel} >Aceptar</button>
        <button onClick={() => props.setModalIsOpen(false)} >Cancelar</button>
      </ReactModal>
    );
}

export default BuyPixelForm;