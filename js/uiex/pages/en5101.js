const _props = {
    data: {},
}

const tcrDraw = () => {
    const selData = _props.data.menu
    const textVal = selData.textvalues
    const buttonsVal = selData.radiobuttons

    $('#idAvalue').html(textVal[0].option_value)
    $('#idBvalue').html(textVal[1].option_value)

    buttonsVal.forEach(button => {
        switch(button.option_id) {
            case 'radiobutton1':
                $('#con-01').prop('checked', !!button.option_selected)
                break
            case 'radiobutton2':
                $('#con-02').prop('checked', !!button.option_selected)
                break
            case 'radiobutton3':
                $('#con-03').prop('checked', !!button.option_selected)
                break
        }
    })
}

const tcrSendSideButtonEvent = (button) => {
    var retData = []

    if ($('#con-01').is(":checked")) {
        retData = [{
            "option_id" : "radiobutton1",
            "option_value" : "Teller A"
        }]
    } else if ($('#con-02').is(":checked")) {
        retData = [{
            "option_id" : "radiobutton2",
            "option_value" : "Teller B"
        }]
    } else if ($('#con-03').is(":checked")) {
        retData = [{
            "option_id" : "radiobutton3",
            "option_value" : "Both"
        }]
    }

    tcrCommonSendSideButtonEvent(button, retData)
}

const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)
    data.menu && tcrDraw()
}