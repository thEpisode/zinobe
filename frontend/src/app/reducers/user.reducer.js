import { UserActions } from './../actions/user.action'

export const selectIsLoggedin = state => {return state.loggedin.value};

export default UserActions.reducer;