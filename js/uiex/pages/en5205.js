const _props = {
    data: {},
    state: {
        pageIndex: 1,
        pageSize: 10,
        pageCount: 0,
    },
}

const _templates = {
    menuData: [
        '<tr>',
        '   <td>{0}</td>',
        '   <td>{1}</td>',
        '   <td>{2}</td>',
        '   <td class="fc-orange">{3}</td>',
        '   <td>{4}</td>',
        '   <td>{5}</td>',
        '   <td>{6}</td>',
        '   <td>{7}</td>',
        '</tr>',
    ],
}

const tcrDraw = () => {
    tcrDrawPage()
    tcrDrawSideBar()
}

const tcrDrawPage = () => {
    const menuList = _props?.data?.menu_list

    if (Array.isArray(menuList)) {
        _props.state.pageCount = menuList.length > 0 ? Math.trunc((menuList.length - 1) / _props.state.pageSize) + 1 : 1

        $('#idTabInfo').html(`<span>${_props.state.pageIndex}</span>/${_props.state.pageCount}`)
        $('#idTabPrev').attr('disabled', _props.state.pageIndex <= 1 ? true : false)
        $('#idTabNext').attr('disabled', (_props.state.pageCount <= 1) || (_props.state.pageIndex >= _props.state.pageCount) ? true : false)

        menuList.length > 0 && tcrDrawPageData()
    }
}

const tcrDrawPageData = () => {
    const menuList = _props?.data?.menu_list
    if (Array.isArray(menuList)) {
        const menuHtml = []

        for (let i = 0; i < _props.state.pageSize; i++) {
            const idx = i + ((_props.state.pageIndex - 1) * _props.state.pageSize)
            if (idx < menuList.length) {
                const menuData = menuList[idx]

                if (Array.isArray(menuData.column_value) && menuData.column_value.length >= 8) {
                    menuHtml.push(_templates.menuData.toText().format(
                        menuData.column_value[0].value || '',
                        menuData.column_value[1].value || '',
                        menuData.column_value[2].value || '',
                        menuData.column_value[3].value || '',
                        menuData.column_value[4].value || '',
                        menuData.column_value[5].value || '',
                        menuData.column_value[6].value || '',
                        menuData.column_value[7].value || '',
                    ))
                }

            }
        }

        $('div.set-contents > table > tbody').html(menuHtml.toText())
    }
}

const tcrDrawSideBar = () => {

}

const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)

    data.menu_list && tcrDraw()
}

const onTCRPageButtonClick = (event) => {
    const menuList = _props.data.menu_list
    let updated = false

    if (event?.target?.id == 'idTabPrev') {
        if (_props.state.pageIndex > 1) {
            _props.state.pageIndex--
            updated = true
        }
    } else if (event?.target?.id == 'idTabNext') {
        if (_props.state.pageIndex < _props.state.pageCount) {
            _props.state.pageIndex++
            updated = true
        }
    }

    updated && tcrDrawPage()
}

const onTcrSideButtonClick = name => tcrCommonSendSideButtonEvent(name)

const onTCRLoad = () => {
    $('#idTabPrev').on('click', onTCRPageButtonClick)
    $('#idTabNext').on('click', onTCRPageButtonClick)
}
