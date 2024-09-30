const _props = {
    data: {},
}

const _templates = {
    box : [
        '<dl>',
        '    <dt>{0}</dt>',
        '    <dd>{1}</dd>',
        '</dl>'
    ],
}

const tcrDraw = ( ) => {
    const mixInfo = _props.data.quickbill.mix_info
    const noteInfo = _props.data.quickbill.batch_info.note_info

    const mixHtml = []
    const batchHtml = []

    mixHtml.push('<h4>Mix</h4>')
    mixHtml.push(_templates.box.toText().format(mixInfo.name, mixInfo.count))
    $('#idMix').html(mixHtml.toText())

    if (Array.isArray(noteInfo)) {
        batchHtml.push('<h4>Batch</h4>')
        noteInfo.forEach(note => {
            batchHtml.push(_templates.box.toText().format(note.note_name, note.note_count))
        })
        $('#idBatch').html(batchHtml.toText())
    }
}

const onTCREventListener = (data) => {
    _props.data = Object.assign(_props.data, data)
    data.quickbill && tcrDraw()
}