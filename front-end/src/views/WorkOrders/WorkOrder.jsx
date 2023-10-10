import { useState, useCallback, } from "react";
import { useNavigate } from 'react-router-dom';

import Cookies from 'universal-cookie';

import { /*PDFViewer,*/ pdf } from '@react-pdf/renderer';
import workOrderDocumentContainer from './Prints/WorkOrderDocumentContainer';

import PdfViewerComponent from '../../components/PdfViewerComponent';

import JsBarcode from 'jsbarcode';

// See it live, https://iconscout.com/unicons/free-line-icons
import UilSearchAlt from '@iconscout/react-unicons/icons/uil-search-alt';
import UilListUl from '@iconscout/react-unicons/icons/uil-list-ul';
// import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import ResendDocument from './ResendDocument';
// import SaveAnnotation from './SaveAnnotation';
import SavePdfToFlatFile from './SavePdfToFlatFile'
import Signature from './Signature';

// https://js.devexpress.com/Documentation/Guide/UI_Components/Popup/Getting_Started_with_Popup/
import { Popup, ToolbarItem } from 'devextreme-react/popup';
// import ScrollView from 'devextreme-react/scroll-view';
import { DataGrid, Column, Selection, Paging, FilterRow, SearchPanel } from 'devextreme-react/data-grid';

import DefaultData from './DefaultData';

const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';

export default () => {
  const [invoiceNo, setInvoiceNo] = useState(''); // invoiceNo = workorder no.
  const [data, setData] = useState(DefaultData);
  const [popupVisible, setPopupVisible] = useState(false);
  // const [signPopVisible, setSignPopupVisible] = useState(false);
  const navigate = useNavigate();
  const [workOrders, setWorkOrders] = useState([]);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [selectedWorkOrderNo, setSelectedWorkOrderNo] = useState(null);
  // const [emailPopupVisible, setEmailPopupVisible] = useState(false);
  // const [instantJSON, setInstantJSON] = useState(false);

  const [signatureState, setSignatureState] = useState({trimmedDataURL: null});

  const [psPdfKitInstance, setPsPdfKitInstance] = useState(null);

  const cookies = new Cookies();

  const fetchWorkorderData = useCallback(async (invoiceNo) => {
    await fetch(`${adminUrl}/workorder?sessionId=${cookies.get('sessionId')}&workOrderNo=${invoiceNo}`)
      .then((res) => {
        return res.json()
      })
      .then(async (workorder) => {
        if (workorder.status === 'Error') {
          navigate('/');
          return
        }

        if (workorder.data.rawData !== null) {
          workorder.data.rawData.barcode.base64 = getImgBase64String(workorder.data.rawData.table[0].TKT_NO);
        }

        setData(workorder.data);
        setShowPdfViewer(true);
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

  // const fetchWorkorderSignature = useCallback(async (invoice) => {
  //   await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/workorder?sessionId=${cookies.get('sessionId')}&invoiceNo=${invoice.data.table[0].TKT_NO}`)
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((res) => {
  //       invoice.data.signature.signature = res != null && res.length > 0 ? res[0].signatureImg : null;
  //       invoice.data.signature.dateSigned = res != null && res.length > 0 ? res[0].utcDateSigned : null
  //       // setData(invoice);
  //       // setShowPdfViewer(true);
  //     });
  // }, []);

  // const getAnnotationCb = useCallback(async (workOrderNo) => {
  //   await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/pdfannotation?sessionId=${cookies.get('sessionId')}&workOrderNo=${workOrderNo}`)
  //     .then(async (res) =>
  //       res.json()
  //     ).then(resJson => {
  //       console.log(resJson)

  //       if (resJson.data !== null && resJson.data.length > 0)
  //         setInstantJSON(resJson.data[0].instantJSON)
  //       else
  //         setInstantJSON(null);
  //       setShowPdfViewer(true);
  //     })
  // }, []);

  function getImgBase64String(value) {
    const barcodeNode = document.getElementById('barcode');
    JsBarcode(barcodeNode, value, {displayValue: false});
    return barcodeNode.src;
  }

  async function fetchWorkorder() {
    setShowPdfViewer(false);
    await fetchWorkorderData(invoiceNo);
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

  const pdfBlob = async () => await pdf(workOrderDocumentContainer(data.rawData)).toBlob();

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
              <label htmlFor="inputWorkorderNo" className="col-form-label">Workorder #</label>
            </div>
            <div className="col-auto">
              <input type="text" id="inputWorkorderNo" className="form-control" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
            </div>
            <div className="col-auto">
              <span onClick={ async () => await fetchWorkorder() } style={{cursor: 'pointer'}} title="Show a workorder">
                <UilSearchAlt size="20" color="#61DAFB" />
              </span>
            </div>
            <div className="col-auto">
              <span onClick={ async () => await showWorkorderList() } style={{cursor: 'pointer'}} title="Show the list of workorders" >
                <UilListUl size="20" color="#61DAFB" />
              </span>
            </div>
            <div className="col-auto">
              <Signature
                data={data}
                setData={setData}
                showPdfViewer={showPdfViewer}
                setShowPdfViewer={setShowPdfViewer}
                workOrderNo={invoiceNo}
                pdfHtmlDpcument={pdfBlob}
                setSignatureState={setSignatureState}
              />
            </div>
            <div className="col-auto">
              <ResendDocument
                data={data}
                showPdfViewer={showPdfViewer}
                workOrderNo={invoiceNo}
                pdfBlob={pdfBlob}
              />
            </div>
            {
              // <div className="col-auto">
              //   <SaveAnnotation showPdfViewer={showPdfViewer} psPdfKitInstance={psPdfKitInstance} workOrderNo={invoiceNo} />
              // </div>
            }
            <div className="col-auto">
              <SavePdfToFlatFile signatureState={signatureState} showPdfViewer={showPdfViewer} psPdfKitInstance={psPdfKitInstance} workOrderNo={invoiceNo} />
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
              <PdfViewerComponent workOrderNo={invoiceNo} blobDocument={ pdfBlob } data={data} setPsPdfKitInstance={setPsPdfKitInstance} />
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

    </div>
  )
}
