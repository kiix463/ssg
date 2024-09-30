const _props = {
    data: {},
    state: {
        pageIndex: 1,
        pageSize: 5,
        pageCount: 0,
        selectedIdx : 1,
    },
}

const _templates = {
    menuData: [
        '<li onclick="onTCRSelected({0})">{1}</li>',
    ],
    
}

const tcrDraw = () => {
    const menuList = _props?.data?.menu_list
    const selected = _props?.data?.menu.textvalues[0].option_value

    if (Array.isArray(menuList)) {

        menuList.forEach(menu => {
            if (menu.column_value[1].value == selected)
                _props.state.selectedIdx = menu.row_index
        })
        _props.state.pageCount = menuList.length > 0 ? Math.trunc((menuList.length - 1) / _props.state.pageSize) + 1 : 1

        $('#idTabInfo').html(`<span>${_props.state.pageIndex}</span>/${_props.state.pageCount}`)
        $('#idTabPrev').attr('disabled', _props.state.pageIndex <= 1 ? true : false)
        $('#idTabNext').attr('disabled', (_props.state.pageCount <= 1) || (_props.state.pageIndex >= _props.state.pageCount) ? true : false)

        menuList.length > 0 && tcrDrawPageData()
    }    
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
    const selected = _props.state.selectedIdx - 1

    if (Array.isArray(menuList)) {
        const menuHtml = []
        
        for (let i = 0; i < _props.state.pageSize; i++) {
            const idx = i + ((_props.state.pageIndex - 1) * _props.state.pageSize)
            if (idx < menuList.length) {
                const menuData = menuList[idx]
                if (Array.isArray(menuData.column_value) && menuData.column_value.length >= 2) {
                    if(selected == idx) {
                        menuHtml.push(`<li><button type="button" class="active">${menuData.column_value[1].value}</button></li>`)
                    } else {
                        menuHtml.push(_templates.menuData.toText().format(
                            menuData.row_index, 
                            menuData.column_value[1].value|| ''))
                    }
                }
            }
        }
        $('ul.logo-list').html(menuHtml.toText())
    }
}

const onTCRSelected = (index) => {
    _props.state.selectedIdx = index
    tcrDrawPageData()
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

const onTcrSideSetButtonClick = (name) => {
    data = _props.state.selectedIdx
    tcrCommonSendSideButtonEvent(name, data)
}

const onTcrSideBackButtonClick = name => tcrCommonSendSideButtonEvent(name) 

const onTCRLoad = () => {
    $('#idTabPrev').on('click', onTCRPageButtonClick)
    $('#idTabNext').on('click', onTCRPageButtonClick)
}


