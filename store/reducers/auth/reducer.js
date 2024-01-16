const initialState = {
    user: null,
    validateNumber: false,
    validateNumberFound: false,
    validateEmail: false,
    authLoading: false,
    successResetPassword: false,
    closeModalMobile: false,
    verificationId: null,
    PhoneOTP: null,
    authToken: null,
    idToken: null,
    syncInfo: false,
    syncSitting: false,
    loadingInfo: false,
};
export function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case 'START_LOADING_INFO':
            return {
                ...state,
                loadingInfo: true,
            };
        case 'STOP_LOADING_INFO':
            return {
                ...state,
                loadingInfo: false,
            };
        case 'SYNC_INFO':
            return {
                ...state,
                syncInfo: !state?.syncInfo,
            };
        case 'SYNC_SITTING':
            return {
                ...state,
                syncSitting: !state?.syncSitting,
            };
        case 'SET_PHONE_NUMBER':
            return {
                ...state,
                PhoneOTP: action?.payload,
            };
        case 'SET_VERIFICATION_ID':
            return {
                ...state,
                verificationId: action?.payload,
            };
        case 'CLOSE_MODAL_MOBILE':
            return {
                ...state,
                closeModalMobile: !state.closeModalMobile,
            };
        case 'RESET_AUTH_REDUCER':
            return {
                ...state,
                user: null,
                validateNumber: false,
                validateNumberFound: false,
                validateEmail: false,
                authLoading: false,
                successResetPassword: false,
                verificationId: null,
                authToken: null,
                idToken: null,
            };
        case 'SET_AUTH_ID_TOKEN':
            return {
                ...state,
                idToken: action?.payload,
            };
        case 'SET_AUTH_TOKEN':
            return {
                ...state,
                authToken: action?.payload,
            };
        case 'START_LOADING_AUTH':
            return {
                ...state,
                authLoading: true,
            };
        case 'SUCCESS_RESET_PASSWORD':
            return {
                ...state,
                successResetPassword: true,
            };
        case 'STOP_LOADING_AUTH':
            return {
                ...state,
                authLoading: false,
            };
        case 'REGISTER_GUEST_REDUCERS':
            return {
                ...state,
                user: action?.payload?.Guest?.data,
            };
        case 'VALIDATE_NUMBER':
            return {
                ...state,
                validateNumber: true,
            };
        case 'REMOVE_VALIDATE_NUMBER':
            return {
                ...state,
                validateNumber: false,
            };
        case 'VALIDATE_NUMBER_FOUND':
            return {
                ...state,
                validateNumberFound: true,
            };
        case 'REMOVE_VALIDATE_NUMBER_FOUND':
            return {
                ...state,
                validateNumberFound: false,
            };
        case 'VALIDATE_EMAIL':
            return {
                ...state,
                validateEmail: true,
            };
        case 'REMOVE_VALIDATE_EMAIL':
            return {
                ...state,
                validateEmail: false,
            };
        case 'RESET_AUTH_RED':
            return {
                user: null,
                validateNumber: false,
                validateNumberFound: false,
                validateEmail: false,
                authLoading: false,
                successResetPassword: false,
                closeModalMobile: false,
                verificationId: null,
                PhoneOTP: null,
                authToken: null,
                idToken: null,
                syncInfo: false,
                loadingInfo: false,
            };
        default:
            return {
                ...state,
            };
    }
}
