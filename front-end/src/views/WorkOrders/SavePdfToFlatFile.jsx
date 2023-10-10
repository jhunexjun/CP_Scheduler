import { memo, useCallback } from 'react';

import Cookies from 'universal-cookie';

import UilNotes from '@iconscout/react-unicons/icons/uil-notes';

import { notification } from '../../utils/util';

export default memo((props) => {
  const cookies = new Cookies();

  const saveFlatPdfFileCb = useCallback(async (pdfBlob, workOrderNo) => {
    const formData = new FormData();
    formData.append('sessionId', cookies.get('sessionId'));
    formData.append('workOrderNo', workOrderNo);
    formData.append('workOrderPdf', pdfBlob);

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


  /* Async f(x) that creates pdf blob and sends to callback to save to API server.
   * Returns nothing.
   */
  async function savePdf() {
    if (!props.showPdfViewer) {
      notification('Please select pdf first.', 'error');
      return;
    }

    if (props.signatureState.trimmedDataURL === null ) {
      notification('Saving is not allowed for unsigned document.', 'error');
      return;
    }

    const arrayBuffer = await props.psPdfKitInstance.exportPDF({ flatten: true });
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    await saveFlatPdfFileCb(blob, props.workOrderNo);
  }

  return (
    <span onClick={async () => { await savePdf() }} style={{cursor: 'pointer'}} title="Save pdf" >
      <UilNotes size="20" color="#61DAFB" />
    </span>
  );
})