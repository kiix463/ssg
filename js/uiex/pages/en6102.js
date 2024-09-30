const onTcrButtonClick = name => tcrCommonSendButtonEvent(name)
const onTcrSideButtonClick = name => tcrCommonSendSideButtonEvent(name)

const onTCREventListener = () => {
}

const onTCRDocumentReady = () => {
    $('#idID').focus()
    tcrKeybrdOpen()
}

const onTcrButtonOkClick = (event) => {
    event.preventDefault()

    tcrCommonSendSideButtonEvent('Ok', {
        Id: $('#idID').val(),
    })
}

const onTCRLoad = () => {
    $('#idID').focus()
}