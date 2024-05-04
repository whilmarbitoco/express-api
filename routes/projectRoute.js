const router = require("express").Router()
const { index, getAll, destroy, getOne } = require("../controllers/projectController")


router.post('/', index)
router.get('/', getAll)
router.delete('/:id', destroy)
router.get('/:id', getOne)


module.exports = router