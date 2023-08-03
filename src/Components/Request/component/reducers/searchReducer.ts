// reducers/searchReducer.ts

interface SearchState {
    keyword: string;
}

const initialState: SearchState = {
    keyword: ''
};

const searchReducer = (state = initialState, action: any): SearchState => {
    switch (action.type) {
        case 'APPLY_SEARCH':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default searchReducer;
