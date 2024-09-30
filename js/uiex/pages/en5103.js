const _props = {
    data: {},
    state: {
        focused: false,
        key: false,
        keydown: false,
    }
}

const _templates = {
    autoShutdown: 'Auto shutdown({0})',
    autoRestart: 'Auto restart({0})',
}

const onTCRKeyPressBackSpace = () => {
    const input = $(`#${_props.state.focused}`)
    const start = input?.caret() || 0

    input.focus()
    if (start > 0) {
        input.range(start - 1, start)
        input.range('')
    }
}

const onTCRKeyPressTab = () => {
    const state = _props.state

    state.focused = (state.focused == 'idHour') ? 'idMin' : 'idHour'
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

const _optionMap = [
    { optId: 'radiobutton1', elId: 'con-01', value: 'NoShutDown' },
    { optId: 'radiobutton2', elId: 'con-02', value: 'AutoShutdown' },
    { optId: 'radiobutton3', elId: 'con-03', value: 'AutoRestart' },
]

const tcrDraw = () => {
    const menu = _props.data.menu

    if (menu) {
        if (Array.isArray(menu.textvalues)) {
            const hour = menu.textvalues.find(t => t.option_id == 'textvalue1')
            const minute = menu.textvalues.find(t => t.option_id == 'textvalue2')
            const autoShutdown = menu.textvalues.find(t => t.option_id == 'textvalue3')
            const autoRestart = menu.textvalues.find(t => t.option_id == 'textvalue4')

            $('#idHour').val((hour && hour.option_value) || '')
            $('#idMin').val((minute && minute.option_value) || '')
            $('#idAutoShutdown').html(_templates.autoShutdown.format((autoShutdown && autoShutdown.option_value) || ''))
            $('#idAutoRestart').html(_templates.autoRestart.format((autoRestart && autoRestart.option_value) || ''))
        }

        if (Array.isArray(menu.radiobuttons)) {
            menu.radiobuttons.forEach(r => {
                const found = _optionMap.find(o => o.optId == r.option_id)
                if (found) {
                    const opt = $(`#${found.elId}`)
                    if (opt && (opt.length > 0)) {
                        if ((r.option_selected === true) || (r.option_selected === 'true')) {
                            if (opt.is(':checked') === false) {
                                opt.prop('checked', true)
                            }
                        }
                    }
                }
            })
        }
    }
}

const onTCRLoad = () => {
    $('input[name=inputText]').focus(event => {
        _props.state.focused = event.target.id
    })

    $('#idHour').focus()
}

const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)
    data.menu && tcrDraw()
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
                input.focus()
                input.caret(state.key.value)

                const val = input.val()
                if ($.isNumeric(val)) {
                    const maxVal = input.attr('id') == 'idHour' ? 23 : 59
                    const numVal = Number(val)

                    if (numVal > maxVal) {
                        input.val(`${maxVal}`)
                    }
                } else {
                    input.val('')
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

const onTCRSetWeeklyDailyClick = event => {
    event.preventDefault()

    let radioString = ''
    const selected = $('input:radio[name="con"]:checked')
    if (selected && selected.length > 0) {
        const option = _optionMap.find(o => o.elId == selected[0].id)
        radioString = option?.optId || ''
    }

    const timeString = '{0}:{1}'.format($('#idHour').val(), $('#idMin').val())
    tcrCommonSendSideButtonEvent('SetWeekly/Daily', {
        selected: radioString,
        time: timeString,
    })
}

const onTCRSetTimeClick = event => {
    event.preventDefault()

    let radioString = ''
    let radioValue = ''
    const selected = $('input:radio[name="con"]:checked')
    if (selected && selected.length > 0) {
        const option = _optionMap.find(o => o.elId == selected[0].id)
        radioString = option?.optId || ''
        radioValue = option?.value || ''
    }

    const timeString = '{0}:{1}'.format($('#idHour').val(), $('#idMin').val())
    tcrCommonSendSideButtonEvent(`Set ${timeString}`, {
        id: radioString,
        value: radioValue,
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
        }
    }
}