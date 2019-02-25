import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AddUser extends Component {
  
  state = {
    user:{
      firstname: '',
      lastname: '',
      username: ''
    },
  	userExists: false,
  }

  contactExists = (currentUsername) => {
    const users = this.props.userList;
    for(let user of users){
      if(user.username === currentUsername){
        return true;
      }
      return false;
    }
  }

  handleSubmit = (event) => {
  	event.preventDefault();
    const isUserAvailable = this.contactExists(this.state.user.username);
    
    if (!isUserAvailable){
      this.props.onAddUser(this.state.user);
    }
    
    this.setState(() => ({
      isUserAvailable
    }));
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    
    this.setState(currState => ({
      ...currState,
      user: {
        ...currState.user,
        [name]: value,
      },
    }));
  };

  isDisabled = () => {
    const { firstName, lastName, username } = this.state.user;
    return firstName === '' || lastName === '' || username === '';
  };
  
  render(){
    const { firstName, lastName, username } = this.state.user;
  	return (
      <div>
      	<h1>New User</h1>
      	<form onSubmit = {this.handleSubmit}>
      		<div>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={firstName}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={this.handleInputChange}
            />
          </div>
          <button disabled={this.isDisabled()}>Add</button>
      	</form>
		{this.state.userExists ? (
          <p className="error">You cannot add a user that already exists.</p>
        ) : (
          ''
        )}
      </div>
    );
  }
}

AddUser.propTypes={
  onAddUser: PropTypes.func.isRequired,
  userList: PropTypes.array.isRequired
};

export default AddUser