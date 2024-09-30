const _props = {
    data: {},
}

const _tutorials = [
    { tag: 'door', file: "C:\\WTCR\\TMAIN\\sdcardwin\\helps\\doorOper350.mp4" },
    { tag: 'cassette', file: "C:\\WTCR\\TMAIN\\sdcardwin\\helps\\cstOper350.mp4" },
    { tag: 'scrm', file: "C:\\WTCR\\TMAIN\\sdcardwin\\helps\\scrmOper350.mp4" },
    { tag: 'cassetteTray', file: "C:\\WTCR\\TMAIN\\sdcardwin\\helps\\trayOper350.mp4" },
]

const tcrDraw = () => {
}

const onTCRLoad = () => {

}

function onTCREventListener(data) {
    _props.data = Object.assign(_props.data, data)
    data?.DrawDataIsNotNull && tcrDraw()
}

const onTcrSideButtonClick = (tag) => {
    const tutorial = _tutorials.find(t => t.tag == tag)
    if (tutorial) {
        const source = $('video > source')
        if (source) {
            source.attr('src', tutorial.file)

            $('video').get(0).load()
            $('video').get(0).play()

            $('video').on('ended', function() {
                this.playedThrough = true
            })
        }
    }
}