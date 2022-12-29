const INITIAL_STATE = {
    charts: null,
    chartProps: {span:'timespan=6months', avg:'rollingAverage=1days'},
    rate: null
}


export function bitcoinReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_CHARTS':
            return {
                ...state,
                charts: action.charts
            }
        case 'SET_PROPS':
            return {
                ...state,
                chartProps: action.chartProps
            }
        case 'SET_RATE':
            return {
                ...state, rate: action.rate
            }
        default:
            return state
    }

}