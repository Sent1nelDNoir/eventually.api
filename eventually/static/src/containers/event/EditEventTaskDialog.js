import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {eventTaskServicePut} from './EventService';
import {CancelDialog} from 'src/containers';


const divStyle = {
    display: 'inline-block',
    margin: '1%'
};

export default class EditEventTaskDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            members:this.props.members,
            assignment:this.props.assignmentUsers,
            openDialog: false,
            openCancelDialog: false
        };
    }

    handleEditDialogOpen = () => {
        this.setState({'openDialog': true});
    }

    handleEditDialogClose = () => {
        this.setState({'openDialog': false});
    }

    handleName = event => {
        this.setState({title: event.target.value});
    };

    handleDescription = event => {
        this.setState({description: event.target.value});
    };

    handleUsers = (event, index, values) => this.setState({'assignment': values});

    handleSave = () => {
        let data = {};
        if (this.state.title != this.props.title) data['title'] = this.state.title;
        if (this.state.description != this.props.description) data['description'] = this.state.description;
        let addUsers = [];
        let removeUsers = [];
        for (let i = 0; i < this.state.assignment.length; i++)
            if (this.props.assignmentUsers.indexOf(this.state.assignment[i]) == -1) addUsers.push(this.state.assignment[i]);
        for (let i = 0; i < this.props.assignmentUsers.length; i++)
            if (this.state.assignment.indexOf(this.props.assignmentUsers[i]) == -1) removeUsers.push(this.props.assignmentUsers[i]);
        if (this.state.assignment != this.props.assignmentUsers) {
            if (addUsers.length !== 0) data['add_users'] = addUsers;
            if (removeUsers.length !== 0) data['remove_users'] = removeUsers;
        }
        eventTaskServicePut(this.props.eventId, this.state.id, data).then(response => {
            this.props.getEventTaskItem();
            this.handleEditDialogClose();
        });
    };

    handleCancel = () => {
        this.setState ({
            title: this.props.title,
            description: this.props.description,
            assignment:this.props.assignmentUsers,
        });
        this.handleEditDialogClose();
    };

    handleCancelDialogClose = () => {
        this.setState({'openCancelDialog': false});
    };

    handleCancelEditDialogClose = () => {
        this.handleCancelDialogClose();
        this.handleCancel();
    };

    handleRequestClose = () => {
        if ((this.state.title != this.props.title) ||
            (this.state.description != this.props.description) ||
            (this.state.assignment != this.props.assignmentUsers)) {
            this.setState({openCancelDialog: true});
        }
        else this.handleEditDialogClose();
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCancel}
            />,
            <FlatButton
                label="Save"
                primary={true}
                onClick={this.handleSave}
            />,
        ];
        return (
            <div style={divStyle}>
                <RaisedButton label="Edit" onClick = {this.handleEditDialogOpen} />
                <Dialog
                    title="Task Edit"
                    actions={actions}
                    modal={false}
                    open={this.state.openDialog}
                    autoDetectWindowHeight={true}
                    onRequestClose={this.handleRequestClose}
                >
                    <div>
                        <TextField
                            hintText="Task Title"
                            floatingLabelText="Enter name of the task"
                            defaultValue={this.state.title}
                            fullWidth={true}
                            onChange={this.handleName}
                        />
                    </div>
                    <div>
                        <TextField
                            hintText="Description"
                            floatingLabelText="Enter description of the task"
                            defaultValue={this.state.description}
                            fullWidth={true}
                            onChange={this.handleDescription}
                        />
                    </div>
                    <div>
                        <SelectField
                            multiple={true}
                            floatingLabelText="Select an assignment user(s)"
                            hintText="Assignment users"
                            value={this.state.assignment}
                            onChange={this.handleUsers}
                        >
                            {this.state.members.map((member) => (
                                <MenuItem
                                    key={member.id}
                                    insetChildren={true}
                                    checked={this.state.assignment && this.state.assignment.indexOf(member.id) > -1}
                                    value={member.id}
                                    primaryText={member.fullName}
                                />
                            ))}
                        </SelectField>
                        {this.state.openCancelDialog &&
                            (<CancelDialog
                                openCancelDialog={this.state.openCancelDialog}
                                handleCancelMainDialogClose={this.handleCancelEditDialogClose}
                                handleCancelDialogClose={this.handleCancelDialogClose}
                            />)
                        }
                    </div>
                </Dialog>
            </div>
        );
    }
}
