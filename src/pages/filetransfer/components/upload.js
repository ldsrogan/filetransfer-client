/* eslint-disable no-param-reassign */
import React, { useState } from 'react';

import Dropzone from './dropzone';
import Progress from './progress';

import * as S from './upload.style';

function Upload() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const sendRequest = (file) => {
    return new Promise((resolve, reject) => {
      const urlReq = new XMLHttpRequest();

      /**
       * this user data should be inside of the header when users login in to the system.
       * current implementation uses temp user-data
       * */
      const userData =
        '{"tenantId":"5f0b16a26916711de22aebd5","userId":"5f0b16a26916711de22aebd6","email":"[mailto:qwe@rty.com]qwe@rty.com","isAdmin":true,"roles":[],"isActive":true,"iat":1595149476}';

      // let reqUrl = `http://${process.env.REACT_APP_FILESERVER_URL}/uploadUrl`;
      // if (
      //   typeof process.env.REACT_APP_FILESERVER_TYPE !== 'undefined' &&
      //   process.env.REACT_APP_FILESERVER_TYPE === 'server'
      // ) {
      const reqUrl = `https://${process.env.REACT_APP_FILESERVER_URL}/uploadUrl`;
      // }

      const nameWithExt = file.name;
      const basename = nameWithExt.substring(0, nameWithExt.lastIndexOf('.'));
      let extension = '';
      if (nameWithExt.lastIndexOf('.') > 0) {
        extension = nameWithExt.substring(
          nameWithExt.lastIndexOf('.') + 1,
          nameWithExt.length,
        );
      }

      urlReq.open('post', reqUrl);
      urlReq.setRequestHeader('Content-type', 'application/json');
      urlReq.setRequestHeader('user-data', userData);
      urlReq.send(
        JSON.stringify({
          params: {
            basename,
            extension,
            size: file.size,
            account: 'testing',
          },
        }),
      );

      urlReq.onreadystatechange = () => {
        if (urlReq.readyState === XMLHttpRequest.DONE) {
          const { url: uploadUrl, fileId, name, extension: ext } = JSON.parse(
            urlReq.response,
          );
          const req = new XMLHttpRequest();
          console.log({ fileId, name, ext });

          /**
           * this allows to get the progress listener to update UI
           */
          req.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              uploadProgress[file.name] = {
                state: 'pending',
                percentage: (event.loaded / event.total) * 100,
              };
              setUploadProgress({ ...uploadProgress });
            }
          });

          req.upload.addEventListener('load', () => {
            uploadProgress[file.name] = { state: 'done', percentage: 100 };
            setUploadProgress({ ...uploadProgress });
            resolve(req.response);
          });

          req.upload.addEventListener('error', () => {
            uploadProgress[file.name] = { state: 'error', percentage: 0 };
            setUploadProgress({ ...uploadProgress });
            reject(req.response);
          });

          /**
           * create formdata for storing file stream
           */
          // const formData = new FormData();
          // formData.append(
          //   'metadata',
          //   JSON.stringify({
          //     account: '3ds', // this information is extra info for server-side
          //   }),
          // );
          // formData.append('file', file, file.name);

          req.open('PUT', uploadUrl);
          req.setRequestHeader('user-data', userData);
          req.send(file);
        }
      };
    });
  };

  const onFilesAdded = async (newFiles) => {
    setFiles(files.concat(newFiles));
    // upload files

    setUploadProgress({});
  };

  const renderProgress = (file) => {
    const progress = uploadProgress[file.name];
    if (uploading && progress && progress.state !== 'done') {
      return (
        <S.ProgressWrapper>
          <Progress progress={progress ? progress.percentage : 0} />
          <S.CheckIcon
            alt="done"
            style={{
              opacity: progress && progress.state === 'done' ? 0.5 : 0,
            }}
          />
        </S.ProgressWrapper>
      );
    }
    return <></>;
  };

  const handleFileUpload = async () => {
    setUploading(true);

    try {
      const promises = [];
      files.forEach((file) => {
        promises.push(sendRequest(file));
      });
      try {
        await Promise.all(promises);
      } catch (e) {
        // Not Production ready! Do some error handling here instead...
        console.error('Sending files to server has failed!');
        throw new Error(e);
      }

      setUploading(false);
      setFiles([]);
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      console.error('Sending files to server has failed!');
      throw new Error(e);
    }
  };

  const renderActions = () => {
    return (
      <S.MakeCaseButton
        onClick={handleFileUpload}
        disabled={files.length < 0 || uploading}
      >
        Upload Files
      </S.MakeCaseButton>
    );
  };

  return (
    <S.Upload>
      <S.Content>
        <Dropzone
          onFilesAdded={onFilesAdded}
          listedFiles={files}
          disabled={uploading}
        />

        <S.Files>
          {files.map((file) => {
            return (
              <S.Row key={file.name}>
                <S.Filename>{file.name}</S.Filename>
                {renderProgress(file)}
              </S.Row>
            );
          })}
        </S.Files>
      </S.Content>
      <S.Actions>{renderActions()}</S.Actions>
    </S.Upload>
  );
}

export default Upload;
