import { memo, useState, /*useCallback*/ } from 'react';

import { Popup, ToolbarItem } from 'devextreme-react/popup';

import UilEdit from '@iconscout/react-unicons/icons/uil-edit';

import SignatureCanvas from 'react-signature-canvas';
import { notification, formatDateMMddYYYY } from '../../../utils/util'
// import Cookies from 'universal-cookie'

export default memo((props) => {
  const [signPopVisible, setSignPopupVisible] = useState(false);
  // const [sigPad, setSigPad] = useState({});
  // const [emailPopupVisible, setEmailPopupVisible] = useState(false);

  // const cookies = new Cookies();

  // const sendSignedWorkOrderCb = useCallback(async (formData) => {
  //   // Do not add content-type. Express.js will complain.
  //   const optionHeaders = {
  //     method: 'POST',
  //     body: formData,
  //   };

  //   await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/sendworkorderpdf`, optionHeaders)
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then(async (res) => {
  //       notification('Sending pdf has been successful.', 'success');
  //     });
  // }, []);

  function signaturePopup() {
    if (!props.showPdfViewer) {
      notification('No PDF found.', 'error');
      return;
    }

    if (props.data.documentIsSigned === 'Y') {
      notification('This document has already been signed.', 'error');
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

    // await props.fetchWorkorderDataCb(props.workOrderNo, 'Y')
    //   .then((newData) => {
    //     console.log('newData: ', newData);

    //     // Note: This might conflict bc of db uses UTC. If there's a strict difference, check this and do not use new Date().
    //     newData.rawData.signature.dateSigned = formatDateMMddYYYY(new Date());
    //     newData.rawData.signature.signature = props.sigPad.getTrimmedCanvas().toDataURL('image/png');

    //     return newData;
    //   });

    props.setData(prevValue => {
      let newValue = { ...prevValue };
      // newValue.documentIsSigned = 'Y'; // this should only be set in SavePdfToFlatFile() fetch().
      newValue.rawData.signature.dateSigned = formatDateMMddYYYY(new Date());
      newValue.rawData.signature.signature = props.sigPad.getTrimmedCanvas().toDataURL('image/png');

      return newValue;
    });

    props.setDocumentIsSigned('Y');
    props.setSigPad(null);
    props.setShowPdfViewer(true);
  }

  const saveBtnSignature = {
    text: 'Save',
    onClick: signWorkOrder,
  }

  const closeBtnSignature = {
    text: 'Close',
    onClick: () => { setSignPopupVisible(false);
                      props.sigPad.clear();
                      props.setSigPad(null);
                    },
  }

  return (
    <>
      <span onClick={ () => signaturePopup() } style={{cursor: 'pointer'}} title="Sign document" >
        <UilEdit size="20" color="#38A5E4" />
      </span>

      <Popup
        title="Signature"
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
    </>
  )
})