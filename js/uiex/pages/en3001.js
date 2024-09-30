const _props = {
    data: {},
    played: false,
}

const _sensorMap = [
    { idx: 0, class: 'stats-03' },
    { idx: 1, class: 'stats-02' },
    { idx: 2, class: 'stats-01' },
    { idx: 3, class: false },
    { idx: 4, class: 'stats-13' },
    { idx: 5, class: 'stats-08' },
    { idx: 6, class: 'stats-06' },
    { idx: 7, class: 'stats-05' },
    { idx: 8, class: 'stats-17' },
    { idx: 9, class: 'stats-18' },
    { idx: 10, class: 'stats-20' },
    { idx: 11, class: 'stats-19' },
    { idx: 12, class: 'stats-15' },
    { idx: 13, class: 'stats-11' },
    { idx: 14, class: 'stats-10' },
    { idx: 15, class: 'stats-09' },
    { idx: 16, class: 'stats-07' },
    { idx: 17, class: 'stats-14' },
    { idx: 18, class: 'stats-12' },
    { idx: 19, class: 'stats-04' },
    { idx: 20, class: 'stats-16' },
    { idx: 21, class: false },
    { idx: 22, class: 'stats-21' },
    { idx: 23, class: 'stats-22' },
    { idx: 24, class: 'stats-23' },
    { idx: 25, class: 'stats-24' },
    { idx: 26, class: 'stats-25' },
    { idx: 27, class: 'stats-26' },
    { idx: 28, class: 'stats-27' },
    { idx: 29, class: false },
    { idx: 30, class: false },
    { idx: 31, class: 'stats-28' },
    { idx: 32, class: 'stats-29' },
    { idx: 33, class: 'stats-30' },
    { idx: 34, class: 'stats-31' },
    { idx: 35, class: 'stats-32' },
    { idx: 36, class: 'stats-33' },
    { idx: 37, class: false },
    { idx: 38, class: false },
    { idx: 39, class: 'stats-34' },
    { idx: 40, class: 'stats-35' },
    { idx: 41, class: 'stats-36' },
    { idx: 42, class: 'stats-37' },
    { idx: 43, class: 'stats-38' },
    { idx: 44, class: 'stats-39' },
    { idx: 45, class: 'error-area-01', area: true },
    { idx: 46, class: 'error-area-02', area: true },
    { idx: 47, class: 'error-area-03', area: true },
    { idx: 48, class: 'error-area-04', area: true },
    { idx: 49, class: 'stats-40' },
]

const tcrDraw = () => {
    const sensors = _props.data.sensor_value

    if (Array.isArray(sensors)) {
        sensors.forEach(s => {
            const cls = _sensorMap.find(item => item.idx == s.idx)
            if (cls && cls.class) {
                if (cls.area) {
                    const btn = $(`li.${cls.class}`)
                    if (btn && btn.length > 0) {
                        if (s.value == 1) {
                            if (!btn.hasClass('show'))
                                btn.addClass('show')
                        } else {
                            btn.removeClass('show')
                        }
                    }
                } else {
                    const btn = $(`li.${cls.class} > button`)
                    if (btn && btn.length > 0) {
                        btn.attr('class', s.value == 1 ? 'jam' : '')
                    }
                }
            }
        })
    }

    const videoFile = _props.data.video
    if (videoFile) {
        const source = $('video > source')
        if (source) {
            source.attr('src', videoFile)

            if (!_props.played) {
                $('video').get(0).load()
                $('video').get(0).play()

                $('video').on('ended', function() {
                    this.playedThrough = true
                })

                _props.played = true
            }
        }
    }

    const errorInfo = _props.data.error_info
    if (errorInfo) {
        console.log('error', errorInfo.error_description)
        $('#idErrorDesc').html(errorInfo.error_description || '')
        $('.error-code').html(`${errorInfo.error_code || ''}<br>${errorInfo.error_code_detail || ''}`)
    }
}

const onTCRLoad = () => {

}

function onTCREventListener(data) {
    _props.data = Object.assign(_props.data, data)
    data?.sensor_value && tcrDraw()
}