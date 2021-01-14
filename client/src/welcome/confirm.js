import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

function Test() {

  const submit = () => {
    confirmAlert({
      title: 'confirma la acción',
      message: 'seguro que quieres hacerlo?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    })
  };

  
    return (
      <div className="container">
        <button onClick={submit}>Confirm dialog</button>
      </div>
    );
  
}

export default Test