const _props = {
    data:[],
    state: null,
}

const _sideBarButtons = [{
    type: 'none',
}, {
    type: 'none',
}, {
    id: 'idEnable',
    type: 'normal',
    caption: 'Enable',
    action: () => {
        return { name: 'Enable' , data: {
            option_name: 'textValue1',
            option_value: 'Enable',
        }}
    },
}, {
    id: 'idDisable',
    type: 'normal',
    caption: 'Disable',
    action: () => {
        return { name: 'Disable' , data: {
            option_name: 'textValue1',
            option_value: 'Disable',
        }}
    },
}]

const tcrDraw =() => {
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
    tcrDraw()
}