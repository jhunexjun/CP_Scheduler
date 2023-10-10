import { memo, useEffect, useRef } from "react";

export default memo(function PdfViewerComponent(props) {
  const containerRef = useRef(null);

  function pdfBlob(base64) {
    const byteString = window.atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], { type: 'application/pdf'});
  }

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit;

    (async () => {
      if (props.data.pdfFile !== null)
        return pdfBlob(props.data.pdfFile);
      else
        return await props.blobDocument();
    })()
    .then(async (blobDocument) => {
      PSPDFKit = await import("pspdfkit");

      let documentBlobObjectUrl = URL.createObjectURL(blobDocument);

      (async function () {
        await PSPDFKit.load({
          // Container where PSPDFKit should be mounted.
          container,
          // The document to open.
          document: documentBlobObjectUrl,
          // document: `data:application/pdf;base64,${props.base64.pdfFile}`
          // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
          // baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
          //instantJSON: await PSPDFKit.Document.CreateAnnotationAsync(fromJsonAnnotation) // JSON.parse(props.instantJSON)
        }).then(psPdfKitInstance => {
          // Make sure to revoke the object URL so the browser doesn't hold on to the blob object that's not needed any more.
          URL.revokeObjectURL(documentBlobObjectUrl);

          // const annotation = JSON.parse({"annotations":[{"bbox":[191.41915893554688,450.8609313964844,185.41165161132812,59.878082275390625],"borderWidth":0,"createdAt":"2023-10-08T11:48:38Z","font":"Helvetica","fontColor":"#F82400","fontSize":36,"horizontalAlign":"left","id":"01HC7HWC7422RHM3GTCG3F091J","isFitting":true,"lineHeightFactor":1.186000108718872,"name":"01HC7HWC7422RHM3GTCG3F091J","opacity":1,"pageIndex":0,"rotation":6,"text":{"format":"plain","value":"Canceled!!!"},"type":"pspdfkit/text","updatedAt":"2023-10-08T11:48:57Z","v":2,"verticalAlign":"top"}],"format":"https://pspdfkit.com/instant-json/v1","pdfId":{"changing":"kc8n89vR//mjm5JwAsa19w==","permanent":"kc8n89vR//mjm5JwAsa19w=="}});

          // psPdfKitInstance.applyOperations([
          // {
          //   type: "applyInstantJson",
          //   instantJson: annotation
          // }
          // ]);

          // psPdfKitInstance.applyOperations([
          // {
          //   type: "applyInstantJson",
          //   instantJson: {
          //     annotations: [
          //       {
          //         bbox: [100, 150, 200, 75],
          //         blendMode: "normal",
          //         createdAt: "1970-01-01T00:00:00Z",
          //         id: "01F73GJ4RPENTCMFSCJ5CSFT5G",
          //         name: "01F73GJ4RPENTCMFSCJ5CSFT5G",
          //         opacity: 1,
          //         pageIndex: 0,
          //         strokeColor: "#2293FB",
          //         strokeWidth: 5,
          //         type: "pspdfkit/shape/rectangle",
          //         updatedAt: "1970-01-01T00:00:00Z",
          //         v: 1
          //       }
          //     ],
          //     format: "https://pspdfkit.com/instant-json/v1"
          //   }
          // }
          // ]);

          props.setPsPdfKitInstance(psPdfKitInstance);
        });
      })();
    });

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
})
