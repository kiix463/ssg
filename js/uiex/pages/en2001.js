const _props = {
    data: {},
    state: {
        auditResultMode: false,
    },
}

const _templates = {
    cstId: 'idCst{0}{1}',
    cst: [
        '<dl id="{0}" class="{1}" onclick=onTcrCstClick("{0}")>',
        '   <dt>{2}</dt>',
        '   <dd>{3}</dd>',
        '</dl>',
    ],
}

const _cstStatus = {
    normal: 'succe',
    fail: 'fail',
    success: 'not',
    selected: 'select',
}

const tcrSetStatusAll = (status) => {
    const cstInfo = _props.data?.cst_info
    if (Array.isArray(cstInfo)) {
        cstInfo.forEach(cst => {
            const cstType = cst[`cst_${cst.cst_name}_type`]
            if ((cstType == 1) || (cstType == 2)) {
                const cstUpperId = _templates.cstId.format(cst['column_index'] || 0, 'upper')
                const cstUpperEl = $(`#${cstUpperId}`)
                cstUpperEl && cstUpperEl.attr('class', status)
            }

            if (cstType == 2) {
                const cstLowerId = _templates.cstId.format(cst['column_index'] || 0, 'lower')
                const cstLowerEl = $(`#${cstLowerId}`)
                cstLowerEl && cstLowerEl.attr('class', status)
            }
        })
    }
}

const tcrAuditResultReset = () => {
    if (_props.state.auditResultMode) {
        tcrSetStatusAll(_cstStatus.normal)
    }

    _props.state.auditResultMode = false
}

const tcrDraw = () => {
    _props.data?.cst_info && tcrDrawCassttes()
    _props.data?.selfaudit_result && tcrDrawAuditResult()
}

const tcrDrawCassttes = () => {
    const cstInfo = _props.data?.cst_info

    if (Array.isArray(cstInfo)) {
        const cstHtml = []

        cstInfo.forEach(cst => {
            const cstType = cst[`cst_${cst.cst_name}_type`]
            const cstEquip = cst[`cst_${cst.cst_name}_equip`]
            const cstLower = cst[`cst_${cst.cst_name}_lower`]
            const cstUpper = cst[`cst_${cst.cst_name}_upper`]
            const cstIndex = cst['column_index'] || 0

            if (cstType == 1) {
                const id = _templates.cstId.format(cstIndex, 'upper')
                cstHtml.push(_templates.cst.toText().format(id, _cstStatus.normal, cstUpper?.denom || '', cstUpper?.nearend || ''))
            } else if (cstType == 2) {
                const idUpper = _templates.cstId.format(cstIndex, 'upper')
                const idLower = _templates.cstId.format(cstIndex, 'lower')
                cstHtml.push([
                    '<div class="half">',
                    _templates.cst.toText().format(idUpper, _cstStatus.normal, cstUpper?.denom || '', cstUpper?.nearend || ''),
                    _templates.cst.toText().format(idLower, _cstStatus.normal, cstLower?.denom || '', cstLower?.nearend || ''),
                    '</div>',
                ].toText())
            }
        })
        $('div.audit-view').html(cstHtml.toText())
    }
}

const tcrDrawAuditResult = () => {
    const cstAuditResult = _props.data?.selfaudit_result

    if (Array.isArray(cstAuditResult)) {
        cstAuditResult.forEach(cst => {
            const id = _templates.cstId.format(cst['column_index'] || '0', cst.position)
            const cstEl = $(`#${id}`)

            cstEl && cstEl.attr('class', cst.result ? _cstStatus.success : _cstStatus.fail)
        })
    }
}

const onTcrCstClick = (id) => {
    tcrAuditResultReset()

    const cstEl = $(`#${id}`)
    cstEl && cstEl.attr('class', (cstEl.attr('class') == _cstStatus.selected) ? _cstStatus.normal : _cstStatus.selected)
}

const onTcrSelectAllClick = () => {
    tcrAuditResultReset()
    tcrSetStatusAll(_cstStatus.selected)
}

const onTcrDeselectAllClick = () => {
    tcrAuditResultReset()
    tcrSetStatusAll(_cstStatus.normal)
}

const onTcrBackClick = () => {
    tcrCommonSendSideButtonEvent('Back')
}

const onTcrStartClick = () => {
    const cstSelList = []
    const cstInfo = _props.data?.cst_info
    if (Array.isArray(cstInfo)) {
        cstInfo.forEach(cst => {
            const cstType = cst[`cst_${cst.cst_name}_type`]
            if ((cstType == 1) || (cstType == 2)) {
                const cstUpperId = _templates.cstId.format(cst['column_index'] || 0, 'upper')
                const cstUpperEl = $(`#${cstUpperId}`)
                if (cstUpperEl && cstUpperEl.attr('class') == _cstStatus.selected) {
                    cstSelList.push(`cst${cst['column_index']}-1`)
                }
            }

            if (cstType == 2) {
                const cstLowerId = _templates.cstId.format(cst['column_index'] || 0, 'lower')
                const cstLowerEl = $(`#${cstLowerId}`)
                if (cstLowerEl && cstLowerEl.attr('class') == _cstStatus.selected) {
                    cstSelList.push(`cst${cst['column_index']}-2`)
                }
            }
        })
    }

    tcrCommonSendSideButtonEvent('Start', cstSelList)
}

const onTCREventListener = (data) => {
    if (!data?.selfaudit_result && _props.data?.selfaudit_result) {
        _props.data.selfaudit_result = null
    }

    _props.data = Object.assign(_props.data, data)
    !!(data?.cst_info || data?.selfaudit_result) && tcrDraw()

    _props.state.auditResultMode = !!(data?.selfaudit_result)
}