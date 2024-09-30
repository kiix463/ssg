const _props = {
    data: {},
}

const _inputMap = [
    { inputId: 'textvalue1', elId: 'idMachineName' },
    { inputId: 'textvalue2', elId: 'idModelName' },
    { inputId: 'textvalue3', elId: 'idHWSN' },
    { inputId: 'textvalue4', elId: 'idInstallDate' },
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
    $('#idMachineName').focus()
    tcrKeybrdOpen()
}

const onTcrButtonConfirmClick = (event) => {
    event.preventDefault()

    tcrCommonSendSideButtonEvent('Confirm', {
        textValue1: $('#idMachineName').val(),
        textValue2: $('#idModelName').val(),
        textValue3: $('#idHWSN').val(),
        textValue4: $('#idInstallDate').val(),
    })
}

