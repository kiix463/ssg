const _props = {
    state: {
        focused: false,
        key: false,
        keydown: false,
    },
    data: {}
}

const _templates = {
}

const onTCRKeyPressBackSpace = () => {
    const state = _props.state
    const input = $(`#${state.focused}`)
    const start = input?.caret() || 0

    input.focus()

    const minValue = (state.focused == 'idID') ? 1 : 0
    if (start > minValue) {
        input.range(start - 1, start)
        input.range('')
    }
}

const onTCRKeyPressTab = () => {
    const state = _props.state

    state.focused = (state.focused == 'idID') ? 'idPW' : 'idID'
    $(`#${_props.state.focused}`).focus()
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

const tcrDraw = () => {
}

const onTCRLoad = () => {
    const state = _props.state

    $('input[name=inputText]').focus(event => {
        state.focused = event.target.id
    })

    $('#idID').focus()
    $('#idID').val($('#idKeyD').is(":checked") ? 'D' : 'P')

    $("input[name='radio']:radio").change(onTCRKeyDPChange)
}

const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)
}

const onTCRKeyDPChange = event => {
    event.preventDefault()

    const input = $('#idID')
    const cur = input.caret()
    input.range(0, 1)
    input.range($('#idKeyD').is(":checked") ? 'D' : 'P')
    input.caret(cur)
}

const onTcrKeypadButtonDown = event => {
    event.preventDefault()

    const state = _props.state

    state.key = _keypad.find(k => k?.id == event?.target?.id)
    state.keydown = true

    if (state.key) {
        if (state.focused && state.key.value) {
            const input = $(`#${state.focused}`)
            if (input && (input.length > 0)) {
                let valid = true

                if (state.focused == 'idID') {
                    if (input.caret() <= 0) {
                        input.caret(1)
                    }
                }

                if (state.focused == 'idPW') {
                    valid = $.isNumeric(state.key.value)
                }

                if (valid) {
                    input.focus()
                    input.caret(state.key.value)
                }
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

const onTCRLoginClick = event => {
    event.preventDefault()

    tcrCommonSendSideButtonEvent('Log In', {
        Id: $('#idID').val(),
        Pw: $('#idPW').val(),
    })
}

const onTCRDocumentReady = () => {
    $('button[name="keypad"]').on('mousedown', onTcrKeypadButtonDown)
    $('button[name="keypad"]').on('mouseup', onTcrKeypadButtonUp)
    $('button[name="keypad"]').on('mouseout', onTcrKeypadButtonOut)

    $('#idKeyBACK').longClick(tcrKeypadClearAll, 1500)
}

const tcrKeypadClearAll = () => {
    const state = _props.state

    if (state.focused) {
        const input = $(`#${state.focused}`)
        if (input && (input.length > 0)) {
            input.val('')

            if (state.focused == 'idID') {
                $('#idID').val($('#idKeyD').is(":checked") ? 'D' : 'P')
            }
        }
    }
}

