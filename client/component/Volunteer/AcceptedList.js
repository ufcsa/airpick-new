import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Spin } from 'antd';
import { loadAcceptedReq } from '../../redux/request.redux';

const { Column } = Table;

export const AcceptedList = props => {
  const userState = useSelector(state => state.user);
  const reqState = useSelector(state => state.request);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userState.username) {
      dispatch(loadAcceptedReq(userState.username));
    }
  }, [dispatch, userState.username]);

  console.log(reqState.acceptedList);

  if (reqState.acceptedList === undefined) {
    return null;
  }
  // TODO: iterate through reqState.acceptedList to get all accepted list
  return <h2>This is a list</h2>
}