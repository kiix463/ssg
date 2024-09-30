const _props = {
  data: {},
}

const _templates = {
   tab: [
        '<dt><img src="../img/ico-nation-{0}.svg" alt="">{1}</dt>',
        '<dd>',
        '    <span>{2}</span>',
        '    <span>{3}</span>',
        '</dd>',
    ],
    box: [
        '<li>',
        '    <dl>',
        '        <dt>{0}</dt>',
        '        <dd>{1}</dd>',
        '    </dl>',
        '</li>',   
    ],
}

const tcrDraw = () => {
    const hopperData = _props.data.trade_info ?.trade_info_by_nation
    const tabHtml = []
    const boxHtml =[]

    if (Array.isArray(hopperData)) {
        hopperData.forEach(tab => {
            tabHtml.push(_templates.tab.toText().format(tab.tab_nation.toLowerCase(), tab.tab_nation, tab.monetary_unit, tab.total_amount))
            boxData = tab.note
            boxData.forEach(box => {
                boxHtml.push(_templates.box.toText().format(box.name, box.count))
            })
        })
    }
    $('div.hopper > dl').html(tabHtml.toText())
    $('div.hopper.solid > ul').html(boxHtml.toText())
}    

function onTCREventListener(data) {
  _props.data = Object.assign(_props.data, data)
  data?.trade_info && tcrDraw()
}