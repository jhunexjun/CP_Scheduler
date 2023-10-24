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
        // props.setDocIsModified(false);
      });
  }, []);

  /* Async fx that creates pdf blob and sends to callback to be saved by API server.
   * Returns nothing.
   */
  async function savePdfAsync() {
    if (!props.showPdfViewer) {
      notification('No PDF found.', 'error');
      return;
    }

    const arrayBuffer = await props.psPdfKitInstance.exportPDF({ flatten:  !props.sigPad.isEmpty() ? true : false });
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

    const formData = new FormData();
    formData.append('sessionId', cookies.get('sessionId'));
    formData.append('workOrderNo', props.workOrderNo);
    formData.append('documentIsSigned', props.documentIsSigned ? 'Y' : 'N');
    formData.append('instantJsonAnnotation', JSON.stringify(await props.psPdfKitInstance.exportInstantJSON()));
    formData.append('workOrderPdf', blob);
    formData.append('signatureImg', !props.sigPad.isEmpty() ? props.sigPad.getTrimmedCanvas().toDataURL('image/png') : '');

    props.setShowPdfViewer(false); // refresh the pdf viewer.

    await saveFlatPdfFileAsync(formData).then(async () => {
      return await props.fetchWorkorderDataCb(props.workOrderNo, 'N');
    }).then(async () => {
      props.setShowPdfViewer(true); // refresh the pdf viewer.
    });
  }

  return (
    <span onClick={async () => { await savePdfAsync() }} style={{cursor: 'pointer'}} title="Save pdf" >
      <UilNotes size="20" color="#61DAFB" />
    </span>
  );
})