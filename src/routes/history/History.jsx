import { useEffect, useState } from "react";
import { apiFetch } from "../../helpers";
import Entry from "../../components/Entry/Entry";

function History() {
  const [isEmpty, setIsEmpty] = useState(true);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const uid = localStorage.getItem('uuid');
    apiFetch(`/app/user/${uid}/transaction`)
    .then(data => {
      console.log(data)
      if (data.length !== 0) {
        setEntries(data);
        setIsEmpty(false);
      };
    });
  }, []);

  return (
    <>
      <h2>History</h2>
      {isEmpty ? (
        <div>
          <div>Empty!</div>
          <div>Do some calculations/</div>
        </div>
      ) : (
        <div>
          {entries.map(entry => (
            <Entry key={`entry${entry.id}`} data={entry} />
          ))}
        </div>
      )}
    </>
  );
};

export default History;
