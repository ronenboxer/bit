import { bitcoinService } from "../../services/bitcoin.service"

export function loadCharts() {

    return async (dispatch, getState) => {
        try {
            const props = getState().bitcoinModule.chartProps
            const charts = await bitcoinService.getCharts(props)
            const rate = await bitcoinService.getRate()
            dispatch({ type: 'SET_CHARTS', charts })
            dispatch({type: 'SET_RATE', rate})
            return 'hello'
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setChartProps(props) {

    return (dispatch) => {
        try {
            dispatch({ type: 'SET_CHART_PROPS', chartProps: { ...props } })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

