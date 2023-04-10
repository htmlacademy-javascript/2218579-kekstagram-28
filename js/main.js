import {renderGallery} from './gallery.js';
import {setUserFormSubmit, hideModal} from './form.js';
import {showAlert} from './util.js';
import {getData} from './api.js';


getData()
  .then((pictures) => {
    renderGallery(pictures);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit(hideModal);

