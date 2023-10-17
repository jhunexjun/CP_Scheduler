import { memo, useEffect, useRef } from "react";

export default memo(function PdfViewerComponent(props) {
  const containerRef = useRef(null);

  function base64ToBlob(base64) {
    const byteString = window.atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], { type: 'application/pdf'});
  }

  function getannotations() {
    if (props.data.rawData != null && props.data.rawData.annotations != null) {
      let annotations = JSON.parse(props.data.rawData.annotations)
      delete annotations.pdfId;
      return annotations;
    } else
      return null;
  }

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit;

    (async () => {
      if (props.data.pdf !== null)
        return base64ToBlob(props.data.pdf.base64);
      else
        return await props.blobDocument();
    })()
    .then(async (blobDocument) => {
      PSPDFKit = await import("pspdfkit");

      let documentBlobObjectUrl = URL.createObjectURL(blobDocument);

      (async function () {
        await PSPDFKit.load({
          container,  // Container where PSPDFKit should be mounted.
          document: documentBlobObjectUrl, // The document to open.
          // document: `data:application/pdf;base64,${props.base64.pdfFile}`
          // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
          instantJSON: getannotations(),
          licenseKey: process.env.REACT_APP_PSPDFKIT_LICENSE_KEY
        }).then(psPdfKitInstance => {
          // Make sure to revoke the object URL so the browser doesn't hold on to the blob object that's not needed any more.
          URL.revokeObjectURL(documentBlobObjectUrl);

          props.setPsPdfKitInstance(psPdfKitInstance);
        });
      })();
    });

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
})
