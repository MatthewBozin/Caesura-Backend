import { Router } from 'express'
const router = Router()
const poemsController = require('../controllers/poems')

router.get('/getPoem', poemsController.getPoem)

router.get('/getFeed', poemsController.getFeed)

router.post('/createPoem', poemsController.createPoem)

router.post('/deletePoem', poemsController.deletePoem)

router.get('/poemData/', poemsController.getPoemData)

router.put('/snap', poemsController.snap)

export default router