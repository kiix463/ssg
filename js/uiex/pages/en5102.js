const _props = {
    data: {},
}

const tcrDraw = () => {
    const selData = _props.data.menu
    const buttonsVal = selData.checkbox

    buttonsVal.forEach(button => {
        switch(button.option_id) {
            case 'checkbox1':
                $('#con-01').prop('checked', !!button.option_selected)
                $("label[for='con-01']").text(button.option_value)
                break
            case 'checkbox2':
                $('#con-02').prop('checked', !!button.option_selected)
                $("label[for='con-02']").text(button.option_value)
                break
            case 'checkbox3':
                $('#con-03').prop('checked', !!button.option_selected)
                $("label[for='con-03']").text(button.option_value)
                break
            case 'checkbox4':
                $('#con-04').prop('checked', !!button.option_selected)
                $("label[for='con-04']").text(button.option_value)
                break
            case 'checkbox5':
                $('#con-05').prop('checked', !!button.option_selected)
                $("label[for='con-05']").text(button.option_value)
                break
            case 'checkbox6':
                $('#con-06').prop('checked', !!button.option_selected)
                $("label[for='con-06']").text(button.option_value)
                break
            case 'checkbox7':
                $('#con-07').prop('checked', !!button.option_selected)
                $("label[for='con-07']").text(button.option_value)
                break                              
        }
    })
}

const tcrSendSideButtonEvent = (button) => {
    const buttonsVal = _props.data.menu.checkbox

    var retData = []

    $('#con-01').is(":checked") && retData.push({
        "option_id" : buttonsVal[0].option_id, 
        "option_value" : buttonsVal[0].option_value
    })
    
    $('#con-02').is(":checked") && retData.push({
        "option_id" : buttonsVal[1].option_id, 
        "option_value" : buttonsVal[1].option_value
    })

    $('#con-03').is(":checked") && retData.push({
        "option_id" : buttonsVal[2].option_id, 
        "option_value" : buttonsVal[2].option_value
    })
    
    $('#con-04').is(":checked") && retData.push({
        "option_id" : buttonsVal[3].option_id, 
        "option_value" : buttonsVal[3].option_value
    })

    $('#con-05').is(":checked") && retData.push({
        "option_id" : buttonsVal[4].option_id, 
        "option_value" : buttonsVal[4].option_value
    })

    $('#con-06').is(":checked") && retData.push({
        "option_id" : buttonsVal[5].option_id, 
        "option_value" : buttonsVal[5].option_value
    })
    
    $('#con-07').is(":checked") && retData.push({
        "option_id" : buttonsVal[6].option_id, 
        "option_value" : buttonsVal[6].option_value
    })
    
    tcrCommonSendSideButtonEvent(button, retData)
}


const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)
    data.menu && tcrDraw()
}