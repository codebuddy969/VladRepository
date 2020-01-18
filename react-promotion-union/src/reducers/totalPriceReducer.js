import f from 'float'

export default function totalPriceReducer (state = 0, action) {
  switch (action.type) {
    case 'ADD_PRICE':
      let price = action.payload.replace('$', '')
      price = parseFloat(price)
      let newState = state + price
      newState = f.round(newState, 2)
      return newState
    case 'SUBSTRACT_PRICE':
      price = action.payload.replace('$', '')
      price = parseFloat(price)
      newState = state - price
      newState = f.round(newState, 2)
      return newState
    default:
      return state
  }
}
