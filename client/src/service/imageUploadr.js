class ImageUploader {
  // Todo: 지금은 cloudinary의 preset 설정을 unsigned 허용 했지만, signed로 바꾸기...그에 따른 인증도
  async upload(file) {
    const data = new FormData();
    data.append('file', file);
    data.append(
      'upload_preset',
      `${process.env.REACT_APP_CLOUDINARY_PRESETS_NAME}`
    );
    const result = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: 'POST',
        body: data,
      }
    );

    return await result.json();
  }
}

export default ImageUploader;
