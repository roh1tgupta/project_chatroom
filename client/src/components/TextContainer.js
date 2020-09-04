import React from 'react';
import './TextContainer.css';
import online from '../icons/online.jpg'

const TextContainer = ({users}) => {
  return (
    <div className="textContainer">
      <div className="headSection">
        <h3 style={{color:"white"}}>Participants</h3>
      </div>
      <div className="bodySection">
        {
          users.length && users.map(user => (
            <div className="userNameContainer" key={user.name}>
              <img className="onlineuser" src={online} alt="online"/>
              <span className="userName">{user.name}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default TextContainer;