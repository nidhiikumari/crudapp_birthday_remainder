import * as types from './actionType';
import { take, takeEvery, takeLatest, put, all, delay, call } from 'redux-saga/effects';
import {
  loadUsersSuccess,
  loadUsersError,
  createUserError,
  createUserSuccess,
  deleteUserSuccess,
  deleteUserError,
  updateUserSuccess,
  updateUserError
} from './action';

const loadUsersApi = 'http://localhost:3001/users';

function* onLoadUsersStartAsync() {
  try {
    const response = yield fetch(loadUsersApi, {
      method: 'GET',
      // body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const items = yield response.json();
    if (items) {
      yield delay(500);
      yield put(loadUsersSuccess(items));
    }
  }
  catch (error) {
    yield put(loadUsersError(error))
  }
}

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield fetch(loadUsersApi, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const items = yield response.json();
    if (items) {
      yield put(createUserSuccess(items));
    }
  }
  catch (error) {
    yield put(createUserError(error))
  }
}

function* onDeleteUserStartAsync(userId) {
  try {

    const response = yield fetch(`${loadUsersApi}/${userId}`, {
      method: 'DELETE'
    });
    const items = yield response.json();
    if (items) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  }
  catch (error) {
    yield put(deleteUserError(error))
  }
}

function* onUpdateUserStartAsync({ payload: { Id, formValue } }) {

  try {
    const response = yield fetch(`${loadUsersApi}/${Id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: formValue.name,
        email: formValue.email,
        phone: formValue.phone
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const items = yield response.json();
    if (items) {
      yield put(updateUserSuccess(items));
    }
  }
  catch (error) {
    yield put(updateUserError(error))
  }

}

export function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

export function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

export function* onDeleteUser() {
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USER_START)
    yield call(onDeleteUserStartAsync, userId);
  }
}

export function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

export function* rootSaga() {
  yield all([
    onLoadUsers(),
    onCreateUser(),
    onDeleteUser(),
    onUpdateUser()
  ]);
}