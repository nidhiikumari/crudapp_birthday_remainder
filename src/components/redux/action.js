import * as types from './actionType';
import { ADD_USER, DELETE_USER, UPDATE_USER, GET_USER } from './actionType';

const API_URL = 'http://localhost:3001/users';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id,
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const getUser = (user) => ({
  type: GET_USER,
  payload: user
});

export const loadUser = () => {
  return function (dispatch) {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        dispatch(getUser(data));
      })
      .catch((error) => console.log(error))
  }
}

export const deletedUser = (id) => {
  return function (dispatch) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((data) => {
        dispatch(deleteUser());
        dispatch(loadUser());
      })
      .catch((error) => console.log(error))
  }
}

export const addedUser = (DATA) => {
  return function (dispatch) {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(DATA),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addUser());
        dispatch(loadUser());
        console.log(data);
      })
      .catch((error) => console.log(error))
  }
}

export const updatedUser = (DATA) => {
  return function (dispatch) {
    fetch(`${API_URL}/${DATA.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: DATA.name,
        email: DATA.email,
        phone: DATA.phone
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateUser());
        dispatch(loadUser());
      })
      .catch((error) => console.log(error))
  }
}
