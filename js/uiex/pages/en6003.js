const _props = {
    data: {},
}

const _inputMap = [
    { inputId: 'textvalue1', elId: 'idID' },
    { inputId: 'textvalue2', elId: 'idPW' },
]

const onTcrButtonClick = name => tcrCommonSendButtonEvent(name)
const onTcrSideButtonClick = name => tcrCommonSendSideButtonEvent(name)

const tcrDraw = () => {
    const menu = _props.data.menu

    if (menu && Array.isArray(menu.textvalues)) {
        menu.textvalues.forEach(m => {
            const item = _inputMap.find(i => i.inputId == m.option_id)
            if (item) {
                const input = $(`#${item.elId}`)
                if (input && input.length > 0) {
                    input.val(m.option_value || '')
                }
            }
        });
    }
}

const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)
    data.menu && tcrDraw()
}

const onTCRDocumentReady = () => {
    $('#idID').focus()
    tcrKeybrdOpen()
}

const onTCRLoginClick = event => {
    event.preventDefault()

    tcrCommonSendSideButtonEvent('Log In', {
        Id: $('#idID').val(),
        Pw: $('#idPW').val(),
    })
}


