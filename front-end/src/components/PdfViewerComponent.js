import { useEffect, useRef } from "react";
import { pdf } from '@react-pdf/renderer';

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit;

    (async () => 
      await props.blobDocument()
    )().then(async (instance) => {
      PSPDFKit = await import("pspdfkit");     

      let documentBlobObjectUrl = URL.createObjectURL(instance);      

      (async function () {
        await PSPDFKit.load({
          // Container where PSPDFKit should be mounted.
          container,
          // The document to open.
          document: documentBlobObjectUrl,
          // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
          // baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
        }).then(instance => {
          // Make sure to revoke the object URL so the browser doesn't hold on to the blob object that's not needed any more.
          URL.revokeObjectURL(documentBlobObjectUrl);
        });
      })();
    });

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [props.blobDocument]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
