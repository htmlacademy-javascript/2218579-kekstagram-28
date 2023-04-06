import {getDescribePhoto} from './data.js';
import {renderGallery} from './gallery.js';
import './form.js';

const userPictures = getDescribePhoto();
renderGallery(userPictures);
