// reducers/navbarReducer.ts

interface navbarState {
    key: string;
}

const initialState: navbarState = {
    key: ''
};

const navbarReducer = (state = initialState, action: any): navbarState => {
    switch (action.type) {
        case 'APPLY_NAVBAR':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default navbarReducer;
