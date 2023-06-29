import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const SHOW_SUCCESS_MESSAGE = (mess) => {
    Swal.fire({
        icon: 'success',
        title: mess,
        showConfirmButton: false,
        timer: 1500,
    });
};
