const _props = {
  data: [],
  state: null,
}

const _sideBarButtons = [{
  type: 'none',
}, {
  type: 'none',
}, {
  id: 'idAuto',
  type: 'normal',
  caption: 'Auto',
  action: () => {
     //tcrDrawOptionValue('Auto')

      return { name: 'Auto' , data: {
          option_name: 'textValue1',
          option_value: 'Auto',
      }}
  },
}, {
  id: 'idManual',
  type: 'normal',
  caption: 'Manual',
  action: () => {
      //tcrDrawOptionValue('Manual')

      return { name: 'Manual' , data: {
          option_name: 'textValue1',
          option_value: 'Manual',
      }}
  },
}]

const tcrDraw = () => {
  tcrDrawClient()
  tcrDrawSideBar()
}

const tcrDrawClient = () => {
  const menu = _props.data.menu
  if (menu && Array.isArray(menu.textvalues)) {
      tcrDrawOptionValue((menu.textvalues.length > 0) ? menu.textvalues[0].option_value : '')
  }
}

const tcrDrawOptionValue = (value) => {
  _props.state = value
  $('#idOptionValue').html(_props.state)
}

const tcrDrawSideBar = () => {
  tcrCommonDrawSideButtons($('.side-bar > ul'), 0, _sideBarButtons, { back: true })
}

function onTCREventListener(data) {
  _props.data = Object.assign(_props.data, data)
  data.menu && tcrDraw()
}