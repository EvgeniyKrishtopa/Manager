import React from 'react';

import ErrorNotification from './Error';
import SuccessNotification from './Success';
interface IProps {
  error: string;
  toast: any;
}
export default function Notification({ error, toast }: IProps) {
  const { message } = toast;

  return error.length ? <ErrorNotification /> : <SuccessNotification message={message} />;
}
