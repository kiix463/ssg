// event listener
const _commonProps = {
    data: null,
    status: {
        logon: false,
    },
    activeButtons: [],
}

function onTCRCommonListener(data) {
    if (data) {
        // _commonProps.data = Object.assign(_commonProps.data, data)
        _commonProps.data = data
        _commonProps.status.logon = (_commonProps.data.main_status.login_status == 'login')

        tcrCommonHeaderDraw(_commonProps.data.main_status)
        tcrCommonPopupDraw(_commonProps.data.popup)
        tcrCommonInventoryDraw(_commonProps.data.hideinventory, _commonProps.data.screen_name)
        tcrCommonLoadingDraw(_commonProps.data.memo)
    }
}

function onTCRCommonDocumentReady() {
    tcrCommonSetClock();
    setInterval(tcrCommonSetClock, 1000)

    tcrCommonPopupInit()
    tcrCommonLoadingInit()
    tcrCommonInventoryInit()

    $(document).bind('dragstart', () => false)
    $(document).bind('selectstart', () => false)
}

function onTCRCommonLoad() {
}

// popup
const tcrCommonPopupDraw = (popup) => {
    if (popup && ((popup.activate === true) || (popup.activate === 'true'))) {
        const timeout = Number(popup.popup_timeout)
        tcrCommonPopupOpen({
            type: popup.popup_type,
            contents: popup.value,
            timeout: (typeof timeout == 'number') ? timeout : false,
        })
    }
}

const tcrCommonPopupInit = () => {
    const popupHtml = []

    popupHtml.push('<div class="popup-wrap" id="popup" tabindex="0"></div>')
    popupHtml.push('<div class="overlay"></div>')

    popupHtml.push('<div id="idPopup01" class="modal popup-01" tabindex="-1" aria-hidden="true">')
    popupHtml.push('    <div class="modal-dialog modal-dialog-centered">')
    popupHtml.push('        <div class="modal-content">')
    // popupHtml.push('         <div id="idPopup01Title" class="modal-header">Title</div>')
    popupHtml.push('            <div class="modal-body">')
    popupHtml.push('                <div id="idPopup01Contents" class="text-area"></div>')
    popupHtml.push('            </div>')
    popupHtml.push('            <div class="modal-footer">')
    popupHtml.push('                <p class="popup-btn">')
    popupHtml.push('                    <button type="button" class="btn btn-m btn-white" style="width: 215px;" onclick="onTcrCommonPopupCancelClick()">Cancel</button>')
    popupHtml.push('                    <button type="button" class="btn btn-m btn-blue" style="width: 215px;" onclick="onTcrCommonPopupOkClick()">OK</button>')
    popupHtml.push('                </p>')
    popupHtml.push('            </div>')
    popupHtml.push('        </div>')
    popupHtml.push('    </div>')
    popupHtml.push('</div>')

    popupHtml.push('<div id="idPopup03" class="modal popup-03" tabindex="-1" aria-hidden="true">')
    popupHtml.push('    <div class="modal-dialog modal-dialog-centered modal-s">')
    popupHtml.push('        <div class="modal-content">')
    popupHtml.push('            <div class="modal-body">')
    popupHtml.push('                <div id="idPopup03Contents" class="modal-msg"></div>')
    popupHtml.push('            </div>')
    popupHtml.push('        </div>')
    popupHtml.push('    </div>')
    popupHtml.push('</div>')

    $('body').append(popupHtml.toText())
}

const tcrCommonPopupOpen = (attr) => {
    if (attr) {
        if (attr.type == '1') {
            // $('#idPopup01Title').html(attr.title || '')
            $('#idPopup01Contents').html(attr.contents || '')

            if (attr.timeout) {
                setTimeout(onTcrCommonPopupTimeOut, attr.timeout * 1000)
            }

            openModal('popup-01')
        } else if (attr.type == '2') {
            $('#idPopup03Contents').html([
                '<p class="mB10"><img src="../img/ico-modal-caution.svg" alt=""></p>',
                attr.contents,
            ].toText())

            setTimeout(onTcrCommonPopupTimeOut, (attr.timeout || 5) * 1000)

            openModal('popup-03')
        }
    }
}

const tcrCommonPopupClose = () => {
    closeModal()
}

const onTcrCommonPopupTimeOut = () => {
    tcrCommonPopupClose()
    tcrCommonSendButtonEvent('popup_timeout')
}

const onTcrCommonPopupOkClick = () => {
    tcrCommonPopupClose()
    tcrCommonSendButtonEvent('popup_ok')
}

const onTcrCommonPopupCancelClick = () => {
    tcrCommonPopupClose()
    tcrCommonSendButtonEvent('popup_cancel')
}

// loading
const tcrCommonLoadingDraw = (loading) => {
    if (loading) {
        if (((loading.activate === true) || (loading.activate === 'true'))) {
            $('.loading').html([
                '<img src="../img/EN8001.gif" alt="" width="60">',
                loading.value || '',
            ].toText())
            tcrCommonLoadingShow()
        } else {
            $('.loading').html('')
            tcrCommonLoadingHide()
        }
    }
}

const tcrCommonLoadingInit = () => {
    const loadingHtml = []

    loadingHtml.push('<div class="loading hide">')
    loadingHtml.push('</div>')

    $('section').append(loadingHtml.toText())
}

const tcrCommonLoadingShow = () => {
    $('.loading').removeClass('hide')
    $('.loading').addClass('show')
}

const tcrCommonLoadingHide = () => {
    $('.loading').removeClass('show')
    $('.loading').addClass('hide')
}

// inventory
const tcrCommonInventoryDraw = (inventory, screen) => {
    if (['HD0002.html'].includes(screen)) {
        $('.overay-logo').html('<img src="../img/img-title-hyundai.svg" alt="">')
    } else if ([
        'EN0001.html',
        'EN0002.html',
        'EN0003.html',
    ].includes(screen)) {
        $('.overay-logo').html('<img src="../img/img-title-atecap.svg" alt="">')
    } else {
        $('.overay-logo').html('')
    }

    if (inventory && ((inventory.activate === true) || (inventory.activate === 'true'))) {
        tcrCommonInventoryShow()
    } else {
        tcrCommonInventoryHide()
    }
}

const tcrCommonInventoryInit = () => {
    const invenHtml = []

    invenHtml.push('<div class="overay-logo hide">')
    invenHtml.push('</div>')

    $('section').append(invenHtml.toText())
}

const tcrCommonInventoryShow = () => {
    $('.overay-logo').removeClass('hide')
    $('.overay-logo').addClass('show')
}

const tcrCommonInventoryHide = () => {
    $('.overay-logo').removeClass('show')
    $('.overay-logo').addClass('hide')
}

// titlebar - clock
const tcrCommonSetClock = () => {
  var dateInfo = new Date()
  const week = new Array('(일) ', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)')
  var month = dateInfo.getMonth() + 1
  var date = dateInfo.getDate()
  var dayWeek
  var hour = dateInfo.getHours()
  var min = tcrCommonModifyNumber(dateInfo.getMinutes())

  if (typeof dateInfo === 'object' && dateInfo !== null && 'getDay' in dateInfo) {
      dayWeek = week[dateInfo.getDay()]
  } else {
      console.log("Invalid Date Object")
  }

  const ampm = hour < 12 ? "오전" : "오후"
  $('div.headcon-right > div.date-info').html(`${month}월 ${date}일 ${dayWeek} ${ampm} <span> ${(hour==12) ? hour: (hour%12)}:${min}</span>`)
}

const tcrCommonModifyNumber = (time) => {
  if(parseInt(time)<10) {
      return "0"+time
  } else {
      return time;
  }
}

// header
const tcrCommonHeaderDraw = (headInfo) => {
    const headLeftHtml = []
    const headCenterHtml = []
    const headRightHtml =[]

    if (headInfo.error_status == 'error') {
        $('#header').attr('class', 'error')
    } else {
        $('#header').removeClass("error")
    }

    const headLeft = $('div.headcon-left').find('path')
    const headRight = $('div.headcon-right').find('path')

    headInfo.occupy.some(info=> {
        switch (info.side) {
            case 'left':
                headLeft && headLeft.attr("fill", (info.use == 'occupy') ? "#86EF55" : "#8F8F8F")
                break
            case 'both':
                if(info.use == 'occupy') {
                    headLeft && headLeft.attr("fill", "#86EF55")
                    headRight && headRight.attr("fill", "#86EF55")
                    return true
                }
                break
            case 'right':
                headRight && headRight.attr("fill", (info.use == 'occupy') ? "#86EF55" : "#8F8F8F")
                break
        }
    })

    if (headInfo.bill_mode == 'test') {
        if (!$('p.test-bill').length) {
            $('div.headcon-right').prepend('<p class="test-bill">Test Bill</p>')
        }
    } else {
        $('p.test-bill').remove()
    }

    const headConLeft = $('ul.stats > li').eq(0)
    const headConCenter = $('ul.stats > li').eq(1)
    const headConRight = $('ul.stats > li').eq(2)

    headInfo.conwhere.forEach(coInfo=> {
        switch (coInfo.side) {
            case 'left':
                if (coInfo.use == 'connect') {
                    headConLeft && headConLeft.attr('class', 'active')
                } else {
                    headConLeft && headConLeft.removeClass("active")
                }
                break
            case 'center':
                if (coInfo.use == 'connect') {
                    headConCenter && headConCenter.attr('class', 'active')
                } else {
                    headConCenter && headConCenter.removeClass("active")
                }
                break
            case 'right':
                if (coInfo.use == 'connect') {
                    headConRight && headConRight.attr('class', 'active')
                } else {
                    headConRight && headConRight.removeClass("active")
                }
                break
        }
    })
}

// sidebar
const _commonSideBarButtonsTemplates = {
    text: [
        '<li>',
        '   <button id={0} type="button" onclick="onTcrCommonSideButtonClick(`{0}`)">',
        '       {1}',
        '   </button>',
        '</li>',
    ],
    icon: [
        '<li>',
        '   <button id={0} type="button" onclick="onTcrCommonSideButtonClick(`{0}`)">',
        '       <img src="../img/{1}" alt="">',
        '       {2}',
        '   </button>',
        '</li>',
    ],
    menu: [
        '<li>',
        '   <button id={0} type="button" onclick="onTcrCommonSideButtonClick(`{0}`)">',
        '       <img src="../img/{1}" alt="">',
        '       {2}',
        '   </button>',
        '</li>',
    ],
    back: [
        '<li>',
        '   <button id={0} type="button" class="side" onclick="onTcrCommonSideButtonClick(`{0}`)">',
        '       <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '           <path d="M6 1L1 5L6 9" stroke="#34B6EC" stroke-linecap="round" stroke-linejoin="round"/>',
        '       </svg>',
        '       {1}',
        '   </button>',
        '</li>',
    ],
    none: [
        '<li>',
        '   <button type="button" disabled>',
        '   </button>',
        '</li>',
    ],
}

const _commonSideBarButtons = {
    login: {
        id: 'idSBBCommonLogin',
        type: 'normal',
        icon: 'ico-login.svg',
        caption: 'Log in',
        action: { name: 'LogInCall', data: {} },
    },
    logout: {
        id: 'idSBBCommonLogout',
        type: 'normal',
        icon: 'ico-logout.svg',
        caption: 'Log out',
        action: { name: 'LogOutCall', data: {} },
    },
    menu: {
        id: 'idSBBCommonMenu',
        type: 'menu',
        icon: 'ico-recover.svg',
        caption: 'Menu',
        action: () => {
            if (typeof onTcrMenuButtonClick == 'function') {
                onTcrMenuButtonClick()
            }
        },
    },
    back: {
        id: 'idSBBCommonBack',
        type: 'back',
        caption: 'Back',
        action: { name: 'Back', data: {} },
    },
    none: {
        id: 'idSBNone',
        type: 'none',
        icon: '',
        caption: '',
        action: null,
    }
}

const tcrCommonDrawSideButtons = (owner, pageIndex, buttonList, options) => {
    _commonProps.activeButtons = []

    const activeButtons = _commonProps.activeButtons
    const commonButtons = _commonSideBarButtons
    const templates = _commonSideBarButtonsTemplates

    const hasLogin = options && options.login
    const hasMenu = options && options.menu
    const hasBack = options && options.back
    const changableSize = 5 - (hasLogin ? 1 : 0) - (hasMenu ? 1 : 0) - (hasBack ? 1 : 0)

    if (hasLogin) {
        activeButtons.push(_commonProps.status.logon ? commonButtons.logout : commonButtons.login)
    }

    if (hasBack) {
        activeButtons.push(commonButtons.back)
    }

    for (let i = 0; i < changableSize; i++) {
        const idx = i + (pageIndex * changableSize)
        if ((idx >= 0) && (idx < buttonList.length)) {
            activeButtons.push(buttonList[idx])
        } else {
            activeButtons.push(commonButtons.none)
        }
    }

    if (hasMenu) {
        activeButtons.push(commonButtons.menu)
    }

    const sideHtml = []
    for (let i = 0; i < 5; i++) {
        const btnHtml = []
        const btn = (i < activeButtons.length) ? activeButtons[i] : {}

        switch (btn.type) {
            case 'normal':
                if (btn.icon && (btn.icon != '')) {
                    btnHtml.push(templates.icon.toText().format(btn.id, btn.icon, btn.caption))
                } else {
                    btnHtml.push(templates.text.toText().format(btn.id, btn.caption))
                }
                break

            case 'menu':
                btnHtml.push(templates.menu.toText().format(btn.id, btn.icon, btn.caption))
                break

            case 'back':
                btnHtml.push(templates.back.toText().format(btn.id, btn.caption))
                break

            case 'none':
                btnHtml.push(templates.none.toText())
                break

            default:
                btnHtml.push(templates.none.toText())
                break
        }

        sideHtml.push(btnHtml.toText())
    }

    owner && owner.html(sideHtml.toText());
}

const onTcrCommonSideButtonClick = (id) => {
    const activeButtons = _commonProps.activeButtons

    if (Array.isArray(activeButtons)) {
        const btn = activeButtons.find(btn => btn.id == id)
        if (btn) {
            if (typeof btn.action == 'function') {
                const result = btn.action()
                if (result && result.name ) {
                    tcrCommonSendSideButtonEvent(result.name, result.data)
                }
            } else if (typeof btn.action == 'object') {
                tcrCommonSendSideButtonEvent(btn.action.name, btn.action.data)
            }
        }
    }
}

const tcrCommonSendButtonEvent = (name, data) => {
    sendEvent({
        header: {
            req_type: 'req',
            success: true,
            completed: true,
        },
        screen_name: SCREEN_NAME,
        button_name: name,
        return_data: data || {},
    })
}

const tcrCommonSendSideButtonEvent = (name, data) => {
    sendEvent({
        header: {
            req_type: 'req',
            success: true,
            completed: true,
        },
        screen_name: SCREEN_NAME,
        button_name: name,
        return_data: data || {},
    })
}

