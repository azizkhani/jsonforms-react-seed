import axios from 'axios';
import { URLSearchParams } from 'url';

import { FAILURE, REQUEST, SUCCESS } from '../shared/reducer/action-type.util';
import { cleanEntity } from '../shared/util/entity-utils';
import { ICrudDeleteAction, ICrudGetAction, ICrudGetAllActionBySearch, ICrudPutAction } from '../util/redux-action.type';
import { defaultValue, IUser } from '../shared/model/user.model';

export const apiUserUrl = '/api/users';

export const ACTION_TYPES = {
  FETCH_USER_LIST: 'user/FETCH_USER_LIST',
  FETCH_USER: 'user/FETCH_USER',
  CREATE_USER: 'user/CREATE_USER',
  UPDATE_USER: 'user/UPDATE_USER',
  PARTIAL_UPDATE_USER: 'user/PARTIAL_UPDATE_USER',
  DELETE_USER: 'user/DELETE_USER',
  RESET: 'user/RESET',
  RESET_SEARCH_USER: 'user/RESET_SEARCH',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUser>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
  totalPages: 0,
};

export type UserState = Readonly<typeof initialState>;

// Reducer

export default (state: UserState = initialState, action): UserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_USER):
    case REQUEST(ACTION_TYPES.UPDATE_USER):
    case REQUEST(ACTION_TYPES.DELETE_USER):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_USER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_USER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USER):
    case FAILURE(ACTION_TYPES.CREATE_USER):
    case FAILURE(ACTION_TYPES.UPDATE_USER):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_USER):
    case FAILURE(ACTION_TYPES.DELETE_USER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data.content,
        totalPages: action.payload.data.totalPages,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_USER):
    case SUCCESS(ACTION_TYPES.UPDATE_USER):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_USER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
      };
    case SUCCESS(ACTION_TYPES.DELETE_USER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    case ACTION_TYPES.RESET_SEARCH_USER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

// Actions

export const buildURLQuery = (obj) =>
  Object.entries(obj)
    .filter((pair) => typeof pair[1] != 'undefined' && pair[1])
    .map((pair) => pair.map(String).join('='))
    .join('&');

export const getEntities: ICrudGetAllActionBySearch<IUser> = (data, page, size, sort) => {
  const requestUrl = `${apiUserUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&${buildURLQuery(data)}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_USER_LIST,
    payload: axios.get<IUser>(requestUrl),
  };
};

export const getEntity: ICrudGetAction<IUser> = (id) => {
  const requestUrl = `${apiUserUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USER,
    payload: axios.get<IUser>(requestUrl),
  };
};

export const setEntity = (entity: IUser) => {
  return {
    type: SUCCESS(ACTION_TYPES.FETCH_USER),
    payload: {
      data: entity,
    },
  };
};

export const createEntity: ICrudPutAction<IUser> = (entity) => async (dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USER,
    payload: axios.post(apiUserUrl, cleanEntity(entity)),
  });
  dispatch(reset());
  return result;
};

export const updateEntity: ICrudPutAction<IUser> = (entity) => async (dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USER,
    payload: axios.put(`${apiUserUrl}/${entity?.id}`, cleanEntity(entity)),
  });
  dispatch(reset());
  return result;
};

export const partialUpdate: ICrudPutAction<IUser> = (entity) => async (dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_USER,
    payload: axios.patch(`${apiUserUrl}/${entity?.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUser> = (id) => async (dispatch) => {
  const requestUrl = `${apiUserUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USER,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

export const resetSearch = () => (dispatch) => {
  const result = dispatch(reset());
  dispatch(getEntities());
  return result;
};
