const onTcrButtonClick = name => tcrCommonSendButtonEvent(name)
const onTcrSideButtonClick = name => tcrCommonSendSideButtonEvent(name)

const onTCREventListener = () => {
}

const onTCRDocumentReady = () => {
    tcrKeybrdOpen()
}

const onTCRLoad = () => {
    $('#idID').focus()
}

const onTcrButtonOkClick = (event) => {
    event.preventDefault()

    tcrCommonSendSideButtonEvent('Ok', {
        Id: $('#idID').val(),
        Pw: $('#idPW').val(),
        RePw: $('#idREPW').val(),
        role: $('#radio-01').is(':checked') ? 'role1' : 'role2',
    })
}
