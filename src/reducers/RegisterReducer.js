import {Alert} from 'react-native';
const initialState={users : []};
export default RegisterReducer = (state=initialState,action) => {
    switch(action.type) {
        case 'REGISTER_USER':
            
            
            Alert.alert("User registered");            
            return {
                ...state,
                users: action.users
               
            }
         
            
            
        default:
        return state;
    }
}