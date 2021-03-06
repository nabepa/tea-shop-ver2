import React, { memo, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';

const ImageAddForm = memo(({ imageUploader, url, changeFile }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const onClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const onChange = async (event) => {
    setLoading(true);
    const uploaded = await imageUploader.upload(event.target.files[0]);
    setLoading(false);
    changeFile({ fileName: uploaded.original_filename, fileURL: uploaded.url });
  };

  return (
    <>
      <input
        ref={inputRef}
        style={{ display: 'none' }}
        type='file'
        accept='image'
        name='file'
        onChange={onChange}
      />
      {!loading && (
        <Button onClick={onClick}>
          {url ? (
            <img
              src={url}
              style={{
                width: '50%',
                objectFit: 'contain',
              }}
              alt='product'
            />
          ) : (
            <AddPhotoAlternateOutlinedIcon fontSize='large' />
          )}
        </Button>
      )}

      {loading && <CircularProgress />}
    </>
  );
});

export default ImageAddForm;
