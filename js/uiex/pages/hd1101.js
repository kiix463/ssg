const _props = {
    data: {},
    state: {},
    changeValues: {},
    focused: 0,
    changeTotal: 0,
}

const _templates = {
    changeId: 'note{0}_change',
    changeValue: '{0}<span class="fc-blue">매</span>',
    change: [
        '<tr>',
        '   <th>{0}</th>',
        '   <td class="text-right">{1}<span class="fc-blue">매</span></td>',
        '   <td id="{3}" class="text-right" name="changeValue" onClick="onTcrChangeValueClick({4})">{2}<span class="fc-blue">매</span></td>',
        '</tr>',
    ],
    totalAmount: [
        '<span>{0}</span>{1}',
    ],
}

const _sideBarButtons = [{
    id: 'idSBBCancel',
    type: 'normal',
    caption: '취소',
    action: { name: 'Back', data: {} },
}, {
    type: 'none',
}, {
    type: 'none',
}, {
    type: 'none',
}, {
    id: 'idSBBOk',
    type: 'normal',
    caption: '확인',
    action: () => {
        const hdChange = _props.data.hd_change
        const hdResult = {
            row_count: 0,
            denom_info: [],
            totalAmount: '',
        }

        if (hdChange && Array.isArray(hdChange.denom_info)) {
            hdChange.denom_info.forEach((note, index) => {
                hdResult.denom_info.push({
                    index: index + 1,
                    denom: note.denom,
                    count: _props.changeValues[index + 1],
                })
            })

            hdResult.row_count = hdChange.denom_info.length
            hdResult.totalAmount = `$${_props.changeTotal}`
        }

        return {
            name: 'Ok',
            data: hdResult
        }
    },
}]

const tcrDraw = () => {
    tcrDrawClient()
    tcrDrawSideBar()
}

const tcrDrawClient = () => {
    const hdChange = _props.data.hd_change
    if (hdChange) {
        _props.changeValues = {}
        _props.changeTotal = 0

        const denomInfo = hdChange.denom_info
        const totalAmount = hdChange.total_amount
        const changeValues = _props.changeValues

        if (Array.isArray(denomInfo)) {
            const denomHtml = []
            denomInfo.forEach((item, index) => {
                const idx = index + 1
                changeId = _templates.changeId.format(idx)

                changeValues[idx] = 0
                denomHtml.push(_templates.change.toText().format(`${hdChange.monetary_unit}${item.denom}`, item.count, changeValues[idx], changeId, idx))
            })

            $('table.table-report.black > tbody').html(denomHtml.toText())
            _props.focused = denomInfo.length > 0 ? 1 : 0

            tcrDrawSelected()
        }

        if (totalAmount) {
            const totalHtml = []
            totalHtml.push(_templates.totalAmount.toText().format(hdChange.monetary_unit, totalAmount.toCache()))

            $('#idTotalAmount').html(totalHtml.toText())
        }

        const reqTotalHtml = []
        reqTotalHtml.push(_templates.totalAmount.toText().format(hdChange.monetary_unit, 0))
        $('#idReqTotalAmount').html(reqTotalHtml.toText())
    }
}

const tcrDrawSideBar = () => {
    tcrCommonDrawSideButtons($('.side-bar > ul'), 0, _sideBarButtons, {})

    $('#idSBBTotalInventory').attr('disabled', true)
}

const tcrDrawChangeValue = () => {
    const changeId = _templates.changeId.format(_props.focused)
    if ($(`#${changeId}`).length) {
        $(`#${changeId}`).html(_templates.changeValue.format(_props.changeValues[_props.focused]))

        const hdChange = _props.data.hd_change
        let totalAmount = 0

        hdChange.denom_info.forEach((item, index) => {
            totalAmount += _props.changeValues[index + 1] * item.denom.toCache()
        })

        _props.changeTotal = totalAmount

        const totalHtml = []
        totalHtml.push(_templates.totalAmount.toText().format(hdChange.monetary_unit, totalAmount))
        $('#idReqTotalAmount').html(totalHtml.toText())
    }
}

const tcrDrawSelected = () => {
    const all = $('td[name="changeValue"]')
    if (all && all.length > 0) {
        all.removeClass('active')
    }

    const selId = _templates.changeId.format(_props.focused)
    const selected = $(`#${selId}`)

    if (selected) {
        if (!selected.hasClass('active')) {
            selected.addClass('active')
        }
    }
}

const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)
    data.hd_change && tcrDraw()
}

const onTcrChangeValueClick = (data) => {
    const changeId = _templates.changeId.format(data)

    if ($(`#${changeId}`).length) {
        _props.focused = data
        tcrDrawSelected()
    }
}

const onTCRKeypadClick = (data) => {
    if (_props.focused) {
        let updated = false

        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(data)) {
            const num = Number(data)
            const curValue = _props.changeValues[_props.focused] || 0
            if (curValue < 1000) {
                _props.changeValues[_props.focused] = (curValue * 10) + num
                updated = true
            }
        } else if (data == 'TAB') {
            const hdChange = _props.data.hd_change

            if ((_props.focused > 0) && (_props.focused < hdChange.denom_info.length)) {
                _props.focused++
            } else {
                _props.focused = (hdChange.denom_info.length > 0) ? 1 : 0
            }

            tcrDrawSelected()
        } else if (data == 'DEL') {
            const curValue = _props.changeValues[_props.focused] || 0
            _props.changeValues[_props.focused] = Math.trunc(curValue / 10)
            updated = true
        }

        if (updated) {
            tcrDrawChangeValue()
        }
    }
}

const onTCRLoad = () => {
    $('#idKeypadDel').longClick(tcrKeypadClearAll, 1500)
}

const tcrKeypadClearAll = () => {
    _props.changeValues[_props.focused] = 0
    tcrDrawChangeValue()
}