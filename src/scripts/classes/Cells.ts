import configs from "../configs"
const { GAME } = configs

export default class Cells {
  public scene: any
  public params: any
  public cells: any
  public winner: string
  public addCellsTimes: number

  constructor(scene: any) {
    this.scene = scene
  }
  
  create(params: object|any) {
    this.params = params
    this.cells = this.createEmptyCells()
    this.winner = ''
    this.addCellsTimes = GAME.addCellsTimes
    this.fillCells(this.cells)
    this.addEvents()
  }

  addEvents() {
    if (this.params.onCellClick) {
      this.scene.input.on("gameobjectdown", this.params.onCellClick)
    }
  }

  getFreeCells() {
    return this.getAllCells().filter((col: any) => !col.sign)
  }

  getAllCells() {
    return this.cells.reduce((acc: object[]|any, row: any) => {
      return acc.push(...row) && acc || []
    }, [])
  }

  getCellByCoords({ row, col }) {
    return this.getAllCells().find((cell: any) => {
      return cell.row === row && cell.col === col
    })
  }

  setSign(cell: object|any, sign: string) {
    if (cell.sign) {
      return console.error("already set")
    }

    this.scene.sound.play(`enter-${sign}`, { volume: .5 })

    cell.sign = sign
    cell.cellSignObject = this.scene.add.image(
      cell.cellObject.x + (cell.cellObject.width / 2),
      cell.cellObject.y + (cell.cellObject.height / 2),
      this.getSignImageName(sign),
    )
    cell.cellSignObject.setOrigin(.5)
    
    const maxSize: number = Math.max(cell.cellSignObject.width, cell.cellSignObject.height)
    const scale: number = GAME.size / maxSize
    
    cell.cellSignObject.setScale(0)
    cell.cellSignObject.setAngle(
      Phaser.Math.Between(GAME.angleFrom, GAME.angleTo)
    )

    this.scene.add.tween({
      scale,
      angle: 0,
      targets: [cell.cellSignObject],
      duration: GAME.duration,
    })

    this.checkWinner(this.cells)
    if (this.winner) {
      this.scene.onWin(this.winner)
    } else {
      this.checkCells()
    }
  }

  checkCells() {
    const freeCellsCount: number = this.getFreeCells().length
    const cellsMinimum: number = Math.pow(this.cells.length, 2) / 100 * (100 - GAME.addCellsPercent)
    
    if (cellsMinimum > freeCellsCount && this.addCellsTimes) {
      this.addCellsToEdges()
      this.addCellsTimes -= 1
    }

    if (!freeCellsCount) {
      this.scene.onFinish()
    }
  }

  checkWinner(cells: object[] | any) {
    this.winner = ''
    let tl2brLettersCounting = {}
    let br2tlLettersCounting = {}

    for (let rowIndex in cells) {
      const row: any = cells[rowIndex]
      let rowLettersCounting = {}
      let colLettersCounting = {}
      
      for (let colIndex in row) {
        const col: any = row[colIndex]
        
        // ?????????????????? ???? ??????????????????????
        colLettersCounting[col.sign ?? ''] = true
        
        // ?????????????????? ???? ??????????????????
        rowLettersCounting[cells[colIndex][rowIndex].sign ?? ''] = true
        
        // ?????????????????? ???? ?????????????????? | ?????????? ?????????????? ???????? - ???????????? ????????????
        if (rowIndex === colIndex) {
          tl2brLettersCounting[col.sign ?? ''] = true
        }
        
        // ?????????????????? ???? ?????????????????? | ???????????? ?????????????? ???????? - ?????????? ????????????
        if (row.length - 1 - +rowIndex === +colIndex) {
          br2tlLettersCounting[col.sign ?? ''] = true
        }
      }
      
      // ???? ??????????????????????
      const colSigns = Object.keys(colLettersCounting)
      
      if (colSigns.length === 1 && colSigns[0]) {
        this.winner = colSigns[0]
        break
      }
      
      // ???? ??????????????????
      const rowSigns = Object.keys(rowLettersCounting)
      if (!this.winner && rowSigns.length === 1 && rowSigns[0]) {
        this.winner = rowSigns[0]
        break
      }
    }

    // ???? ?????????????????? | ?????????? ?????????????? ???????? - ???????????? ????????????
    const tl2brSigns = Object.keys(tl2brLettersCounting)
    if (!this.winner && tl2brSigns.length === 1 && tl2brSigns[0]) {
      this.winner = tl2brSigns[0]
    }

    // ???? ?????????????????? | ???????????? ?????????????? ???????? - ?????????? ????????????
    const br2tlSigns = Object.keys(br2tlLettersCounting)
    if (!this.winner && br2tlSigns.length === 1 && br2tlSigns[0]) {
      this.winner = br2tlSigns[0]
    }

    return this.winner
  }

  getSignImageName(sign: string): string {
    return sign + String(Phaser.Math.Between(1, 3))
  }

  createEmptyCells() {
    let rows = this.getNewEmptyArr(GAME.count)

    return rows.map((row, rowIndex: number) => {
      const cols = this.getNewEmptyArr(GAME.count)
      return cols.map((col:any, colIndex: number) => ({
        ...this.getColumnsTemplate(),
        row: rowIndex,
        col: colIndex,
      }))
    })
  }

  fillCells(cells: object|any) {
    const cellSize = GAME.size
    const margin = GAME.margin
    const count = cells.length
    const cellsWidth = count * (cellSize + margin) - margin
    const offsetX = (+this.scene.game.config.width - cellsWidth) / 2
    const offsetY = (+this.scene.game.config.height - cellsWidth) / 2
    let counter: number = 0
    cells.forEach((row: object | any, rowIndex: number) => {
      row.forEach((col: object | any, colIndex: number) => {
        if (col.cellObject) {
          return
        }

        const animateFrom = {
          x: +this.scene.game.config.width / 2 - cellSize / 2,
          y: +this.scene.game.config.height / 2 - cellSize / 2,
        }

        const animateTo = {
          x: colIndex * (cellSize + margin) + offsetX,
          y: rowIndex * (cellSize + margin) + offsetY,
        }

        col.cellObject = this.scene.add.rectangle(
          animateFrom.x,
          animateFrom.y,
          cellSize,
          cellSize,
          GAME.cellBgColor,
          GAME.cellBgOpacity,
        ).setOrigin(0)

        this.scene.add.tween({
          ...animateTo,
          targets: [col.cellObject],
          duration: GAME.apperingDuration + (counter * GAME.apperingDuration),
        })

        col.cellObject.setInteractive()
        col.cellObject.cell = col
      })
    })
  }

  addCellsToEdges() {
    this.scene.sound.play("cells-adding")
    const cellsCurrentCount: number = this.cells.length
    this.cells.unshift(this.getNewEmptyArr(cellsCurrentCount))
    this.cells.push(this.getNewEmptyArr(cellsCurrentCount))

    this.cells[0] = this.cells[0].map((cell: any, cellIndex: number) => ({
      ...this.getColumnsTemplate(),
      row: this.cells[1][0].row - 1,
      col: cellIndex,
    }))

    this.cells[this.cells.length - 1] = this.cells[this.cells.length - 1].map((cell: any, cellIndex: number) => ({
      ...this.getColumnsTemplate(),
      row: this.cells[this.cells.length - 2][0].row + 1,
      col: cellIndex,
    }))

    this.cells.forEach((row: any) => {
      row.unshift({
        ...this.getColumnsTemplate(),
        row: row[0].row,
        col: row[0].col - 1,
      })
      row.push({
        ...this.getColumnsTemplate(),
        row: row[0].row,
        col: row[row.length - 1].col + 1,
      })
    })

    this.fillCells(this.cells)
  }

  getColumnsTemplate() {
    return {
      sign: "",
      row: undefined,
      col: undefined,
      cellObject: null,
    }
  }

  getNewEmptyArr(count: number): null[] {
    return new Array(count).fill(null)
  }
}
