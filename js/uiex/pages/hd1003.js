const _props = {
    data: {},
    state: {},
}

const _templates = {
    deposit: [
        '<tr>',
        '   <th>{0}</th>',
        '   <td class="text-right">{1}</td>',
        '   <td class="text-right">{2}</td>',
        '</tr>',
    ],
    pos: [
        '<tr>',
        '   <td class="text-right">{0}</td>',
        '</tr>',
    ],
}

const _sideBarButtons = [{
    id: 'idSBBCancel',
    type: 'normal',
    caption: '취소',
    action: { name: 'Cancel', data: {} },
}, {
    id: 'idSBBRollBack',
    type: 'normal',
    caption: '반환',
    action: { name: 'RollBack', data: {} },
}, {
    type: 'none',
}, {
    type: 'none',
}, {
    id: 'idSBBOk',
    type: 'normal',
    caption: '확인',
    action: { name: 'Ok', data: {} },
}]

const tcrDraw = () => {
    tcrDrawClient()
    tcrDrawSideBar()
}

const tcrDrawClient = () => {
    const hdDeposit = _props.data.hd_deposit

    if (Array.isArray(hdDeposit)) {
        const hdDepositHtml = []
        const hdPosHtml = []

        hdDeposit.forEach(item => {
            const totalAmount = Number(item.total.uncomma())
            const posAmount = Number(item.pos.uncomma())
            hdDepositHtml.push(_templates.deposit.toText().format(item.nation, item.total, String(totalAmount - posAmount).comma()))
            hdPosHtml.push(_templates.pos.toText().format(item.pos))
        })

        $('table.table-report.black > tbody').html(hdDepositHtml.toText())
        $('table.table-report.blue > tbody').html(hdPosHtml.toText())
    }
}

const tcrDrawSideBar = () => {
    tcrCommonDrawSideButtons($('.side-bar > ul'), 0, _sideBarButtons, {})

    $('#idSBBTotalInventory').attr('disabled', true)
}

const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)
    data.hd_deposit && tcrDraw()
}
