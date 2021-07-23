import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const UploaderPage = ({ user }) => {
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/signin');
    } else {
      user.role || history.push('/');
    }
  }, [history, user]);
  return <h1>Uploader Pagde</h1>;
};

export default UploaderPage;
