(() => {
  // get and parse data
  let data = prompt('Pegar solo las columnas\nFecha, Hora inicio, Fin, Cant 50%, 100% y Descripción')
  if (!data) return
  data = data.split('\n').filter(r => r.trim().length)
  if (data.length === 0) return
  data = data.slice(0, 7).map(r => r.split('\t').slice(0, 6))

  const date = new Date, month = date.getMonth()
  const flipDate = (() => {
    let y1 = 0, y2 = 0
    for (const row of data) {
      // extract day/month digits
      const [x1, x2] = row[0].split('/').map(x => Number(x))
      // if any digit > month, that must be a day
      if (Math.max(x1, x2) > month)
        return x2 > x1
      // accumulate totals by position
      y1 += x1
      y2 += x2
    }
    // if all digits <= month, assume position with higher total is month
    return y1 > y2
  })()

  // get form cells
  const bounds = [260, 305, 350, 395, 440, 485, 530], cells = Array(7).fill().map(_=>[]),
    iwindow = document.getElementById('documentframe').contentWindow
  iwindow.document.querySelectorAll('.eform-content input:not(.formHidden,.autocompletable)').forEach(
    (e, i) => {
      if (i === 0) {
        // auto fill month
        const date = new Date, month = date.getMonth()
        e.value = `01/${(month ? month.toString().padStart(2, 0) : '12')}/${date.getFullYear()}`
      } else {
        cells[bounds.findLastIndex(y => e.offsetTop > y)].push(e)
      }
    }
  )

  // fill inputs
  data.forEach((row, i) => {
    cells[i].sort((a, b) => a.offsetLeft - b.offsetLeft)

    row.forEach((field, j) => {
      const el = cells[i][j]

      if (j === 0) {
        // date - normalize format
        const date = field.replace(/\b(\d)\b/g, '0$1').replace(/\b(\d\d)$/g, '20$1')
        el.value = flipDate ? date.replace(/(\d+)\/(\d+)/, '$2/$1') : date
      } else if (j < 3) {
        // hour start/end
        el.value = field.replace(/0*(\d+):00/, '$1')
      } else {
        el.value = field
      }
      // update value
      iwindow.eform.context.pages[0].objects[el.tabIndex - 1e4].obj.placeholder = el.value
    })
  })
})()