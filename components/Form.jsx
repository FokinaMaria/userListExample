import React, { Component } from 'react';

import { createUser } from 'source';
import { createUserEdit } from 'source';
import { showError } from 'utils';

import ReactModal from 'react-modal';
import { log } from 'util';
const uuidv4 = require('uuid/v4');

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: uuidv4(),
      firstName: '',
      secondName: '',
      email: '',
      showModal: false
    };

    this.changeValue = this.changeValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.changeValueEdit = this.changeValueEdit.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.editElem !== prevProps.editElem &&
      this.props.editElem !== 0
    ) {
      this.setState({
        id: this.props.editElem,
        showModal: this.props.showModal
      });
    }
  }

  //#region modal
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
  //#endregion

  changeValueEdit = field => ({ target }) =>
    this.setState({ [field]: target.value });
  //заполнение стейта данными из формы
  changeValue = field => ({ target }) =>
    this.setState({ [field]: target.value, id: uuidv4() });

  //событие нажатия кнопки сохранить
  onSubmit(e) {
    e.preventDefault();

    const { updateUsersList } = this.props;

    this.setState({ id: uuidv4() });

    createUser(this.state)
      .then(() => {
        updateUsersList();
      })
      .catch(showError);
  }

  onSubmitEdit(e) {
    e.preventDefault();

    const { updateUsersList } = this.props;

    createUserEdit(this.state)
      .then(() => {
        updateUsersList();
      })
      .catch(showError);
    this.setState({ showModal: false });
  }

  render() {
    const { changeValue, changeValueEdit } = this;

    return (
      <div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          ariaHideApp={false}
          className="Modal"
        >
          <form className="forms" onSubmit={this.onSubmitEdit}>
            <label>
              First name:
            <input
                type="text"
                defaultValue={this.props.editlist.firstName}
                onChange={changeValueEdit('firstName')}
              />
            </label>
            <label>
              Second name:
            <input
                type="text"
                defaultValue={this.props.editlist.secondName}
                onChange={changeValueEdit('secondName')}
              />
            </label>
            <label>
              email:
            <input
                type="text"
                defaultValue={this.props.editlist.email}
                onChange={changeValueEdit('email')}
              />
            </label>
            <label>
              id:
            <input type="text" defaultValue={this.props.editlist.id} />
            </label>
            <button className="formButton">Сохранить</button>
          </form>
        </ReactModal>

        <form className="forms" onSubmit={this.onSubmit}>
          <label>
            Имя
            <input type="text" onChange={changeValue('firstName')} />
          </label>
          <label>
            Фамилия
            <input type="text" onChange={changeValue('secondName')} />
          </label>
          <label>
            Email
            <input type="email" onChange={changeValue('email')} />
          </label>
          <button className="formButton">Сохранить</button>
        </form>
      </div>
    );
  }
}

export default Form;
