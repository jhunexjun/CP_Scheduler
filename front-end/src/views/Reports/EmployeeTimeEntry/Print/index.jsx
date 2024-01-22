import { memo } from 'react';

import { PDFViewer } from '@react-pdf/renderer';

import scheduleDocumentContainer from '../../../Appointments/Print/scheduleDocumentContainer';

const Print = (props) => {
  return (
    <PDFViewer width={'100%'} height={'100%'}>{ scheduleDocumentContainer(props) }</PDFViewer>
  )
}

export default memo(Print);