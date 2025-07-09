console.log('Redux store debug.js loaded');

// Function to log the current Redux state to console
function logReduxState(store) {
  console.log('Current Redux State:', store.getState());
}

// Export the logging function
export default logReduxState;
