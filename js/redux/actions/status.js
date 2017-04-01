// @flow

function setStatus(name: string, value: string) : Action {
  return {
    type: 'SET_STATUS',
    name,
    value
  };
}

module.exports = {
  setStatus
}
