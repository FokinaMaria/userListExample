import React from 'react';

const UsersList = ({ data, deleteUser, editUser }) => (
  <div>
    {data.length !== 0 ? (
      <ul className="list">
        {data.map((item, index) => (
          <li key={index}>
            <p>{`First name: ${item.firstName}`}</p>
            <p>{`Second name: ${item.secondName}`}</p>
            <p>{`Email: ${item.email}`}</p>
            <button className="buttonlist" onClick={deleteUser(item.firstName)}>
              Удалить
            </button>
            <button
              className="buttonlist"
              onClick={() => {
                editUser(item.id, item);
              }}
            >
              Изменить
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <h4>Нет данных</h4>
    )}
  </div>
);

export default UsersList;
