/* eslint-disable linebreak-style */
import { NEXT_SIGNUP_FORM_STEP } from '../actions/signup';

const initialState = {

  // signup informations bdd
  // user
  // email: '',
  // password: '',
  // password_confirmation: '',
  // first_name: '',
  // last_name: '',
  // birthday_user: '',
  // photo: '',
  // zip_code: '',
  // // dog
  // surname: '',
  // breed_id: '',
  // weight: undefined,
  // gender_id: undefined,
  // birthday: '', // AAAA-MM-DD in bdd
  // sterilization: false, // boolean in bdd
  // behavior: '', // behavior_id in bdd

  // for continue and previous button
  formStep: 1,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case NEXT_SIGNUP_FORM_STEP:
      return {
        ...state,
        formStep: state.formStep + 1,
        isSubmitSuccessfull: false,
      };
    default:
      return state;
  }
};
export default reducer;
