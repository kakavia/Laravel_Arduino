import {notifyUnauthorizedActionAndLogout} from "../general_functions/generalFunctions";

let saveCategories = (categories=[]) => ({
        type: 'SAVE_CATEGORIES',
        categories
    });

export let startSaveCategories = () => dispatch => {
       return axios('/api/auth/categories')
           .then(response => dispatch(saveCategories([...response.data])))
           .catch(e => 'error');
};

export let createCategory = (category={}) => ({
        type: 'CREATE_CATEGORY',
        category
    });

export let startCreateCategory = (name='', symbol='', minValue=0, maxValue=0) => dispatch => {
        return axios.post('/api/auth/categories', {
            name,
            symbol,
            minValue,
            maxValue
        }).then(response => dispatch(createCategory(response.data)))
            .catch(e => notifyUnauthorizedActionAndLogout())
};

export let editCategory = (category={}) => ({
        type: 'EDIT_CATEGORY',
        category
    });

export let editCategoryOnStations = (category={}) => ({
        type: 'EDIT_CATEGORY_ON_STATIONS',
        category
    });

export let startEditCategory = (lastName='', name='', symbol='', minValue=0, maxValue=0) => dispatch => {
        return axios.patch(`/api/auth/categories/${lastName}`, {
            name,
            symbol,
            minValue,
            maxValue
        }).then(response => {
            if(response.status === 202){
                return 'same';
            } else {
                dispatch(editCategory(response.data));
                dispatch(editCategoryOnStations(response.data));
            }
        }).catch(e => notifyUnauthorizedActionAndLogout())
};

export let startDeleteCategory = (name='') => () => {
        return axios.delete(`/api/auth/categories/${name}`)
            .then(() => 'deleted')
            .catch(e => notifyUnauthorizedActionAndLogout())
};
