const _props = {
    data: {},
    state: {
        pageIndex: 1,
        pageSize: 5,
        pageCount: 0,
        selected: 'idMenu1',
        selectedIdx : 1,
    },
}

const _templates = {
    menuData: [
        '<ul id="idMenu{0}" {3}>',
        '    <li onclick="onTCRConfigSelected({0})"><span class="num">{0}</span> <span class="des">{1}</span></li>',
        '    <li onclick="onTCRConfigSelected({0})">{2}</li>',
        '</ul>',
    ],
}


const tcrDraw = () => {
    const menuList = _props?.data?.menu_list

    if (Array.isArray(menuList)) {
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
    const selected = _props.state.selectedIdx

    if (Array.isArray(menuList)) {
        const menuHtml = []

        for (let i = 0; i < _props.state.pageSize; i++) {
            const idx = i + ((_props.state.pageIndex - 1) * _props.state.pageSize)
            if (idx < menuList.length) {
                const menuData = menuList[idx]

                if (Array.isArray(menuData.column_value) && menuData.column_value.length >= 3) {
                    if(selected == idx) {
                        onTCRConfigSelected(idx)
                    }
                    menuHtml.push(_templates.menuData.toText().format(
                        menuData.column_value[0].value || '',
                        menuData.column_value[1].value || '',
                        menuData.column_value[2].value || '',
                        'idMenu' + menuData.column_value[0].value == _props.state.selected ? 'class="selected"' : ''
                    ))
                }
            }
        }
        $('div.set-contents').html(menuHtml.toText())
    }
}

const onTCRConfigSelected = (index) => {
    const id = `idMenu${index}`
    _props.state.selectedIdx = index
    $(`#${_props.state.selected}`).removeClass('selected')
    _props.state.selected = id
    $(`#${_props.state.selected}`).addClass('selected')
}

const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)
    _props.state.selectedIdx = 1
    _props.state.selected = 'idMenu1'
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
