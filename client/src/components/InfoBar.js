import React from 'react';
import closeicon from '../icons/closeicon.png';
import online from '../icons/online.jpg'
import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer  ">
      <img className="onlineIcon" src={online} alt="online"/>
        <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img className="closeIcon" src={closeicon} alt="close"/></a>
    </div>
  </div>
)

export default InfoBar;