// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import NewUser from '../../../src/components/newuser/newUsers';
// import * as userFormHandlers from '../../../src/handlers/userFormHandlers';
// import { showSnackbar } from '../../../src/slices/snackbarSlice';
// import { fetchPostalData } from '../../../src/slices/pincodeSlice';

// // Mock the useNavigate hook
// const mockedNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useNavigate: () => mockedNavigate,
//     useLocation: () => ({
//         pathname: '/newuser',
//         state: { edit: false },
//     }),
// }));

// // Mock the useDispatch and useSelector hooks from react-redux
// jest.mock('react-redux', () => ({
//     ...jest.requireActual('react-redux'),
//     useSelector: jest.fn(),
//     useDispatch: () => jest.fn(),
// }));

// // Mock the Material-UI components
// jest.mock('@mui/material', () => ({
//     ...jest.requireActual('@mui/material'),
// }));

// // Mock the custom components
// jest.mock('../../../src/components/textfield/textfield', () => {
//     return {
//         __esModule: true,
//         default: ({ label, value, onChange, disabled, select, options }) => (
//             <input
//                 data-testid={label.replace(/\s/g, '')}
//                 placeholder={label}
//                 value={value}
//                 onChange={(e) => onChange(e.target.value)}
//                 disabled={disabled}
//                 type="text"
//             />
//         ),
//     };
// });

// jest.mock('../../../src/components/breadcrumbs/breadcrumbs', () => {
//     return {
//         __esModule: true,
//         default: () => <div data-testid="breadcrumbs"></div>,
//     };
// });

// // Mock the slices
// jest.mock('../../../src/slices/pincodeSlice', () => ({
//     fetchPostalData: jest.fn(),
// }));

// jest.mock('../../../src/slices/snackbarSlice', () => ({
//     showSnackbar: jest.fn(),
// }));

// // Mock the userFormHandlers
// jest.mock('../../../src/handlers/userFormHandlers', () => ({
//     handleSubmit: jest.fn(),
// }));

// const mockStore = configureStore([thunk]);

// describe('NewUser Component', () => {
//     let store;

//     beforeEach(() => {
//         store = mockStore({
//             users: { selectedUser: null },
//             postal: { postOffices: [], loading: false, error: null },
//         });

//         useSelector.mockImplementation((selector) => selector({
//             users: { selectedUser: null },
//             postal: { postOffices: [], loading: false, error: null },
//         }));
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     it('renders the NewUser component', () => {
//         render(
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <NewUser />
//                 </BrowserRouter>
//             </Provider>
//         );
//         expect(screen.getByText('Users')).toBeInTheDocument();
//         expect(screen.getByText('New User')).toBeInTheDocument();
//     });

//     it('updates the first name state on input change', () => {
//         render(
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <NewUser />
//                 </BrowserRouter>
//             </Provider>
//         );
//         const firstNameInput = screen.getByPlaceholderText('First Name');
//         fireEvent.change(firstNameInput, { target: { value: 'John' } });
//         expect(firstNameInput.value).toBe('John');
//     });

//     it('dispatches fetchPostalData when pincode length is 6', () => {
//         render(
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <NewUser />
//                 </BrowserRouter>
//             </Provider>
//         );
//         const pincodeInput = screen.getByPlaceholderText('Pin Code');
//         fireEvent.change(pincodeInput, { target: { value: '123456' } });
//         expect(fetchPostalData).toHaveBeenCalledWith('123456');
//     });

//     it('navigates back when discard button is clicked', () => {
//         render(
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <NewUser />
//                 </BrowserRouter>
//             </Provider>
//         );
//         const discardButton = screen.getByText('Discard');
//         fireEvent.click(discardButton);
//         expect(mockedNavigate).toHaveBeenCalledWith(-1);
//     });

//     it('calls handleFormSubmit when create button is clicked', async () => {
//         render(
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <NewUser />
//                 </BrowserRouter>
//             </Provider>
//         );

//         const firstNameInput = screen.getByPlaceholderText('First Name');
//         fireEvent.change(firstNameInput, { target: { value: 'John' } });

//         const lastNameInput = screen.getByPlaceholderText('Last Name');
//         fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

//         const emailInput = screen.getByPlaceholderText('Email ID');
//         fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

//         const mobileNumberInput = screen.getByPlaceholderText('Contact Number');
//         fireEvent.change(mobileNumberInput, { target: { value: '1234567890' } });

//         const pincodeInput = screen.getByPlaceholderText('Pin Code');
//         fireEvent.change(pincodeInput, { target: { value: '123456' } });

//         const userRoleInput = screen.getByPlaceholderText('User Role');
//         fireEvent.change(userRoleInput, { target: { value: 'admin' } });

//         const createButton = screen.getByText('Create New User');
//         fireEvent.click(createButton);

//         await waitFor(() => {
//             expect(userFormHandlers.handleSubmit).toHaveBeenCalled();
//         });
//     });
// });
