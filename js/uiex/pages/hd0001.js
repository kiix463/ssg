const _props = {
    data: {},
  }
  
const tcrDraw = () => {
    const textData = _props.data.menu.textvalues

    if (textData) {
        $('#idTitle').html(textData[0].option_value)
    }
}

function onTCREventListener(data) {
    _props.data = Object.assign(_props.data, data)
    data.menu && tcrDraw()
  }