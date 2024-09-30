const _props = {
    data: {},
}

const _templates = {
    cstId: 'idCst{0}{1}',
    cst: [
        '<dl id="{0}" class="{1}" onclick=onTcrCstClick("{0}")>',
        '   <dt>{2}</dt>',
        '   <dd>{3}</dd>',
        '</dl>',
    ],
    cstOper: [
        '<div class="radio-btn">',
        '   <ul>',
        '       <li><input type="radio" name="radio" class="check-radio" id="radio-01" checked><label for="radio-01">Recycle</label></li>',
        '       <li><input type="radio" name="radio" class="check-radio" id="radio-02"><label for="radio-02">Deposit</label></li>',
        '       <li><input type="radio" name="radio" class="check-radio" id="radio-03"><label for="radio-03">Withdraw</label></li>',
        '   </ul>',
        '</div>',
    ],
}

const _cstStatus = {
    normal: 'succe',
    selected: 'select',
}

const tcrDraw = () => {
    _props.data?.cst_info && tcrDrawCassttes()
}

const tcrDrawCassttes = () => {
    const cstInfo = _props.data?.cst_info

    if (Array.isArray(cstInfo)) {
        const cstHtml = []

        cstHtml.push(_templates.cstOper.toText())

        cstInfo.forEach(cst => {
            const cstType = cst[`cst_${cst.cst_name}_type`]
            const cstEquip = cst[`cst_${cst.cst_name}_equip`]
            const cstLower = cst[`cst_${cst.cst_name}_lower`]
            const cstUpper = cst[`cst_${cst.cst_name}_upper`]
            const cstIndex = cst['column_index'] || 0

            if (cstType == 1) {
                const id = _templates.cstId.format(cstIndex, 'upper')
                const desc = '{0} {1}[{2}]'.format(cst.cst_name, 'upper', (cstUpper?.opertype || '').charAt(0))
                cstHtml.push(_templates.cst.toText().format(id, _cstStatus.normal, cstUpper?.nation || '', desc))
            } else if (cstType == 2) {
                const idUpper = _templates.cstId.format(cstIndex, 'upper')
                const descUpper = '{0} {1}[{2}]'.format(cst.cst_name, 'upper', (cstUpper?.opertype || '').charAt(0))
                const idLower = _templates.cstId.format(cstIndex, 'lower')
                const descLower = '{0} {1}[{2}]'.format(cst.cst_name, 'lower', (cstUpper?.opertype || '').charAt(0))
                cstHtml.push([
                    '<div class="half">',
                    _templates.cst.toText().format(idUpper, _cstStatus.normal, cstUpper?.nation || '', descUpper),
                    _templates.cst.toText().format(idLower, _cstStatus.normal, cstLower?.nation || '', descLower),
                    '</div>',
                ].toText())
            }
        })
        $('div.audit-view').html(cstHtml.toText())
    }
}

const onTcrCstClick = (id) => {
    const cstEl = $(`#${id}`)
    cstEl && cstEl.attr('class', (cstEl.attr('class') == _cstStatus.selected) ? _cstStatus.normal : _cstStatus.selected)
}

const onTcrChangeClick = (nation) => {
    const cstSelList = []
    const cstInfo = _props.data?.cst_info
    if (Array.isArray(cstInfo)) {
        cstInfo.forEach(cst => {
            const cstType = cst[`cst_${cst.cst_name}_type`]
            if ((cstType == 1) || (cstType == 2)) {
                const cstUpperId = _templates.cstId.format(cst['column_index'] || 0, 'upper')
                const cstUpperEl = $(`#${cstUpperId}`)
                if (cstUpperEl && cstUpperEl.hasClass(_cstStatus.selected)) {
                    cstSelList.push(`cst_${cst.cst_name}_upper`)
                }
            }

            if (cstType == 2) {
                const cstLowerId = _templates.cstId.format(cst['column_index'] || 0, 'lower')
                const cstLowerEl = $(`#${cstLowerId}`)
                if (cstLowerEl && cstLowerEl.hasClass(_cstStatus.selected)) {
                    cstSelList.push(`cst_${cst.cst_name}_lower`)
                }
            }
        })
    }

    tcrCommonSendSideButtonEvent(nation, cstSelList)
}

const onTCREventListener = (data) => {
    if (!data?.selfaudit_result && _props.data?.selfaudit_result) {
        _props.data.selfaudit_result = null
    }

    _props.data = Object.assign(_props.data, data)
    data?.cst_info && tcrDraw()
}