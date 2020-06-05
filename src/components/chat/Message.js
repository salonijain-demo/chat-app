import React from 'react';

import '../../styles/Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, messages }, name }) => {
  let recentMessages = []
  if(messages){
    recentMessages = messages.slice(Math.max(messages.length - 20, 0))
  }
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
            <div>
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
            <div>
              {recentMessages && recentMessages.map((message,i)=>(
                <div key={i} className="messageContainer justifyStart">
                  <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{ReactEmoji.emojify(message.message)}</p>
                  </div>
                  <p className="sentText pl-10 ">{message.name}</p>
                </div>
              ))}
            </div>
          </div>
        )
  );
}

export default Message;