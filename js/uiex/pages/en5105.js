const _props = {
    data: {},
}

const tcrDraw = () => {
    const selData = _props.data.menu
    const textVal = selData.textvalues
    const buttonsVal = selData.radiobuttons

    $('#idCycle').html(textVal[0].option_value)
    $('#idTime').html(textVal[1].option_value)

    buttonsVal.forEach(button => {
        switch(button.option_id) {
            case 'radiobutton1':
                $('#con-01').prop('checked', !!button.option_selected)
                break
            case 'radiobutton2':
                $('#con-02').prop('checked', !!button.option_selected)
                $("label[for='con-02']").text(button.option_value)
                break
            case 'radiobutton3':
                $('#con-03').prop('checked', !!button.option_selected)
                break
            case 'radiobutton4':
                $('#con-04').prop('checked', !!button.option_selected)
                break
            case 'radiobutton5':
                $('#con-05').prop('checked', !!button.option_selected)
                break
            case 'radiobutton6':
                $('#con-06').prop('checked', !!button.option_selected)
                break
            case 'radiobutton7':
                $('#con-07').prop('checked', !!button.option_selected)
                break
        }
    })
}

const tcrSendSideButtonEvent = (button) => {
    var retData = []
    var optionVal = ''

    if (button == 'Set Weekly')  {
        optionVal = $("input[name='con']:checked").val()

        switch (optionVal) {
            case 'MON':
                retData = [{
                    "option_id" : "radiobutton1",
                    "option_value" : optionVal
                }]
                break
            case 'TUES':
                retData = [{
                    "option_id" : "radiobutton2",
                    "option_value" : optionVal
                }]
                break
            case 'WED':
                retData = [{
                    "option_id" : "radiobutton3",
                    "option_value" : optionVal
                }]
                break
            case 'THURS':
                retData = [{
                    "option_id" : "radiobutton4",
                    "option_value" : optionVal
                }]
                break
            case 'FRI':
                retData = [{
                    "option_id" : "radiobutton5",
                    "option_value" : optionVal
                }]
                break
            case 'SAT':
                retData = [{
                    "option_id" : "radiobutton6",
                    "option_value" : optionVal
                }]
                break
            case 'SUN':
                retData = [{
                    "option_id" : "radiobutton7",
                    "option_value" : optionVal
                }]
                break
        }
    }
    tcrCommonSendSideButtonEvent(button, retData)
}

const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)
    data.menu && tcrDraw()
}