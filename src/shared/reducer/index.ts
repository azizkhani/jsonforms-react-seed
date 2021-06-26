import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import user, { UserState } from '../../pages/user/user.reducer';

export interface IRootState {
  user: UserState;
  loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  user,
  loadingBar,
});

export default rootReducer;
