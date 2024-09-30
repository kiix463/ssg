const _props = {
    data: [],
    state: null,
}

const _sideBarButtons = [{
    type: 'none',
}, {
    type: 'none',
}, {
    id: 'idReal',
    type: 'normal',
    caption: 'Real Bills',
    action: () => {
        //tcrDrawOptionValue('Real Bills')

        return { name: 'Real Bills' , data: {
            option_name: 'textValue1',
            option_value: 'Real Bills',
        }}
    },
}, {
    id: 'idTest',
    type: 'normal',
    caption: 'Test Bills',
    action: () => {
        //tcrDrawOptionValue('Test Bills')

        return { name: 'Test Bills' , data: {
            option_name: 'textValue1',
            option_value: 'Test Bills',
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