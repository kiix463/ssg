const _keybrdProps = {
    state: {
        mode: 0,
        caps: false,
        focused: false,
        key: false,
        keydown: false,
    },
}

const _keybrdModeLetter = 'letter'
const _keybrdModeSymbol = 'symbol'

const _keybrdModes = [
    { type: _keybrdModeLetter, text: '.,?123' },
    { type: _keybrdModeSymbol, text: 'ABC' },
]

const _keybrdTemplates = {
    all: [
        '<div name="keybrdFrame" class="key-board">',
        '   <div name="keybrdFrame" class="key-list">',
        '        <button id="idKeybrdQ" name="keybrdButton", type="button">q</button>',
        '        <button id="idKeybrdW" name="keybrdButton", type="button">w</button>',
        '        <button id="idKeybrdE" name="keybrdButton", type="button">e</button>',
        '        <button id="idKeybrdR" name="keybrdButton" type="button">r</button>',
        '        <button id="idKeybrdT" name="keybrdButton" type="button">t</button>',
        '        <button id="idKeybrdY" name="keybrdButton" type="button">y</button>',
        '        <button id="idKeybrdU" name="keybrdButton" type="button">u</button>',
        '        <button id="idKeybrdI" name="keybrdButton" type="button">i</button>',
        '        <button id="idKeybrdO" name="keybrdButton" type="button">o</button>',
        '        <button id="idKeybrdP" name="keybrdButton" type="button">p</button>',
        '    </div>',
        '    <div name="keybrdFrame" class="key-list">',
        '        <button id="idKeybrdA" name="keybrdButton" type="button">a</button>',
        '        <button id="idKeybrdS" name="keybrdButton" type="button">s</button>',
        '        <button id="idKeybrdD" name="keybrdButton" type="button">d</button>',
        '        <button id="idKeybrdF" name="keybrdButton" type="button">f</button>',
        '        <button id="idKeybrdG" name="keybrdButton" type="button">g</button>',
        '        <button id="idKeybrdH" name="keybrdButton" type="button">h</button>',
        '        <button id="idKeybrdJ" name="keybrdButton" type="button">j</button>',
        '        <button id="idKeybrdK" name="keybrdButton" type="button">k</button>',
        '        <button id="idKeybrdL" name="keybrdButton" type="button">l</button>',
        '    </div>',
        '    <div name="keybrdFrame" class="key-list">',
        '        <button id="idKeybrdCaps" name="keybrdButton" type="button" class="side">',
        '            <svg id="idKeybrdCaps2" name="keybrdButton" width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '                <path id="idKeybrdCaps3" name="keybrdButton" d="M6 1.5L6 16.5" stroke="#686868" stroke-width="2" stroke-linecap="round"/>',
        '                <path id="idKeybrdCaps4" name="keybrdButton" d="M11 6L6 1L1 6" stroke="#686868" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
        '            </svg>',
        '        </button>',
        '        <button id="idKeybrdZ" name="keybrdButton" type="button">z</button>',
        '        <button id="idKeybrdX" name="keybrdButton" type="button">x</button>',
        '        <button id="idKeybrdC" name="keybrdButton" type="button">c</button>',
        '        <button id="idKeybrdV" name="keybrdButton" type="button">v</button>',
        '        <button id="idKeybrdB" name="keybrdButton" type="button">b</button>',
        '        <button id="idKeybrdN" name="keybrdButton" type="button">n</button>',
        '        <button id="idKeybrdM" name="keybrdButton" type="button">m</button>',
        '        <button id="idKeybrdBackspace" name="keybrdButton" type="button" class="side">',
        '            <svg id="idKeybrdBackspace2" name="keybrdButton" width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '                <path id="idKeybrdBackspace3" name="keybrdButton" fill-rule="evenodd" clip-rule="evenodd" d="M20.0133 2H7.02769L2 8.49999L7.02769 15L20.0133 15V2ZM7.02769 0L22.0133 1.74046e-05L22.0132 17H7.02769C6.40863 17 5.82446 16.7133 5.4457 16.2236L0.418014 9.72364C-0.139338 9.00307 -0.139338 7.99691 0.418015 7.27634L5.4457 0.776349C5.82446 0.286677 6.40863 0 7.02769 0Z" fill="#686868"/>',
        '                <path id="idKeybrdBackspace4" name="keybrdButton" fill-rule="evenodd" clip-rule="evenodd" d="M15.9545 6.68791C16.3345 6.28706 16.3175 5.65412 15.9167 5.2742C15.5158 4.89428 14.8829 4.91125 14.5029 5.3121L12.6855 7.22961L10.8681 5.3121C10.4882 4.91125 9.85529 4.89428 9.45444 5.2742C9.05359 5.65412 9.03663 6.28706 9.41655 6.68791L11.3078 8.6833L9.41483 10.6805C9.03491 11.0814 9.05187 11.7143 9.45272 12.0942C9.85357 12.4741 10.4865 12.4572 10.8664 12.0563L12.6855 10.137L14.5047 12.0563C14.8846 12.4572 15.5175 12.4741 15.9184 12.0942C16.3192 11.7143 16.3362 11.0814 15.9563 10.6805L14.0633 8.6833L15.9545 6.68791Z" fill="#686868"/>',
        '            </svg>',
        '        </button>',
        '    </div>',
        '    <div name="keybrdFrame" class="key-list">',
        '        <button id="idKeybrdToggle" name="keybrdButton" type="button" class="side">.,?123</button>',
        '        <button id="idKeybrdSpace" name="keybrdButton" type="button">',
        '            <svg id="idKeybrdSpace2" name="keybrdButton" width="23" height="5" viewBox="0 0 23 5" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '                <path id="idKeybrdSpace3" name="keybrdButton" fill-rule="evenodd" clip-rule="evenodd" d="M0 0V5H2H21H22H23V0H21V3H2V0H0Z" fill="#686868"/>',
        '            </svg>',
        '        </button>',
        '        <button id="idKeybrdEnter" name="keybrdButton" type="button" class="side">',
        '            <svg id="idKeybrdEnter2" name="keybrdButton" width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '                <path id="idKeybrdEnter3" name="keybrdButton" fill-rule="evenodd" clip-rule="evenodd" d="M16.75 0C17.3023 0 17.75 0.447715 17.75 1V7C17.75 7.55228 17.3023 8 16.75 8C16.7077 8 16.6659 7.99737 16.625 7.99226C16.5841 7.99737 16.5423 8 16.5 8L3.66421 8L4.70711 9.04289C5.09763 9.43342 5.09763 10.0666 4.70711 10.4571C4.31658 10.8476 3.68342 10.8476 3.29289 10.4571L0.292893 7.45711C-0.0976311 7.06658 -0.0976311 6.43342 0.292893 6.04289L3.29289 3.04289C3.68342 2.65237 4.31658 2.65237 4.70711 3.04289C5.09763 3.43342 5.09763 4.06658 4.70711 4.45711L3.16421 6L15.75 6V1C15.75 0.447715 16.1977 0 16.75 0Z" fill="#686868"/>',
        '            </svg>',
        '        </button>',
        '    </div>',
        '</div>',
    ],
}

const tcrKeybrdGetChar = (key) => {
    const state = _keybrdProps.state

    let ch = false
    switch (_keybrdModes[state.mode]?.type) {
        case _keybrdModeLetter:
            if (state.caps) {
                ch = ((key.values.length > 1) && key.values[1])
            } else {
                ch = ((key.values.length > 0) && key.values[0])
            }
            break

        case _keybrdModeSymbol:
            ch = ((key.values.length > 2) && key.values[2])
            break
    }

    return ch
}

const tcrKeybrdUpdateKeyChar = () => {
    const state = _keybrdProps.state
    switch (_keybrdModes[state.mode]?.type) {
        case _keybrdModeSymbol:
            $('#idKeybrdN').remove()
            $('#idKeybrdM').remove()
            break

        case _keybrdModeLetter:
            if (!($('#idKeybrdN') && ($('#idKeybrdN').length > 0))) {
                $('#idKeybrdB').after('        <button id="idKeybrdN" name="keybrdButton" type="button">n</button>')
            }

            if (!($('#idKeybrdM') && ($('#idKeybrdM').length > 0))) {
                $('#idKeybrdB').after('        <button id="idKeybrdM" name="keybrdButton" type="button">m</button>')
            }
            break
    }

    const btnList = $('button[name="keybrdButton"]')
    for (let i = 0; i < btnList.length; i++) {
        const btn = btnList[i]
        const key = _keybrdMapper.find(k => k.id == btn.id)

        if (key?.changable) {
            const ch = tcrKeybrdGetChar(key)
            $(btn).html(ch || '')
        }
    }
}

const tcrKeybrdCapsPress = () => {
    const state = _keybrdProps.state

    state.caps = !state.caps
    state.caps ? $('#idKeybrdCaps').addClass('active') : $('#idKeybrdCaps').removeClass('active')

    tcrKeybrdUpdateKeyChar()
}

const tcrKeybrdTogglePress = () => {
    const state = _keybrdProps.state
    state.mode = (state.mode < (_keybrdModes.length - 1)) ? state.mode + 1 : 0
    _keybrdModes[state.mode] && $('#idKeybrdToggle').html(_keybrdModes[state.mode].text)

    tcrKeybrdUpdateKeyChar()
}

const tcrKeybrdBackspacePress = () => {
    const state = _keybrdProps.state
    const focused = $(':focus')

    state.focused = (focused?.length > 0) && (focused[0].nodeName == 'INPUT') && focused
    if (state.focused) {
        const start = state.focused?.caret() || 0
        if (start > 0) {
            state.focused.range(start - 1, start)
            state.focused.range('')
        }
    }
}

const _keybrdMapper = [
    { id: 'idKeybrdQ', values: ['q', 'Q', '1'], changable: true },
    { id: 'idKeybrdW', values: ['w', 'W', '2'], changable: true },
    { id: 'idKeybrdE', values: ['e', 'E', '3'], changable: true },
    { id: 'idKeybrdR', values: ['r', 'R', '4'], changable: true },
    { id: 'idKeybrdT', values: ['t', 'T', '5'], changable: true },
    { id: 'idKeybrdY', values: ['y', 'Y', '6'], changable: true },
    { id: 'idKeybrdU', values: ['u', 'U', '7'], changable: true },
    { id: 'idKeybrdI', values: ['i', 'I', '8'], changable: true },
    { id: 'idKeybrdO', values: ['o', 'O', '9'], changable: true },
    { id: 'idKeybrdP', values: ['p', 'P', '0'], changable: true },
    { id: 'idKeybrdA', values: ['a', 'A', '-'], changable: true },
    { id: 'idKeybrdS', values: ['s', 'S', '/'], changable: true },
    { id: 'idKeybrdD', values: ['d', 'D', ':'], changable: true },
    { id: 'idKeybrdF', values: ['f', 'F', ';'], changable: true },
    { id: 'idKeybrdG', values: ['g', 'G', '('], changable: true },
    { id: 'idKeybrdH', values: ['h', 'H', ')'], changable: true },
    { id: 'idKeybrdJ', values: ['j', 'J', '$'], changable: true },
    { id: 'idKeybrdK', values: ['k', 'K', '@'], changable: true },
    { id: 'idKeybrdL', values: ['l', 'L', '"'], changable: true },
    { id: 'idKeybrdZ', values: ['z', 'Z', '.'], changable: true },
    { id: 'idKeybrdX', values: ['x', 'X', ','], changable: true },
    { id: 'idKeybrdC', values: ['c', 'C', '?'], changable: true },
    { id: 'idKeybrdV', values: ['v', 'V', '!'], changable: true },
    { id: 'idKeybrdB', values: ['b', 'B', "'"], changable: true },
    { id: 'idKeybrdN', values: ['n', 'N', ''], changable: true },
    { id: 'idKeybrdM', values: ['m', 'M', ''], changable: true },
    { id: 'idKeybrdSpace', values: [' ', ' ', ' '] },
    { id: 'idKeybrdSpace2', values: [' ', ' ', ' '] },
    { id: 'idKeybrdSpace3', values: [' ', ' ', ' '] },
    { id: 'idKeybrdBackspace', action: tcrKeybrdBackspacePress },
    { id: 'idKeybrdBackspace2', action: tcrKeybrdBackspacePress },
    { id: 'idKeybrdBackspace3', action: tcrKeybrdBackspacePress },
    { id: 'idKeybrdBackspace4', action: tcrKeybrdBackspacePress },
    { id: 'idKeybrdEnter', values: ["\n", "\n", "\n"] },
    { id: 'idKeybrdEnter2', values: ["\n", "\n", "\n"] },
    { id: 'idKeybrdEnter3', values: ["\n", "\n", "\n"] },
    { id: 'idKeybrdCaps', action: tcrKeybrdCapsPress },
    { id: 'idKeybrdCaps2', action: tcrKeybrdCapsPress },
    { id: 'idKeybrdCaps3', action: tcrKeybrdCapsPress },
    { id: 'idKeybrdCaps4', action: tcrKeybrdCapsPress },
    { id: 'idKeybrdToggle', action: tcrKeybrdTogglePress },
]

const tcrKeybrdOpen = () => {
    $('#contents').append(_keybrdTemplates.all.toText())

    $('button[name="keybrdButton"]').on('mousedown', onTcrKeybrdButtonDown)
    $('button[name="keybrdButton"]').on('mouseup', onTcrKeybrdButtonUp)
    $('button[name="keybrdButton"]').on('mouseout', onTcrKeybrdButtonOut)

    $('div[name="keybrdFrame"]').on('mousedown', onTcrKeybrdFrameDown)
    $('div[name="keybrdFrame"]').on('mouseup', onTcrKeybrdFrameUp)
    $('div[name="keybrdFrame"]').on('mouseout', onTcrKeybrdFrameOut)

    $("#idKeybrdBackspace").longClick(tcrKeybrdClearAll, 1500)
}

const tcrKeybrdClose = () => {
    $('.key-board').remove()
}

const tcrKeybrdClearAll = () => {
    const state = _keybrdProps.state
    state.focused && state.focused.val('')
}

const tcrKeybrdKeyPress = key => {
    if (Array.isArray(key?.values) && (key.values.length > 0)) {
        const state = _keybrdProps.state

        if (state.mode < _keybrdModes.length) {
            const ch = tcrKeybrdGetChar(key)
            ch && state.focused.caret(ch)
        }
    }
}

const tcrKeybrdReset = () => {
    const state = _keybrdProps.state

    if (state.keydown) {
        state.focused && state.focused.focus()
        state.focused = false
        state.key = false
        state.keydown = false
    }
}

const onTcrKeybrdButtonDown = event => {
    event.preventDefault()

    const state = _keybrdProps.state
    const focused = $(':focus')

    state.focused = (focused?.length > 0) && (focused[0].nodeName == 'INPUT') && focused
    state.key = _keybrdMapper.find(k => k?.id == event?.target?.id)
    state.keydown = true

    if (state.key) {
        (typeof state.key.action == 'function') && state.key.action()

        if (state.focused && Array.isArray(state.key.values) && (state.key.values.length > 0)) {
            tcrKeybrdKeyPress(state.key)
        }
    }

    state.key = false
}

const onTcrKeybrdButtonUp = event => {
    event.preventDefault()
    tcrKeybrdReset()
}

const onTcrKeybrdButtonOut = event => {
    // event.preventDefault()
    // tcrKeybrdReset()
}

const onTcrKeybrdFrameDown = event => {
    event.preventDefault()

    const state = _keybrdProps.state
    const focused = $(':focus')

    state.focused = (focused?.length > 0) && (focused[0].nodeName == 'INPUT') && focused
    state.keydown = true
}

const onTcrKeybrdFrameUp = event => {
    event.preventDefault()
    tcrKeybrdReset()
}

const onTcrKeybrdFrameOut = event => {
    // event.preventDefault()
    // tcrKeybrdReset()
}