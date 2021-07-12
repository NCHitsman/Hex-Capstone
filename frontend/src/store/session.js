import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const PERMISSION = 'session/PERMISSION'
const CLEAR = 'session/CLEAR'
const CLEAR_PERM = 'session/CLEAR_PERM'

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const permissions = (permission) => ({
  type: PERMISSION,
  payload: permission,
})

const clear = () => ({
  type: CLEAR
})

const clearPerm = () => ({
  type: CLEAR_PERM
})

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  if (data.user) return data.user.id;
  return response
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(clear())
  dispatch(removeUser());
  return response;
};

export const getPermission = (userId, systemId) => async (dispatch) => {
  console.log(userId, systemId)
  const res = await csrfFetch(`/api/users/permission/${userId}/${systemId}`)
  const data = await res.json()
  dispatch(permissions(data))
  return res
}

export const clearPermission = () => async dispatch => {
  dispatch(clearPerm())
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case SET_USER:
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState.user = null;
      return newState;
    case PERMISSION:
      newState.permission = action.payload
      return newState
    case CLEAR:
      newState = {}
      return newState
    case CLEAR_PERM:
      delete newState.permission
      return newState
    default:
      return state;
  }
};

export default sessionReducer;
