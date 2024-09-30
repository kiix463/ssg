const _props = {
    data: {},
}

const tcrDraw = () => {
    const barcode = _props.data.hd_barcode_result

    if (barcode) {
        $('#idEmployeeNumber').val(barcode.employee_number || '')
        $('#idPosNumber').val(barcode.pos_number || '')
    }
}

const onTCRLoad = () => {
}

const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)
    data.hd_barcode_result && tcrDraw()
}
