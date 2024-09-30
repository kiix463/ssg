const _props = {
    data: {
        hd_barcode: {
            barcode_string: '',
        },
    },
    state: {
        key: false,
        keydown: false,
    },
}

const _MAX_BARCODE_LENGTH = 17

const onTCRKeyPressBackSpace = () => {
    const barcode = _props.data.hd_barcode

    if (barcode) {
        barcode.barcode_string = barcode.barcode_string.slice(0, -1)
        $('#idBarcode').html(barcode.barcode_string || '')
    }
}

const onTCRKeyPressTab = () => {
    // nothing
}

const _keypad = [
    { id: 'idKey1', value: '1' },
    { id: 'idKey2', value: '2' },
    { id: 'idKey3', value: '3' },
    { id: 'idKey4', value: '4' },
    { id: 'idKey5', value: '5' },
    { id: 'idKey6', value: '6' },
    { id: 'idKey7', value: '7' },
    { id: 'idKey8', value: '8' },
    { id: 'idKey9', value: '9' },
    { id: 'idKey0', value: '0' },
    { id: 'idKeyTAB', action: onTCRKeyPressTab },
    { id: 'idKeyBACK', action: onTCRKeyPressBackSpace },
    { id: 'idKeyBACK2', action: onTCRKeyPressBackSpace },
    { id: 'idKeyBACK3', action: onTCRKeyPressBackSpace },
    { id: 'idKeyBACK4', action: onTCRKeyPressBackSpace },
]

const _optionMap = [
    { optId: 'radiobutton1', elId: 'con-01', value: 'NoScreenSaver' },
    { optId: 'radiobutton2', elId: 'con-02', value: 'EnableScreenSaver' },
]

const tcrDraw = () => {
    const barcode = _props.data.hd_barcode

    if (barcode) {
        $('#idBarcode').html(barcode.barcode_string || '')
    }
}

const onTCRLoad = () => {
}

const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)
    data.hd_barcode && tcrDraw()
}

const onTcrKeypadButtonDown = event => {
    event.preventDefault()

    const state = _props.state
    const barcode = _props.data.hd_barcode

    state.key = _keypad.find(k => k?.id == event?.target?.id)
    state.keydown = true
    if (state.key) {
        if (state.key.value) {
            if (barcode.barcode_string.length < _MAX_BARCODE_LENGTH) {
                barcode.barcode_string = barcode.barcode_string + state.key.value
                $('#idBarcode').html(barcode.barcode_string)
            }
        }

        state.key.action && state.key.action()
    }

    state.key = false
}

const onTcrKeypadButtonUp = event => {
    event.preventDefault()
}

const onTcrKeypadButtonOut = event => {
    event.preventDefault()
}

const onTCRButtonOkClick = event => {
    event.preventDefault()

    const barcode = _props.data.hd_barcode

    tcrCommonSendSideButtonEvent('Ok', {
        barcode_string: barcode.barcode_string || ''
    })
}

const onTCRDocumentReady = () => {
    $('button[name="keypad"]').on('mousedown', onTcrKeypadButtonDown)
    $('button[name="keypad"]').on('mouseup', onTcrKeypadButtonUp)
    $('button[name="keypad"]').on('mouseout', onTcrKeypadButtonOut)

    $('#idKeyBACK').longClick(tcrKeypadClearAll, 1500)
}

const tcrKeypadClearAll = () => {
    const barcode = _props.data.hd_barcode

    barcode.barcode_string = ''
    $('#idBarcode').html(barcode.barcode_string)
}
