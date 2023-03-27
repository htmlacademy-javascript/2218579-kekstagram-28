import {getDescribePhoto} from './data.js';
import {renderGallery} from './gallery.js';

const userPictures = getDescribePhoto();
renderGallery(userPictures);
