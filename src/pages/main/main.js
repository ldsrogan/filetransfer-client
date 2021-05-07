import React from 'react';
import useStyles from './main.style';

export default function MainPage() {
  const classes = useStyles();
  // return <div className={classes.content}>{<p>content</p>}</div>;

  return (
    <div>
      <img
        src="https://api.dev.jx-dev.net/filevault-service/download/279a775494e2005a68d37c4ca4c59a00e75a85ab"
        alt="test"
      />
    </div>
  );
}
