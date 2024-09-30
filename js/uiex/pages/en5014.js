const _props = {
  data: {},
}

const tcrDraw = () => {
}

function onTCREventListener(data) {
  _props.data = Object.assign(_props.data, data)
  data?.NeedToChange && tcrDraw()
}