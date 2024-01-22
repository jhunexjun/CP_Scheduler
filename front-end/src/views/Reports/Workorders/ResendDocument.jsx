import { useState, useCallback } from 'react';

import Cookies from 'universal-cookie';

import { Popup, ToolbarItem } from 'devextreme-react/popup';

import UilEnvelopeSend from '@iconscout/react-unicons/icons/uil-envelope-send';

import { notification } from '../../../utils/util';

const ResendDocument = (props) => {
  const [showResendDocPopup, setShowResendDocPopup] = useState(false);

  const cookies = new Cookies();

  const sendWorkOrderCb = useCallback(async (formData) => {
    // Do not add content-type. Expressjs will complain.
    // const optionHeaders = {
    //   method: 'POST',
    //   content
    //   body: formData,
    // };

    // HERE!!!

    const optionHeaders = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/sendworkorderpdf`, optionHeaders)
      .then((res) => {
        return res.json()
      })
      .then(async (res) => {
        notification('Sending pdf has been successful.', 'success');
      });

    setShowResendDocPopup(false);
  }, []);

  async function sendWorkOrder() {
    const formData = new FormData();
    formData.append('sessionId', cookies.get('sessionId'));
    formData.append('workOrderNo', props.workOrderNo);

    await sendWorkOrderCb(formData);
  }

  const resendDocBtn = {
    text: 'Yes',
    onClick: async () => await sendWorkOrder(),
  }

  const closeBtn = {
    text: 'No',
    onClick: () => setShowResendDocPopup(false),
  }

  function showPopup() {
    if (!props.showPdfViewer) {
      notification('No workorder selected.', 'error');
      return;
    }

    if (!props.documentIsSigned) {
      notification('Cannot send unsigned document.', 'error');
      return;
    }

    setShowResendDocPopup(true);
  }

  return (
    <>
      <span onClick={showPopup} style={{cursor: 'pointer'}} title="Re-send PDF to clients." >
        <UilEnvelopeSend size="20" color="#38A5E4" />
      </span>
      <Popup
        visible={showResendDocPopup}
        width={400}
        height={300}>
        <b>Are you sure you want to re-send this document?</b>
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={resendDocBtn}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={closeBtn}
        />
      </Popup>
    </>
  );
}

export default ResendDocument;