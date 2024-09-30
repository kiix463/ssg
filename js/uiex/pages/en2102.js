const _props = {
    data: {},
}

const tcrDraw = () => {
    const buttonsVal = _props.data.menu.radiobuttons

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
            case 'radiobutton4':
                $('#con-04').prop('checked', !!button.option_selected)
                break
        }
    })
}

const tcrSendSideButtonEvent = (button) => {
    var retData = []

    if ($('#con-01').is(":checked")) {
        retData = [{ 
            "option_id" : "radiobutton1", 
            "option_value" : "mxn"
        }]
    } else if ($('#con-02').is(":checked")) {
        retData = [{ 
            "option_id" : "radiobutton2", 
            "option_value" : "usd"
        }]
    } else if ($('#con-03').is(":checked")) {
        retData = [{ 
            "option_id" : "radiobutton3", 
            "option_value" : "cad"
        }]
    } else if ($('#con-04').is(":checked")) {
        retData = [{ 
            "option_id" : "radiobutton4", 
            "option_value" : "eur"
        }]
    }
    
    tcrCommonSendSideButtonEvent(button, retData)
}

const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)
    data.menu && tcrDraw()
}