import { useState, useCallback } from 'react'

import { Popup, ToolbarItem } from 'devextreme-react/popup';

import UilEdit from '@iconscout/react-unicons/icons/uil-edit';

import SignatureCanvas from 'react-signature-canvas';
import { notification, formatDateMMddYYYY } from '../../utils/util'
import Cookies from 'universal-cookie'

export default (props) => {
  const [signPopVisible, setSignPopupVisible] = useState(false);
  // const [sigPad, setSigPad] = useState({});
  const [emailPopupVisible, setEmailPopupVisible] = useState(false);

  const cookies = new Cookies();

  const postSaveSignatureAsync = useCallback(async (formData) => {
    const optionHeaders = {
      method: 'POST',
      body: formData,
    };

    await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/workordersign`, optionHeaders)
      .then((res) => {
        return res.json()
      })
      .then(async (res) => {
        if (res.status === 'Error') {
          notification(res.message, 'error');
          return;
        }

        notification('Signature has been saved', 'success');
        setEmailPopupVisible(true);
      });
  }, []);

  /* After signing call this to send through email. */
  const sendSignedWorkOrderCb = useCallback(async (formData) => {
    // Do not add content-type. Express.js will complain.
    const optionHeaders = {
      method: 'POST',
      body: formData,
    };

    await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/sendworkorderpdf`, optionHeaders)
      .then((res) => {
        return res.json()
      })
      .then(async (res) => {
        notification('Sending pdf has been successful.', 'success');
      });
  }, []);

  function signaturePopup() {
    if (!props.showPdfViewer) {
      notification('Retrieve work order first.', 'error');
      return;
    }

    if (props.data.documentIsSigned == 'Y') {
      notification('Document already been signed.', 'error');
      return;
    }

    setSignPopupVisible(true);
  }

  async function signWorkOrder() {
    if (props.sigPad.isEmpty()) {
      notification('Please sign document before saving.', 'error');
      return;
    }

    setSignPopupVisible(false);
    props.setShowPdfViewer(false); // refresh the pdf viewer.

    const x = await props.fetchWorkorderDataCb(props.workOrderNo, 'Y')
      .then((newData) => {
        // console.log('newData: ', newData);

        // Note: This might conflict bc of db uses UTC. If there's a strict difference, check this and do not use new Date().
        newData.rawData.signature.dateSigned = formatDateMMddYYYY(new Date());
        newData.rawData.signature.signature = props.sigPad.getTrimmedCanvas().toDataURL('image/png');

        return newData;
      });
    // console.log('x: ', x);

    props.setDocumentIsSigned('Y');

    // const formData = new FormData();
    // formData.append('sessionId', cookies.get('sessionId'));
    // formData.append('workOrderNo', props.workOrderNo);
    // // formData.append('workOrderPdf', await props.pdfHtmlDpcument());
    // formData.append('jsonAnnotation', JSON.stringify(await props.psPdfKitInstance.exportInstantJSON()));
    // formData.append('workOrderPdf', await props.psPdfKitInstance.exportPDF({ flatten: true }));
    // formData.append('signatureImg', sigPad.getTrimmedCanvas().toDataURL('image/png'));

    // props.setShowPdfViewer(true); // refresh the pdf viewer.

    // await postSaveSignatureAsync(formData);

    props.setSigPad({});
  }

  const saveBtnSignature = {
    text: 'Save',
    onClick: signWorkOrder,
  }

  const closeBtnSignature = {
    text: 'Close',
    onClick: () => { setSignPopupVisible(false);
                      props.sigPad.clear();
                      props.setSigPad({});
                    },
  }

  async function sendEmail() {
    const formData = new FormData();
    formData.append('sessionId', cookies.get('sessionId'));
    formData.append('workOrderNo', props.workOrderNo);
    formData.append('workOrderPdf', await props.pdfHtmlDpcument());

    setEmailPopupVisible(false);
    await sendSignedWorkOrderCb(formData);
  }

  const yesBtn = {
    text: 'Yes',
    onClick: () => sendEmail(),
  }

  const noBtn = {
    text: 'No',
    onClick: () => setEmailPopupVisible(false),
  }

  return (
    <>
      <span onClick={ () => signaturePopup() } style={{cursor: 'pointer'}} title="Sign document" >
        <UilEdit size="20" color="#61DAFB" />
      </span>

      <Popup
        visible={signPopVisible}
        width={400}
        height={380}>
        <SignatureCanvas
          penColor='black'
          canvasProps={{width: 380, height: 350, className: 'sigCanvas'}}
          ref={ (ref) => props.setSigPad(ref) }
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={saveBtnSignature}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={closeBtnSignature}
        />
      </Popup>

      <Popup
        visible={emailPopupVisible}
        width={350}
        height={340}>
          Do you want to send an e-mail the signed work order?
          <ToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location="after"
            options={yesBtn}
          />
          <ToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location="after"
            options={noBtn}
          />
      </Popup>
    </>
  )
}