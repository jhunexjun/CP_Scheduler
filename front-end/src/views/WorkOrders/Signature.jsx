import { useState, useCallback } from 'react'

import { pdf } from '@react-pdf/renderer'

import { Popup, ToolbarItem } from 'devextreme-react/popup';

import UilEdit from '@iconscout/react-unicons/icons/uil-edit';

import SignatureCanvas from 'react-signature-canvas';
import { notification, formatDateMMddYYYY } from '../../utils/util'
import Cookies from 'universal-cookie'

export default (props) => {
  const [signPopVisible, setSignPopupVisible] = useState(false);
  const [sigPad, setSigPad] = useState({});
  // const [signatureState, setSignatureState] = useState({trimmedDataURL: null});
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

  const sendSignedWorkOrderCb = useCallback(async (formData) => {
    // Do not add content-type. Expressjs will complain.
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

  /* Note that when data.pdfFile is not null, means the document has already been signed.
   * If the API server returns rawData, means the doc has not yet been signed.
   */
  function signaturePopup() {
    if (!props.showPdfViewer) {
      notification('Retrieve work order first.', 'error');
      return;
    }

    // if (data.rawData.signature.signature !== null) {
    if (props.data.pdfFile !== null) {
      notification('Document already been signed.', 'error');
      return;
    }

    setSignPopupVisible(true);
  }

  async function signWorkOrder() {
    if (sigPad.isEmpty()) {
      notification('Please sign document before saving.', 'error');
      return;
    }

    // setSignatureState({ trimmedDataURL: sigPad.getTrimmedCanvas().toDataURL('image/png') });
    setSignPopupVisible(false);
    props.setShowPdfViewer(false); // refresh the pdf viewer.
    props.setData((prevValue) => {
      let newValue = { ...prevValue };
      // Note: This might conflict bc of db uses UTC. If there's a strict difference, check this and do not use new Date().
      newValue.rawData.signature.dateSigned = formatDateMMddYYYY(new Date());
      newValue.rawData.signature.signature = sigPad.getTrimmedCanvas().toDataURL('image/png');

      return newValue;
    });

    const formData = new FormData();
    formData.append('sessionId', cookies.get('sessionId'));
    formData.append('workOrderNo', props.workOrderNo);
    formData.append('workOrderPdf', await props.pdfHtmlDpcument())
    formData.append('signatureImg', sigPad.getTrimmedCanvas().toDataURL('image/png'));

    props.setShowPdfViewer(true); // refresh the pdf viewer.

    await postSaveSignatureAsync(formData);
  }

  const saveBtnSignature = {
    text: 'Save',
    onClick: signWorkOrder,
  }

  const closeBtnSignature = {
    text: 'Close',
    onClick: () => { setSignPopupVisible(false);
                      sigPad.clear()
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
      <span onClick={ () => signaturePopup() } style={{cursor: 'pointer'}} title="Sign" >
        <UilEdit size="20" color="#61DAFB" />
      </span>

      <Popup
        visible={signPopVisible}
        width={400}
        height={380}>
        <SignatureCanvas
          penColor='black'
          canvasProps={{width: 380, height: 350, className: 'sigCanvas'}}
          ref={ (ref) => setSigPad(ref) }
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