const _props = {
    data: {},
    tabs: [],
    state: {
        tabIndex: 1,
        sideIndex: 0,
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
        '    <button type="button">',
        '       <img src="../img/ico-nation-{1}.svg" alt="">',
        '       {2}',
        '    </button>',
        '</li>',
    ],
    noteHeader: [
        '<dl class="chart-header">',
        '    <dt></dt>',
        '    <dd><span>E</span><span>F</span></dd>',
        '</dl>',
    ],
    noteLine: [
        '<dl>',
        '    <dt><img {0} alt="">{1}</dt>',
        '    <dd>',
        '        <div class="bar-block">',
        '            <p class="bar {2}" style="width:{3}%;"></p>',
        '        </div>',
        '    </dd>',
        '</dl>',
    ],
}

const _sideBarButtonsLogout = [{
    id: 'idSBBErrorRecovery',
    type: 'normal',
    icon: 'ico-recover.svg',
    caption: 'Error<br>Recovery',
    action: { name: 'ErrorRecoveryCall', data: {} },
}, {
    id: 'idSBBHowto',
    type: 'normal',
    icon: 'ico-question.svg',
    caption: 'How to',
    action: { name: 'HowtoCall', data: {} },
}, {
    id: 'idSBBInventoryAmount',
    type: 'normal',
    icon: 'ico-amount.svg',
    caption: 'Inventory<br>Amount',
    action: { name: 'InventoryAmountCall', data: {} },
}, {
    id: 'idSBBQuickBillCount',
    type: 'normal',
    icon: 'ico-bill.svg',
    caption: 'Quick<br>BillCount',
    action: { name: 'QucikBillCountCall', data: {} },
}]

const _sideBarButtonsLogin = [{
    id: 'idSBBHowto',
    type: 'normal',
    icon: 'ico-question.svg',
    caption: 'How to',
    action: { name: 'HowtoCall', data: {} },
}, {
    id: 'idSBBInventoryAmount',
    type: 'normal',
    icon: 'ico-amount.svg',
    caption: 'Inventory<br>Amount',
    action: { name: 'InventoryAmountCall', data: {} }
}, {
    id: 'idSBBQuickBillCount',
    type: 'normal',
    icon: 'ico-bill.svg',
    caption: 'Quick<br>BillCount',
    action: { name: 'QucikBillCountCall', data: {} },
}, {
    id: 'idSBBSoftwareSettings',
    type: 'normal',
    icon: '',
    caption: 'Software<br>Settings',
    action: { name: 'SoftwareSettingCall', data: {} },
}, {
    id: 'idSBBHardwareSettings',
    type: 'normal',
    icon: '',
    caption: 'Hardware<br>Settings',
    action: { name: 'HardwareSettingCall', data: {} },
}, {
    id: 'idSBBSystemID',
    type: 'normal',
    icon: '',
    caption: 'System ID',
    action: { name: 'SystemIdCall', data: {} },
}, {
    id: 'idSBBSelfAudit',
    type: 'normal',
    icon: '',
    caption: 'Self Audit',
    action: { name: 'SelfAuditCall', data: {} },
}]

const tcrDraw = () => {
    tcrDrawTabs()
    tcrDrawSide()
}

const tcrDrawTabs = (tabIndex) => {
    const tabsData = _props.data.denom_info?.denom_info_by_nation
    const tabsHtml = []
    const notesHtml = []

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
            const noteIconMap = {
                none: 'ico-blank.png',
                manip: 'ico-ca.svg',
                full: 'ico-f.svg',
                nearfull: 'ico-up.svg',
                empty: 'ico-e.svg',
                not_equiped: 'ico-x.svg',
                inoperable: 'ico-l.svg',
            }
            const noteColorMap = {
                divert: 'red',
                operational: 'blue',
            }

            notesHtml.push(_templates.noteHeader.toText())
            noteData.forEach(note => {
                const noteLines = []
                const icon = noteIconMap[(note.status || '').toLowerCase()]
                const barColor = noteColorMap[(note.name || '').toLowerCase()]

                notesHtml.push(_templates.noteLine.toText().format(
                    icon && (icon != '') ? `src="../img/${icon}"` : '',
                    note.name,
                    barColor || 'orange',
                    note.poetry
                ))
            })
        }

        $('div.tab-wrap > ul.tab-list').html(tabsHtml.toText())
        $('div.tab-contents > div.chart-list').html(notesHtml.toText())
    }
}

const tcrGetSideBarButtons = () => {
    return (_props.data.main_status.login_status == 'login') ? _sideBarButtonsLogin : _sideBarButtonsLogout
}

const tcrDrawSide = () => {
    const sideButtons = tcrGetSideBarButtons()

    if (_props.data.main_status.login_status == 'login') {
        tcrCommonDrawSideButtons($('aside.side-bar > ul'), _props.state.sideIndex, sideButtons, { login: true, menu: true })
    } else {
        tcrCommonDrawSideButtons($('aside.side-bar > ul'), _props.state.sideIndex, sideButtons, { login: true })
    }
}

const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)
    data.denom_info && tcrDraw()
}

const onTCRTabClick = (tabIndex) => {
    tcrDrawTabs(tabIndex)
}

const onTcrMenuButtonClick = () => {
    const sideButtons = tcrGetSideBarButtons()
    const sideSize = (_props.data.main_status.login_status == 'login') ? 3 : 4

    _props.state.sideIndex++

    if ((_props.state.sideIndex * sideSize) >= sideButtons.length) {
        _props.state.sideIndex = 0
    }

    tcrDrawSide()
}

