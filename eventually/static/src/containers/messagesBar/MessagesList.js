import React from 'react';
import MessagesItem from './MessagesItem';
import MessagesSender from './MessagesSender';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const messagesListStyle = {
    overflowY: 'scroll',
    height: '80vh'
};
const showMoreButton = {
    display: 'flex',
    justifyContent: 'center'
};

export default class MessagesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1
        };
    }

    handleShowMoreClick = this.props.onShowMoreClick
    handleSendClick = this.props.onSendClick;

    render() {
        const showMoreBtn = this.props.isShowMoreButton ?
            (<RaisedButton
                style={showMoreButton}
                label='Show more'
                primary={true}
                onClick={this.handleShowMoreClick} 
            />) :
            null;
        return (
            <div style={this.props.style}>
                <Paper zDepth={2} style={messagesListStyle}>
                    {this.props.messages.map(message => (
                        <MessagesItem
                            key={message.id.toString()}
                            author={message.author}
                            avatar={message.avatar}
                            date={message.created_at}
                            text={message.text}
                        />)
                    )}
                    {showMoreBtn}
                </Paper>
                <MessagesSender receiverId={this.props.receiverId} onSendClick={this.handleSendClick} />
            </div>
        );
    }
}
