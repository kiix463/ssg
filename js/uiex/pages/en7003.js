const _props = {
  data: {},
  state: {
    pageIndex: 1,
    buttonIndex : 0,
    buttonCount : 8,
},
}

const _templates = {
    buttonData: [
        '<li><button id="{1}" type="button" name="settings">{0}</button></li>'
    ],
}

const _buttons = [
    { id: 'idDispense', caption: 'Dispense', value: 'dispenseCall' },
    { id: 'idCollect', caption: 'Collect', value: 'dispenseCall'},
    { id: 'idNRT', caption: 'Note Removal Alert', value: 'alarmOptionSetCall'},
    { id: 'idQBB', caption: 'Quick Bill Bundle', value: 'quickBillCall'},
    { id: 'idSNR', caption: 'SNR Level', value: 'snrLevelCall'},
    { id: 'idEM', caption: 'Encryption Mode', value: 'encryptionModeCall'},
    { id: 'idRsnr', caption: 'Robbery SNR', value: 'lastSnrDataCall'},
    { id: 'idSingle', caption: 'Single heartbeat', value: 'singleHeartbeatCall'},
    { id: 'idAuto', caption: 'Auto Shutdown', value: 'autoShutDownModeCall'},
    { id: 'idHide', caption: 'Hide Inventory', value: 'hideInventoryCall'},
    { id: 'idSaver', caption: 'Screen Saver', value: 'screenSaverModeCall'},
    { id: 'idLogo', caption: 'Screen Logo', value: 'screenSaverLogoCall'},
    { id: 'idMail', caption: 'LogMailSend', value: 'logMailSendCall'},
]

const tcrDraw = () => {
    tcrDrawPage()
}

const tcrDrawPage = () => {
    const buttonHtml = []
    $('#idTabInfo').html(`<span>${_props.state.pageIndex}</span>/2`)
    $('#idTabPrev').attr('disabled', _props.state.pageIndex <= 1 ? true : false)
    $('#idTabNext').attr('disabled', _props.state.pageIndex >= 2 ? true : false)

    let idx = (_props.state.pageIndex -1) * _props.state.buttonCount
    let count = idx ? _buttons.length : _props.state.buttonCount
    for (idx; idx < count; idx++) {
        buttonHtml.push(_templates.buttonData.toText().format(_buttons[idx].caption, _buttons[idx].id))
    }
    $('div.menu-select > ul').html(buttonHtml.toText())
    $('button[name="settings"]').on('click', onTcrButtonClick)
}

function onTCREventListener(data) {
    _props.data = Object.assign(_props.data, data)
    _props.state.pageIndex = 1
    _props.state.buttonIndex = 0
    data?.screen_name && tcrDraw()
}

const onTCRPageButtonClick = (event) => {
    let updated = false
    if (event?.target?.id == 'idTabPrev') {
        if (_props.state.pageIndex > 1) {
            _props.state.pageIndex--
            _props.state.buttonIndex = 0
            updated = true
        }
    } else if (event?.target?.id == 'idTabNext') {
        if (_props.state.pageIndex < 2) {
            _props.state.pageIndex++
            _props.state.buttonIndex = _props.state.pageCount
            updated = true
        }
    }
    updated && tcrDrawPage()
}


const onTcrButtonClick = (event) => {
    event.preventDefault()

    const button = _buttons.find(b => b.id == event.target.id)
    tcrCommonSendSideButtonEvent(button?.value || '')
}

const onTcrSideBackButtonClick = name => tcrCommonSendSideButtonEvent(name) 

const onTCRLoad = () => {
    $('#idTabPrev').on('click', onTCRPageButtonClick)
    $('#idTabNext').on('click', onTCRPageButtonClick)
}