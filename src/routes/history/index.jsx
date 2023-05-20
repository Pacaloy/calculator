import { useEffect, useState } from "react";
import { apiFetch } from "../../helpers";
import Entry from "../../components/Entry/Entry";
import Icon from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js'

function History() {
  const [isEmpty, setIsEmpty] = useState(true);
  const [entries, setEntries] = useState([]);

  const deleteHistory = () => {
    console.log('del')
  };

  useEffect(() => {
    const uid = localStorage.getItem('uuid');
    apiFetch(`/app/user/${uid}/transaction`)
    .then(data => {
      console.log(data)
      if (data.length !== 0) {
        setEntries(data.reverse());
        setIsEmpty(false);
      };
    });
  }, []);

  return (
    <>
      <div className='history-title'>History</div>
      <div className="trash" onClick={() => deleteHistory()}><Icon path={mdiTrashCanOutline} size={1.3} /></div>
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
