import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Paper, TextField } from '@material-ui/core';

import { Upload, MediaPlayer } from './components';
import useStyle from './filetransfer.style';

function FileTransfer() {
  const [fileId, setFileId] = useState('');
  const classes = useStyle();

  const handleDownload = async () => {
    // download
    let getFileInfo = `http://${process.env.REACT_APP_FILESERVER_URL}/file/${fileId}`;
    if (
      typeof process.env.REACT_APP_FILESERVER_TYPE !== 'undefined' &&
      process.env.REACT_APP_FILESERVER_TYPE === 'server'
    ) {
      getFileInfo = `https://${process.env.REACT_APP_FILESERVER_URL}/file/${fileId}`;
    }

    /**
     * this user data should be inside of the header when users login in to the system.
     * current implementation uses temp user-data
     * */
    const userData =
      '{"tenantId":"5f0b16a26916711de22aebd5","userId":"5f0b16a26916711de22aebd6","email":"[mailto:qwe@rty.com]qwe@rty.com","isAdmin":true,"roles":[],"isActive":true,"iat":1595149476}';

    // set header with user-data for requesting data
    const headers = new Headers({
      'user-data': userData,
    });
    // request file name info
    const res = await fetch(getFileInfo, {
      headers,
    });
    const { sname } = await res.json();

    let getPublicLink = `http://${process.env.REACT_APP_FILESERVER_URL}/downloadUrl/${fileId}`;
    if (
      typeof process.env.REACT_APP_FILESERVER_TYPE !== 'undefined' &&
      process.env.REACT_APP_FILESERVER_TYPE === 'server'
    ) {
      getPublicLink = `https://${process.env.REACT_APP_FILESERVER_URL}/downloadUrl/${fileId}`;
    }

    // request public download url which don't need the user data to access
    const getlinkRes = await fetch(getPublicLink, {
      method: 'POST',
      headers,
    });

    const { url, file } = await getlinkRes.json();
    const href = url;
    console.log(href);
    console.log(file);

    // use public download link to pop-up download window
    // from the browser and start to stream file to the local drive

    const name = `${file.name}.${file.extension}`;

    fetch(href)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobURL;
        a.style = 'display: none';
        a.download = name;
        document.body.appendChild(a);
        a.click();
      });

    // const link = document.createElement('a');
    // link.href = href;

    // const name = `${file.name}.${file.extension}`;
    // link.setAttribute('download', name);
    // link.innerHTML = 'download';

    // document.body.appendChild(link);
    // link.click();
  };

  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={9}>
              <Paper className={classes.paper}>
                <Upload fileId={fileId} />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>
                <TextField
                  required
                  id="standard-required"
                  label="Required"
                  onChange={(event) => setFileId(event.target.value)}
                  helperText="File Id"
                  style={{ marginBottom: 50 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDownload}
                >
                  Download
                </Button>
                <br />
                Download File
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div>
        <MediaPlayer />
      </div>
    </div>
  );
}

export default FileTransfer;
