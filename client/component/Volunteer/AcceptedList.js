import React from 'react';
import { useSelector } from 'react-redux';

export const AcceptedList = props => {
  const userState = useSelector(state => state.user);
  const reqState = useSelector(state => state.request);

  return <h2>This is a list</h2>
}