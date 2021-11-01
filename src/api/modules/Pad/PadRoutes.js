import express from 'express';


import PadController from './PadController.js'

let router = express.Router();

// import { encrypt, compare } from '../../config/encrypt'

router.put('/:pad', async (req, res) => {
    const { params } = req;
    console.log(`Updating/creating ${params.pad}`)
    
    if (req.body.protected) {
      req.body.password = encrypt(req.body.password)
    }


    const content = await PadController.create(params.pad, req.body)
    res.send(content)
});

router.get('/:pad', (req, res) => {
    const { params } = req;
    console.log(`Returning/creating ${params.pad}`)

    if (!params.pad) {
        res.send();
    }

    res.send(PadController.findOrCreate(params.pad))
})

// router.get('/:pad/:pass', (req, res) => {
//   const { params } = req;
//   console.log(`Returning/getting protected ${params.pad}`)
//   if (!params.pad || !params.pass) {
//       res.status(401).send();
//   }
//   try {
//       const file = JSON.parse(fs.readFileSync(`./public/pads/${params.pad}.json`, 'utf8'));
      

//       const hasPermission = compare(params.pass, file.password)

//       if (!hasPermission) return res.status(401).send()

//       delete file.password

//       res.send(file);
//   } catch(e) {
//     res.send(e)
//   }
// })

export default router;