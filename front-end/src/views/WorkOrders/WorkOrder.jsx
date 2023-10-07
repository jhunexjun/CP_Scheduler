import { useState, useCallback, } from "react";
import { useNavigate } from 'react-router-dom';

import Cookies from 'universal-cookie';

import { PDFViewer, pdf } from '@react-pdf/renderer';
import workOrderDocumentContainer from './Prints/WorkOrderDocumentContainer';

import PdfViewerComponent from '../../components/PdfViewerComponent';

import JsBarcode from 'jsbarcode';

// See it live, https://iconscout.com/unicons/free-line-icons
import UilSearchAlt from '@iconscout/react-unicons/icons/uil-search-alt';
import UilListUl from '@iconscout/react-unicons/icons/uil-list-ul';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import ResendDocument from './ResendDocument';

// https://js.devexpress.com/Documentation/Guide/UI_Components/Popup/Getting_Started_with_Popup/
import { Popup, ToolbarItem } from 'devextreme-react/popup';
// import ScrollView from 'devextreme-react/scroll-view';
import { DataGrid, Column, Selection, Paging, FilterRow, SearchPanel } from 'devextreme-react/data-grid';

import SignatureCanvas from 'react-signature-canvas';

import { uriEncode, notification, formatDateMMddYYYY } from '../../utils/util';
import DefaultData from './DefaultData';

const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';

export default () => {
  const [invoiceNo, setInvoiceNo] = useState('');
  const [data, setData] = useState(DefaultData);
  const [popupVisible, setPopupVisible] = useState(false);
  const [signPopVisible, setSignPopupVisible] = useState(false);
  const navigate = useNavigate();
  const [workOrders, setWorkOrders] = useState([]);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [selectedWorkOrderNo, setSelectedWorkOrderNo] = useState(null);
  const [sigPad, setSigPad] = useState({});
  const [signatureState, setSignatureState] = useState({trimmedDataURL: null});
  const [emailPopupVisible, setEmailPopupVisible] = useState(false);
  // const [showResendDocPopup, setShowResendDocPopup] = useState(false);

  const cookies = new Cookies();

  const fetchWorkorderData = useCallback(async (invoiceNo, signatureState) => {
    await fetch(`${adminUrl}/invoice?sessionId=${cookies.get('sessionId')}&invoiceNo=${invoiceNo}`)
      .then((res) => {
        return res.json()
      })
      .then(async (invoice) => {
        if (invoice.status === 'Error') {
          navigate('/');
        } else if (invoice.data.table.length <= 0) {
          setData(DefaultData);
        } else {
          invoice.data.barcode.base64 = getImgBase64String(invoice.data.table[0].TKT_NO);
          await fetchWorkorderSignature(invoice);
        }
      });
  }, []);

  const postSaveSignature = useCallback(async (signature) => {
    const optionHeaders = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: uriEncode(signature),
    };

    await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/workorder`, optionHeaders)
      .then((res) => {
        return res.json()
      })
      .then(async (res) => {
        if (res.status === 'Error') {
          notification(res.message, 'error');
          return;
        }

        setData((prevValue) => {
          let newValue = { ...prevValue };
          newValue.data.signature.signature = signature.signatureImg;
          // Note: This might conflict bc of db uses UTC. If there's a strict difference, check this and do not use new Date().
          newValue.data.signature.dateSigned = formatDateMMddYYYY(new Date());

          return newValue;
        });

        notification('Signature has been saved', 'success');

        setEmailPopupVisible(true);
      });
  }, []);

  const fetchWorkorderList = useCallback(async () => {
    await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/invoiceslist?sessionId=${cookies.get('sessionId')}`)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setWorkOrders(res.data);
      });
  }, []);

  const fetchWorkorderSignature = useCallback(async (invoice) => {
    await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/workorder?sessionId=${cookies.get('sessionId')}&invoiceNo=${invoice.data.table[0].TKT_NO}`)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        invoice.data.signature.signature = res != null && res.length > 0 ? res[0].signatureImg : null;
        invoice.data.signature.dateSigned = res != null && res.length > 0 ? res[0].utcDateSigned : null
        setData(invoice);
        setShowPdfViewer(true);
      });
  }, []);

  const sendWorkOrderCb = useCallback(async (formData) => {
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

  function getImgBase64String(value) {
    const barcodeNode = document.getElementById('barcode');
    JsBarcode(barcodeNode, value, {displayValue: false});
    return barcodeNode.src;
  }

  async function fetchWorkorder() {
    setShowPdfViewer(false);
    await fetchWorkorderData(invoiceNo, signatureState);
  }

  const selectButtonOptions = {
    text: 'Select',
    onClick: hideAndSelect,
  }

  const closeButtonOptions = {
    text: 'Close',
    onClick: () => { setPopupVisible(false) },
  }

  async function hideAndSelect() {
    setInvoiceNo(selectedWorkOrderNo);
    setPopupVisible(false);
    await fetchWorkorder();
  }

  async function showWorkorderList() {
    // setShowPdfViewer(false);

    setPopupVisible(true);
    await fetchWorkorderList();
  }

  // function showTheInvoice() {
  //   if (showPdfViewer)
  //     return (<PDFViewer width={'100%'} height={700}>{workOrderDocumentContainer(data)}</PDFViewer>);
  //   else
  //     return null;
  // }

  function onSelectionChanged({ selectedRowsData }) {
    setShowPdfViewer(false);
    const data = selectedRowsData[0];

    setSelectedWorkOrderNo(data && data.TKT_NO);
    setInvoiceNo(data.TKT_NO);
  }

  async function onCellDblClick(e) {
    setSelectedWorkOrderNo(e.values[2]);
    setInvoiceNo(e.values[2]);
    setPopupVisible(false);
    setShowPdfViewer(false);
    await fetchWorkorder();
  }

  async function signWorkOrder() {
    if (sigPad.isEmpty()) {
      notification('Please sign document before saving.', 'error');
      return;
    }

    setSignatureState({ trimmedDataURL: sigPad.getTrimmedCanvas().toDataURL('image/png') });
    setSignPopupVisible(false);

    const signature = { sessionId: cookies.get('sessionId'),
                        workOrderNo: invoiceNo, // to rename invoice to workorder.
                        signatureImg: sigPad.getTrimmedCanvas().toDataURL('image/png'),
                      }

    // const formData = new FormData();
    // formData.append('workOrderPdf', await pdf(workOrderDocumentContainer(data)).toBlob());
    // formData.append('sessionId', cookies.get('sessionId'));
    // formData.append('signatureImg', sigPad.getTrimmedCanvas().toDataURL('image/png'));
    // formData.append('invoiceNo', invoiceNo);

    await postSaveSignature(signature);
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

  function signaturePopup() {
    if (!showPdfViewer) {
      notification('Retrieve work order first.', 'error');
      return;
    }

    if (data.data.signature.signature !== null) {
      notification('Document already been signed.', 'error');
      return;
    }

    setSignPopupVisible(true);
  }

  async function sendEmail() {
    const formData = new FormData();
    formData.append('sessionId', cookies.get('sessionId'));
    formData.append('workOrderNo', invoiceNo);
    formData.append('workOrderPdf', await pdf(workOrderDocumentContainer(data)).toBlob());

    setEmailPopupVisible(false);
    await sendWorkOrderCb(formData);
  }

  const yesBtn = {
    text: 'Yes',
    onClick: () => sendEmail(),
  }

  const noBtn = {
    text: 'No',
    onClick: () => setEmailPopupVisible(false),
  }

  const pdfBlob = async () => await pdf(workOrderDocumentContainer(data)).toBlob();

  return (
    <div className="content">
      <div className="row">
        <div className="col">
          <div style={{display: 'none'}}>
            <img id="barcode" alt='' />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="inputInvoiceNo" className="col-form-label">Work order #</label>
            </div>
            <div className="col-auto">
              <input type="text" id="inputInvoiceNo" className="form-control" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
            </div>
            <div className="col-auto">
              <span onClick={ async () => await fetchWorkorder() } style={{cursor: 'pointer'}} title="Click to search an workorder.">
                <UilSearchAlt size="20" color="#61DAFB" />
              </span>
            </div>
            <div className="col-auto">
              <span onClick={ async () => await showWorkorderList() } style={{cursor: 'pointer'}} title="Show the list of workorders." >
                <UilListUl size="20" color="#61DAFB" />
              </span>
            </div>
            <div className="col-auto">
              <span onClick={ () => signaturePopup() } style={{cursor: 'pointer'}} title="Sign" >
                <UilEdit size="20" color="#61DAFB" />
              </span>
            </div>
            <div className="col-auto">
              <ResendDocument
                data={data}
                showPdfViewer={showPdfViewer}
                workOrderNo={invoiceNo}
                pdfBlob={pdfBlob}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {
            showPdfViewer
            ?
              // <PDFViewer width={'100%'} height={700}>{workOrderDocumentContainer(data)}</PDFViewer>
              <PdfViewerComponent blobDocument={ pdfBlob } />
            :
            null
          }
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Popup
            visible={popupVisible}
            //onHiding={this.hideInfo}
            dragEnabled={false}
            hideOnOutsideClick={true}
            showCloseButton={false}
            showTitle={true}
            // title="Select"
            // container=".dx-viewport"
            container=".content"
            width={900}
            height={640}>
            <ToolbarItem
              widget="dxButton"
              toolbar="bottom"
              location="after"
              options={selectButtonOptions}
            />
            <ToolbarItem
              widget="dxButton"
              toolbar="bottom"
              location="after"
              options={closeButtonOptions}
            />
            <DataGrid
              dataSource={workOrders}
              columnAutoWidth={true}
              onSelectionChanged={(e) => onSelectionChanged(e)}
              onCellDblClick={async (e) => await onCellDblClick(e)}>
                <Column dataField="BILL_NAM" caption="Customer Name" />
                <Column dataField="BILL_PHONE_1" caption="Phone" />
                <Column dataField="TKT_NO" caption="Work order #" />
                <Column dataField="TKT_DAT" dataType="date" caption="Date" />
                <Column dataField="USR_MAKE" caption="Car make" />
                <Column dataField="USR_MODEL" caption="Car model" />
                <Column dataField="USR_LIC_PLATE" caption="Plate #" />
                <Column dataField="USR_VIN_NO" caption="VIN #" />
                <Selection mode="single" />
                <FilterRow visible={true} />
                <SearchPanel visible={true} />
                <Paging defaultPageSize={10} defaultPageIndex={1} />
            </DataGrid>
          </Popup>
        </div>
      </div>
      <div className="row">
        <div className="col">
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
        </div>
      </div>

      <div className="row">
        <div className="col">
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
        </div>
      </div>
    </div>
  )
}
