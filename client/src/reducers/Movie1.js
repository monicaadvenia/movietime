const INITIAL_STATE = '';

export default (state = INITIAL_STATE, action) => {
    //initial_state sebagai default value dan hanya berjalan pertama kali
    switch (action.type){
        case 'movie_1':
            return action.payload;
        default:
            return state;
            //state terakhir atau sebelumnya
    }
} 