const _props = {
    data: {},
}

const _templates = {
    trade: [
        '<dl>',
        '   <dt>{0}</dt>',
        '   <dd>{1}<span class="fc-blue">매</span></dd>',
        '   <dd class="amount"><span class="fc-blue">{3}</span>{2}</dd>',
        '</dl>',
    ],
    total: [
        '<dl>',
        '   <dt>총액</dt>',
        '   <dd><span class="fc-blue">{1}</span>{0}</dd>',
        '</dl>',
    ],
}

const tcrDraw = () => {
    tcrDrawTradeInfo()
}

const tcrDrawTradeInfo = () => {
    const tradeInfo = _props.data.trade_info?.trade_info_by_nation
    const note = (Array.isArray(tradeInfo) && (tradeInfo.length > 0)) ? tradeInfo[0].note : false

    if (Array.isArray(note)) {
        const noteHtml = []
        note.forEach(n => {
            noteHtml.push(_templates.trade.toText().format(n.name, n.count, n.amount, tradeInfo[0].monetary_unit))
        })
        $('.cash-list').html(noteHtml.toText())

        const total = note.reduce((a, b) => a + (b.amount || 0), 0)
        $('.cash-view.total-price').html(_templates.total.toText().format(total, tradeInfo[0].monetary_unit))
    }
}

const onTCROnOkClick = () => {
    tcrCommonSendSideButtonEvent('Ok')
}

const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)
    data.trade_info?.trade_info_by_nation && tcrDraw()
}
