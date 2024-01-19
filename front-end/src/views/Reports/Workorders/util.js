function base64ToBlob(dataURI) {
  const byteString = window.atob(dataURI);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }

  return new Blob([int8Array], { type: 'application/pdf'});
}

export { base64ToBlob }