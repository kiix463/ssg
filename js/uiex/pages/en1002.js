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
    const tabCount = _props.data.trade_info ?.tab_count

    if (tabCount > 1) {
        let tab = hopperData[0]
        let tabHtml = [], boxHtml = []

        tabHtml.push(_templates.tab.toText().format(tab.tab_nation.toLowerCase(), tab.tab_nation, tab.monetary_unit, tab.total_amount))
        boxData = tab.note
        var cnt = 0;
        for(cnt =0; cnt < 7; cnt++) {
            if ( boxData[cnt]) {
                boxHtml.push(_templates.box.toText().format(boxData[cnt].name, boxData[cnt].count))
            } else {
                boxHtml.push(_templates.box.toText().format('',''))
            }
        }
        $('div.hopper.first > dl').html(tabHtml.toText())
        $('div.hopper.first > ul').html(boxHtml.toText())

        tabHtml = []
        boxHtml = []
        tab = hopperData[1]
        tabHtml.push(_templates.tab.toText().format(tab.tab_nation.toLowerCase(), tab.tab_nation, tab.monetary_unit, tab.total_amount))
        boxData = tab.note
        for(cnt =0; cnt < 7; cnt++) {
            if ( boxData[cnt])
                boxHtml.push(_templates.box.toText().format(boxData[cnt].name, boxData[cnt].count))
            else
            boxHtml.push(_templates.box.toText().format('',''))
        }
        $('div.hopper.second > dl').html(tabHtml.toText())
        $('div.hopper.second > ul').html(boxHtml.toText())
    }
}

function onTCREventListener(data) {
  _props.data = Object.assign(_props.data, data)
  data?.trade_info && tcrDraw()
}