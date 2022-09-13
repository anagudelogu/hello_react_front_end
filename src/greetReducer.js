import axios from 'axios';
// Actions

const FETCH_GREETING_STARTED = '@hello_react_front_end/greet_reducer/FETCH_GREETING_STARTED';
const FETCH_GREETING_SUCCEEDED = '@hello_react_front_end/greet_reducer/FETCH_GREETING_SUCCEEDED';
const FETCH_GREETING_FAILED = '@hello_react_front_end/greet_reducer/FETCH_GREETING_FAILED';

// Action Creators

const getGreetingStarted = () => ({
  type: FETCH_GREETING_STARTED,
});

const getGreetingSucceeded = (greeting) => ({
  type: FETCH_GREETING_SUCCEEDED,
  payload: greeting,
});

const getGreetingFailed = (error) => ({
  type: FETCH_GREETING_FAILED,
  error,
});

// Thunk

const fetchGreetings = () => async (dispatch) => {
  dispatch(getGreetingStarted());
  try {
    const response = await axios.get(
      'http://localhost:3001/api/v1/messages',
    );
    const greeting = response.data.greet;
    dispatch(getGreetingSucceeded(greeting));
  } catch (error) {
    dispatch(getGreetingFailed(error.toString()));
  }
};

// Reducer

const initialState = {
  greeting: '',
  status: 'idle',
  error: null,
};

const greetReducer = (state = initialState, action) => {
  if (action.type === FETCH_GREETING_STARTED) {
    return { ...state, status: 'loading', error: null };
  }

  if (action.type === FETCH_GREETING_SUCCEEDED) {
    return {
      ...state,
      greeting: action.payload,
      status: 'succeeded',
      error: null,
    };
  }

  if (action.type === FETCH_GREETING_FAILED) {
    return { ...state, status: 'failed', error: action.error };
  }

  return state;
};

export default greetReducer;

export {
  getGreetingStarted,
  getGreetingSucceeded,
  getGreetingFailed,
  fetchGreetings,
};
