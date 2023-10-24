import { memo, useCallback } from 'react';

import Cookies from 'universal-cookie';

import UilNotes from '@iconscout/react-unicons/icons/uil-notes';

import { notification } from '../../utils/util';

export default memo((props) => {
  const cookies = new Cookies();

  const saveAnnotationCb = useCallback(async (instantJSON, workOrderNo) => {
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
  }, []);

  async function saveAnnotationAsync() {
    if (!props.showPdfViewer) {
      notification('Please select pdf first.', 'error');
      return;
    }

    await saveAnnotationCb( await props.psPdfKitInstance.exportInstantJSON(),
                            props.workOrderNo
                          );
  }

  return (
    <span onClick={async () => { await saveAnnotationAsync() }} style={{cursor: 'pointer'}} title="Save annotation" >
      <UilNotes size="20" color="#61DAFB" />
    </span>
  );
})