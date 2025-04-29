import { showSnackbar } from "../slices/snackbarSlice";
import { createUser, updateUser, setSelectedUser } from "../slices/userSlice";
import { createSaleCalendar } from "../slices/saleCalenderSlice";

export const handleSubmit = async (e, dispatch, userDetails, edit, userObjectId, goBack) => {
    e.preventDefault();
    let userId = '';
    if (edit) {
        userId = userObjectId;
    }
    try {
        const action = edit ? updateUser({ userObjectId: userId, userDetails }) : createUser(userDetails);
        const response = await dispatch(action).unwrap();
        dispatch(
            showSnackbar({
                message: response?.userId
                    ? `${edit ? 'User Updated' : 'User Created'} Successfully`
                    : 'An error occurred. Please try again.',
                severity: response?.userId ? 'success' : 'error',
            })
        ); 
        dispatch(setSelectedUser(userDetails));
        goBack();
    } catch (error) {
        console.error('Error during user creation/update:', error);
        dispatch(showSnackbar({ message: 'An error occurred. Please try again.', severity: 'error' }));
    }
};

export const handleSaleCalenderSubmit = async(e, dispatch, saleCalendarData, goBack) => {
    e.preventDefault();
    try{
        const response = await dispatch(createSaleCalendar(saleCalendarData)).unwrap();
        dispatch(
            showSnackbar({
                message: response?.saleCalendar_Id ? 'sale calendar created successfully' : 'An error occured. Please try again',
                severity: response?.saleCalendar_Id? 'success' : 'error'
            })
        );
        goBack();
    }catch(error){
        console.error('Eroor during sale calendar creation:', error);
        dispatch(showSnackbar({message:'An error occured. Please try again', severity:'error'}));

    }
}