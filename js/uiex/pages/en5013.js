const _props = {
  data: {},
}

const _templates = {
    version:[
        '<p> {0} </p>'
    ],
}

const tcrDraw = () => {
    const textData = _props.data.menu.textvalues
    const textHtml = []

    if (Array.isArray(textData)) {
        textData.forEach(text=> {
            textHtml.push(_templates.version.toText().format(text.option_value))
        })
        $('div.caution').html(textHtml.toText())
    }
}

const onTcrSideButtonClick = name => tcrCommonSendSideButtonEvent(name)

const onTcrTopButtonClick = () => {
    $('div.caution').scrollTop(0)
}

const onTcrBottomButtonClick = () => {
    $('div.caution').scrollTop($('div.caution')[0].scrollHeight)
}

function onTCREventListener(data) {
  _props.data = Object.assign(_props.data, data)
  data.menu && tcrDraw()
}