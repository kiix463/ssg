const _props = {
    data: [],
    state: null,
}

const _sideBarButtons = [{
    type: 'none',
}, {
    id: 'idNew',
    type: 'normal',
    caption: 'New<br>Quality',
    action: () => {
        //tcrDrawOptionValue('New Quality')

        return { name: 'New Quality' , data: {
            option_name: 'textValue1',
            option_value: 'New Quality',
        }}
    },
}, {
    id: 'idStreet',
    type: 'normal',
    caption: 'Steet<br>Quality',
    action: () => {
        //tcrDrawOptionValue('Street Quality')

        return { name: 'Street Quality' , data: {
            option_name: 'textValue1',
            option_value: 'Street Quality',
        }}
    },
}, {
    id: 'idPoor',
    type: 'normal',
    caption: 'Poor<Br>Quality',
    action: () => {
        //tcrDrawOptionValue('Poor Quality')

        return { name: 'Poor Quality' , data: {
            option_name: 'textValue1',
            option_value: 'Poor Quality',
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