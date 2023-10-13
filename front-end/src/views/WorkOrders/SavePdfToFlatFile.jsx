import { memo, useCallback } from 'react';

import Cookies from 'universal-cookie';

import UilNotes from '@iconscout/react-unicons/icons/uil-notes';

import { notification } from '../../utils/util';

export default memo((props) => {
  const cookies = new Cookies();

  const saveFlatPdfFileAsync = useCallback(async (formData) => {
    const optionHeaders = {
      method: 'POST',
      body: formData,
    };

    await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/workorderpdfflatfile`, optionHeaders)
      .then((res) => {
        return res.json()
      })
      .then(async (res) => {
        notification('Saving pdf has been successful.', 'success');
      });
  }, []);

  /* const saveAnnotationCb = useCallback(async (instantJSON, workOrderNo) => {
    const postBody = {
      sessionId: cookies.get('sessionId'),
      workOrderNo: workOrderNo,
      instantJSON: instantJSON,
    }

    const optionHeaders = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBody),
    };

    await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/pdfannotation`, optionHeaders)
      .then((res) => {
        return res.json()
      })
      .then(async (res) => {
        notification('Saving annotation has been successful.', 'success');
      });
  }, []); */


  /* Async fx that creates pdf blob and sends to callback to be saved by API server.
   * Returns nothing.
   */
  async function savePdfAsync() {
    if (!props.showPdfViewer) {
      notification('Please select pdf first.', 'error');
      return;
    }

    // const arrayBuffer = await props.psPdfKitInstance.exportPDF({ flatten: true });
    const arrayBuffer = await props.psPdfKitInstance.exportPDF();
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

    const formData = new FormData();
    formData.append('sessionId', cookies.get('sessionId'));
    formData.append('workOrderNo', props.workOrderNo);
    formData.append('documentIsSigned', props.documentIsSigned ? 'Y' : 'N');  // Y or N.
    formData.append('instantJsonAnnotation', JSON.stringify(await props.psPdfKitInstance.exportInstantJSON()));
    formData.append('workOrderPdf', blob);

    await saveFlatPdfFileAsync(formData);

    // await saveAnnotationCb( await props.psPdfKitInstance.exportInstantJSON(),
    //                         props.workOrderNo
    //                       );
  }

  return (
    <span onClick={async () => { await savePdfAsync() }} style={{cursor: 'pointer'}} title="Save pdf" >
      <UilNotes size="20" color="#61DAFB" />
    </span>
  );
})