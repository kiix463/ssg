const _props = {
    data:[],
}

const tcrDrawText = () => {
    const text = _props.data.menu.textvalues
    if (text) {
        $('#idText').html(text[0].option_value)
    }
}
function onTCREventListener(data) {
    _props.data = Object.assign(_props.data, data)
    tcrDrawText()
}