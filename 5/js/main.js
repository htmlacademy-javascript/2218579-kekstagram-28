import {getDescribePhoto} from './data.js';
import{renderThumbnails} from './thumbnail.js';

const userPictures = getDescribePhoto();
renderThumbnails(userPictures);
