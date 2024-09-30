const _props = {
    data: {},
}

const _tutorials = [
    { tag: 'cassetteJam', file: "C:\\WTCR\\TMAIN\\sdcardwin\\helps\\cstJam350.mp4" },
    { tag: 'divertBinJam', file: "C:\\WTCR\\TMAIN\\sdcardwin\\helps\\tskJam350.mp4" },
    { tag: 'billTransportJam', file: "C:\\WTCR\\TMAIN\\sdcardwin\\helps\\fduJam350.mp4" },
    { tag: 'validatorJam', file: "C:\\WTCR\\TMAIN\\sdcardwin\\helps\\bvJam350.mp4" },
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