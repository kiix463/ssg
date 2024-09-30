const _sideBarButtons = [{
    type: 'none',
}, {
    type: 'none',
}, {
    type: 'none',
}, {
    id: 'idSync',
    type: 'normal',
    caption: 'Synchronize<Br>Time',
    action: () => {
        return { name: 'Synchronize Time' , data: {
            option_name: 'textValue1',
            option_value: 'Synchronize Time',
        }}
    },
}]

const tcrDrawSideBar = () => {
    tcrCommonDrawSideButtons($('.side-bar > ul'), 0, _sideBarButtons, { back: true })
}

function onTCREventListener(data) {
    tcrDrawSideBar()
}