const STYLES: object|any =  {
  default: {
    fontSize: '32px',
    fontFamily: 'Palatino Linotype',
    fill: '#ffffff',
  },
}

STYLES.menu = {
  ...STYLES.default,
  fill: '#333333',
}

STYLES.pulseHeader = {
  ...STYLES.default,
  fontSize: '48px',
}

STYLES.header = {
  ...STYLES.default,
  fontSize: '40px',
}

STYLES.text = {
  ...STYLES.default,
  fontSize: '26px',
  align: "center",
}

const MENU: object|any =  {
  offset: 20,
  startY: 720 / 2,
  bg: {
    color: 0xFFFFFF,
    width: 400,
    height: 50,
  }
}

const CONTENT: object|any = {
  header: {
    offsetY: 80,
  },
  text: {
    offsetY: 40 + 80 + 30,
  },
}

const GAME: object|any = {
  count: 3,
  size: 70,
  cellBgColor: 0xffffff,
  cellBgOpacity: .25,
  margin: 5,
  angleFrom: -20,
  angleTo: 20,
  duration: 227,
  apperingDuration: 227,
  addCellsPercent: 70,
  addCellsTimes: 2,
}

export default {
  STYLES,
  MENU,
  CONTENT,
  GAME,
}
