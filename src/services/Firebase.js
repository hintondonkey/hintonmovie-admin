import { initializeApp } from 'firebase/app';
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from 'firebase/storage';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

const firebaseConfig = {
    apiKey: 'AIzaSyDqqkhcTvg1qfduRL9LcbNGXA3WCHB6aKw',
    authDomain: 'moviewebadmin.firebaseapp.com',
    projectId: 'moviewebadmin',
    storageBucket: 'moviewebadmin.appspot.com',
    messagingSenderId: '365032820768',
    appId: '1:365032820768:web:670918a4b7093aa2002c45',
    measurementId: 'G-DRQSF5D91W',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadImage = async (imageUpload, callBack) => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((val) => {
        getDownloadURL(imageRef).then((url) => {
            console.log('url', url);
            callBack(url);
            toast.success('Upload image success!!!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return url;
        });
    });
};

export const deleteImage = async (imageName) => {
    if (imageName === null || imageName === undefined) return;
    try {
        const storageRef = ref(storage, 'images/' + imageName);

        await deleteObject(storageRef)
            .then(() => console.log('delete image success'))
            .catch((error) => console.log('error delete image', error));

        console.log('delete image success');
    } catch (error) {
        console.error('Error deleting image:', error);
    }
};

export const getImageUid = (imageUrl) => {
    if (imageUrl !== null || imageUrl !== undefined) {
        let abc = imageUrl.split('/').pop();
        let xyz = abc.split('%2F').pop();
        let result = xyz.split('?')[0];

        return result;
    }
};
