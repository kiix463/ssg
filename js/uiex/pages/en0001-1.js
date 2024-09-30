function onTCREventListener(data) {
  console.log("onTCREventListener (EN0001-1)", data)

  sendTCREvent({ test: 'This is en0001-1 data' })
}