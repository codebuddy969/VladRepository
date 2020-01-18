import { combineReducers } from 'redux'

import sectionsReducer from './sectionsReducer'
import scrollReducer from './scrollReducer'
import faqReducer from './faqReducer'
import totalPriceReducer from './totalPriceReducer'
import responsiveReducer from './responsiveReducer'
import formDataReducer from './formDataReducer'
import burgerReducer from './burgerReducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  sections: sectionsReducer,
  position: scrollReducer,
  faq: faqReducer,
  form: formReducer,
  totalPrice: totalPriceReducer,
  responsive: responsiveReducer,
  formData: formDataReducer,
  isBurgerOpen: burgerReducer
})
