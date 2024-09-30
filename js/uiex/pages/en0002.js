const _props = {
    data: {},
    tabs: [],
    state: {
        tabIndex: 1,
        type: 'none'
    },
}

const _templates = {
    tab: [
        '<li onclick="onTCRTabClick({0})">',
        '   <button type="button">',
        '       <img src="../img/ico-nation-{1}.svg" alt="">',
        '       {2}',
        '   </button>',
        '</li>',
    ],
    tabActive: [
        '<li class="active">',
        '   <button type="button">',
        '       <img src="../img/ico-nation-{1}.svg" alt="">',
        '       {2}',
        '   </button>',
        '</li>',
    ],
    noteLine: [
        '<tr>',
        '   <td>{0}</td>',
        '   <td class="text-right">{1}</td>',
        '   <td class="text-right">{2}</td>',
        '</tr>',
    ],
    noteFoot: [
        '<tr>',
        '   <td>{0}</td>',
        '   <td class="text-right">{1}</td>',
        '   <td class="text-right">{2}</td>',
        '</tr>',
    ],
}

const _sideBarButtons = [{
    id: 'idSBBTotalInventory',
    type: 'normal',
    caption: 'Total<br>Inventory',
    action: { name: 'Total', data: {} },
}, {
    id: 'idSBBDispenseableInventory',
    type: 'normal',
    caption: 'Dispenseable<br>Inventory',
    action: { name: 'Dispenseable', data: {} },
}, {
    id: 'idSBBOperationalCassette',
    type: 'normal',
    caption: 'Operational<br>Cassette',
    action: { name: 'Operational', data: {} },
}, {
    id: 'idSBBDivertBin',
    type: 'normal',
    caption: 'Divert<br>Bin',
    action: { name: 'Divert', data: {} },
}]

const tcrDraw = () => {
    tcrDrawTitle()
    tcrDrawTabs()
    tcrDrawSideBar()
}

const tcrDrawTitle = () => {
    const type = _props.data.Inventory_type
    if (type) {
        _props.state.type = type
    }
    $('#idTitle').html(`Inventory/${type}`)

}

const tcrDrawTabs = (tabIndex) => {
    const tabsData = _props.data.denom_info?.denom_info_by_nation
    const tabsHtml = []
    const noteListHtml = []
    const noteFootHtml = []

    if (tabIndex) {
        _props.state.tabIndex = tabIndex
    }

    if (Array.isArray(tabsData)) {
        let noteData = null
        tabsData.forEach(tab => {
            if (tab.tab_index == _props.state.tabIndex) {
                tabsHtml.push(_templates.tabActive.toText().format(tab.tab_index, tab.nation.toLowerCase(), tab.nation))
                noteData = tab.note_info
            } else {
                tabsHtml.push(_templates.tab.toText().format(tab.tab_index, tab.nation.toLowerCase(), tab.nation))
            }
        })

        if (noteData) {
            let noteTotalData = null

            noteData.forEach(note => {
                if (note.name == 'Total') {
                    noteTotalData = note
                } else {
                    noteListHtml.push(_templates.noteLine.toText().format(note.name, note.count, note.amount))
                }
            })

            if (noteTotalData) {
                noteFootHtml.push(_templates.noteFoot.toText().format(noteTotalData.name, noteTotalData.count, noteTotalData.amount))
            }
        }

        $('div.tab-wrap > .tab-list').html(tabsHtml.toText())
        $('div.tab-contents > table > tbody').html(noteListHtml.toText())
        $('div.tab-contents > table > tfoot').html(noteFootHtml.toText())
    }
}

const tcrDrawSideBar = () => {
    const type = _props.state.type

    tcrCommonDrawSideButtons($('.side-bar > ul'), 0, _sideBarButtons, { back: true })

    switch(type) {
        case 'Total':
            $('#idSBBTotalInventory').attr('disabled', true)
            break
        case 'Dispenseable':
            $('#idSBBDispenseableInventory').attr('disabled', true)
            break
        case 'Operational':
            $('#idSBBOperationalCassette').attr('disabled', true)
            break
        case 'Divert':
            $('#idSBBDivertBin').attr('disabled', true)
            break
    }
    
}

const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)
    data.denom_info && tcrDraw()
}

const onTCRTabClick = (tabIndex) => {
    tcrDrawTabs(tabIndex)
}


