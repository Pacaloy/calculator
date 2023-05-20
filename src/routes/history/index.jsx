import { useEffect, useState } from "react";
import { apiFetch } from "../../helpers";
import Entry from "../../components/Entry/Entry";
import Icon from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js'

function History() {
  const [isEmpty, setIsEmpty] = useState(true);
  const [entries, setEntries] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);

  const getUid = () => {
    const uid = localStorage.getItem('uuid');
    return uid;
  };

  const deleteHistory = () => {
    const uid = getUid();
    
    apiFetch(`/app/user/${uid}/transaction`, 'DELETE')
    .then(data => {
      console.log(data);
      setEntries([]);
      setIsEmpty(true);
    });

    setIsShowModal(false);
  };

  const promptDeleteHistory = () => {
    setIsShowModal(true);
  };

  useEffect(() => {
    const uid = getUid();

    // Get user's history
    apiFetch(`/app/user/${uid}/transaction`)
    .then(data => {
      if (data.length !== 0) {
        setEntries(data.reverse());
        setIsEmpty(false);
      };
    });
  }, []);

  return (
    <>
      {isShowModal && (
        <>
          <div className="modal-mask"></div>
          <div className="modal">
            <div className="modal-text">Clear history?</div>
            <div className="modal-options">
              <span onClick={() => setIsShowModal(false)}>Cancel</span>
              <span onClick={() => deleteHistory(false)}>Confirm</span>
            </div>
          </div>
        </>
      )}
      <div className='history-title'>History</div>
      {!isEmpty && <div className="trash" onClick={() => promptDeleteHistory()}><Icon path={mdiTrashCanOutline} size={1.3} /></div>}
      {isEmpty ? (
        <div className="empty-view">
          <div>Empty!</div>
          <div>Do some calculations/</div>
        </div>
      ) : (
        <div className='entries-container'>
          {entries.map(entry => (
            <Entry key={`entry${entry.id}`} calculation={entry.calculation} />
          ))}
        </div>
      )}
    </>
  );
};

export default History;
