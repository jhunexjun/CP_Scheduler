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

    await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/workorderpdf`, optionHeaders)
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

    if (props.data.documentIsSigned === 'Y') {
      notification('Cannot modify signed document.', 'error');
      return;
    }

    // const arrayBuffer = await props.psPdfKitInstance.exportPDF({ flatten:  !props.sigPad.isEmpty() ? true : false });
    // const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

    const formData = new FormData();
    formData.append('sessionId', cookies.get('sessionId'));
    formData.append('workorderNo', props.workorderNo);
    formData.append('documentIsSigned', props.documentIsSigned ? 'Y' : 'N');
    // formData.append('instantJsonAnnotation', JSON.stringify(await props.psPdfKitInstance.exportInstantJSON()));
    // formData.append('workOrderPdf', blob);
    formData.append('tableJson', props.tableNewQtyJson ?? '');
    formData.append('workorderPdf', props.documentIsSigned ? await props.pdfBlob() : '');
    formData.append('signatureImg', props.documentIsSigned ? props.sigPad.getTrimmedCanvas().toDataURL('image/png') : '');

    props.setShowPdfViewer(false); // refresh the pdf viewer.

    // await saveFlatPdfFileAsync(formData).then(() => props.setShowPdfViewer(true));

    await saveFlatPdfFileAsync(formData).then(async () => {
      return await props.fetchWorkorderDataCb(props.workorderNo);
    })
  }

  return (
    <span onClick={async () => { await savePdfAsync() }} style={{cursor: 'pointer'}} title="Save pdf" >
      <UilNotes size="20" color="#38A5E4" />
    </span>
  );
})