import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DropdownMenu, DropdownItem } from 'reactstrap';

function MessageNotif(props) {
  const navigate = useNavigate();

  function notifOnClick(notif) {
    navigate('/admin/sms/' + notif.customerNo);
  }

  return (
    <DropdownMenu right>
      <DropdownItem header>Notifications</DropdownItem>
      {props.notif.map((notif, index) => {
        return (<DropdownItem
                  key={notif.id}
                  onClick={(item) => notifOnClick(notif)}
                >
                  { notif.from + ` - ` + notif.NAM }
                </DropdownItem>)
      })}
    </DropdownMenu>
  );
}

export default MessageNotif;