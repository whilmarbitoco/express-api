const router = require("express").Router()
const { index, getAll, destroy, getOne, update } = require("../controllers/projectController")
const authenticate = require("../middleware/auth")

router.post('/', index)
router.get('/', getAll)
router.delete('/:id', authenticate, destroy)
router.get('/:id', getOne)
router.put('/:id', authenticate, update)


module.exports = router