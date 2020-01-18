const initialState = {
  fetching: false,
  data: [],
  fetched: false,
  errored: false,
  errorMsg: undefined
}

export default function formDataReducer (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_BANNER_FORM_DATA_PENDING':
      return {...state, fetching: true}

    case 'FETCH_BANNER_FORM_DATA_FULFILLED':
      return {...state, fetching: false, fetched: true, data: action.payload.data.bannerForm}

    case 'FETCH_BANNER_FORM_DATA_REJECTED':
      return {...state, fetching: false, errored: true, errorMsg: action.payload}

    default:
      return state
  }
}
