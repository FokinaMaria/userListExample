import React, { Component } from 'react';

import Form from './Form';
import UsersList from './UsersList';

import { getUsers, deleteUser } from 'source';

import { showError } from 'utils';

class App extends Component {
  state = {
    users: [],
    editlist: [],
    editElem: 0,
    showModal: false
  };

  updateUsersList = () => {
    console.log('assad');
    getUsers()
      .then(({ data }) => this.setState({ users: data, editElem: 0, showModal: false }))
      .catch(showError);
  };

  editUser = (id, item) => {
    this.setState({ editElem: id, editlist: item, showModal: true });
  };

  deleteUser = firstName => () => {
    deleteUser(firstName)
      .then(() => {
        this.updateUsersList();
      })
      .catch(showError);
  };

  componentDidMount() {
    getUsers()
      .then(({ data }) => this.setState({ users: data }))
      .catch(showError);
  }

  render() {
    const { updateUsersList, deleteUser, editUser } = this;
    const { users, editElem, editlist, showModal } = this.state;

    return (
      <div>
        <UsersList data={users} deleteUser={deleteUser} editUser={editUser} />
        <Form
          updateUsersList={updateUsersList}
          editlist={editlist}
          editElem={editElem}
          showModal={showModal}
        />
      </div>
    );
  }
}

export default App;
