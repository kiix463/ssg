const _props = {
    data: [],
    state: null,
}

const _sideBarButtons = [{
    type: 'none',
}, {
    type: 'none',
}, {
    id: 'idHigh',
    type: 'normal',
    caption: 'High',
    action: () => {
        //tcrDrawOptionValue('High')

        return { name: 'High' , data: {
            option_name: 'textValue1',
            option_value: 'High',
        }}
    },
}, {
    id: 'idNormal',
    type: 'normal',
    caption: 'Normal',
    action: () => {
        //tcrDrawOptionValue('Normal')

        return { name: 'Normal' , data: {
            option_name: 'textValue1',
            option_value: 'Normal',
        }}
    },
}]

const tcrDraw = () => {
    tcrDrawClient()
    tcrDrawSideBar()
}

const tcrDrawClient = () => {
    const menu = _props.data.menu
    if (menu && Array.isArray(menu.textvalues)) {
        tcrDrawOptionValue((menu.textvalues.length > 0) ? menu.textvalues[0].option_value : '')
    }
}

const tcrDrawOptionValue = (value) => {
    _props.state = value
    $('#idOptionValue').html(_props.state)
}

const tcrDrawSideBar = () => {
    tcrCommonDrawSideButtons($('.side-bar > ul'), 0, _sideBarButtons, { back: true })
}

function onTCREventListener(data) {
    _props.data = Object.assign(_props.data, data)
    data.menu && tcrDraw()
}