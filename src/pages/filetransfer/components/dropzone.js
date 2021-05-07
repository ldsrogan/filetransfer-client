/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import * as S from './dropzone.style';

function Dropzone({ disabled, listedFiles, onFilesAdded }) {
  const [highlight, setHighlight] = useState(false);
  const [sameFileAlertShow, setSameFileAlertShow] = useState(false);
  const fileInputRef = React.createRef();

  useEffect(() => {
    if (sameFileAlertShow) {
      Swal.fire({
        title: 'Warning',
        text: 'Same file has already been uploaded',
      });
      setSameFileAlertShow(false);
    }
  }, [sameFileAlertShow]);

  const openFileDialog = () => {
    if (disabled) return;
    fileInputRef.current.click();
  };

  const fileListToArray = (list) => {
    const array = [];
    for (let i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  };

  const handleFilesAdded = (files) => {
    if (onFilesAdded) {
      const array = fileListToArray(files);

      const filteredArray = array.filter((file) => {
        return !listedFiles.some((x) => {
          return (
            x.name === file.name &&
            x.size === file.size &&
            x.lastModified === file.lastModified
          );
        });
      });

      const filtered = filteredArray.length !== array.length;
      if (filtered && !sameFileAlertShow) {
        setSameFileAlertShow(true);
      }

      onFilesAdded(filteredArray);
    }
  };

  const onFilesAddedChange = (evt) => {
    if (disabled) return;
    const { files } = evt.target;
    handleFilesAdded(files);
    evt.target.value = null;
  };

  const onDragOver = (event) => {
    event.preventDefault();
    if (disabled) return;
    setHighlight(true);
  };

  const onDragLeave = () => {
    setHighlight(false);
  };

  const onDrop = (event) => {
    event.preventDefault();
    if (disabled) return;
    const { files } = event.dataTransfer;

    handleFilesAdded(files);
    setHighlight(false);
  };

  return (
    <>
      <S.Dropzone
        highlight={highlight}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={openFileDialog}
        style={{ cursor: disabled ? 'default' : 'pointer' }}
      >
        <S.FileInput>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={onFilesAddedChange}
          />
        </S.FileInput>
        <S.Icon>
          <CloudUploadIcon fontSize="large" />
        </S.Icon>
        <span>Upload Files</span>
      </S.Dropzone>
    </>
  );
}

Dropzone.propTypes = {
  disabled: PropTypes.bool.isRequired,
  listedFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFilesAdded: PropTypes.func.isRequired,
};
export default Dropzone;
