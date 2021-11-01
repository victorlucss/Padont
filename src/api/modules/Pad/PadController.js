
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve();


class PadController {
  constructor () {

  }

  static create (name, content) {
    fs.writeFileSync(path.resolve(__dirname, `public/pads/${name}.json`), JSON.stringify(content))

    return content

  }
  
  static findOrCreate (name) {
    const defaultContent = {
      content: '',
      author: null,
      lastIp: null,
      updatedAt: new Date().toISOString()
  }

  try {
      const file = JSON.parse(fs.readFileSync(path.resolve(__dirname, `public/pads/${name}.json`), 'utf8'));

      return file;
  } catch(e) {
    fs.writeFileSync(path.resolve(__dirname, `public/pads/${name}.json`), JSON.stringify(defaultContent))
    return defaultContent

  }

  }
}

export default PadController;