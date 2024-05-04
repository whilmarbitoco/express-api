const db = require("../models");

async function index(req, res) {
  if (!req.files || !req.files.hello) {
    return res.status(400).send("No file uploaded.");
  }

  const uploadedFile = req.files.hello;

  if (!uploadedFile.mimetype.startsWith("image/png")) {
    return res.status(400).send("Uploaded file is not a PNG image.");
  }

  const newName = "wb2c0-" + Date.now() + "-" + Math.round(Math.random() * 1e9) + ".png"

  try {
     await uploadedFile.mv(`./uploads/${newName}`)

    const tmp = {
      name: req.body.name,
      description: req.body.description,
      image: `uploads/${newName}`,
      technologies: {"tech": req.body.technologies}
    }

    const result = await db.Project.create(tmp)

    res.send(result)

  } catch (e) {
    res.status(500).json({error: e})
  }


}

async function destroy(req, res) {
  const { id } = req.params

  const result = await db.Project.findOne({where: { id }})
  if (!result) {
    res.status(404).json({error: "project not found"})
  }
  const destroy = result.destroy()
  res.status(200).json({message: "project delete successfully"})


}

async function getOne(req, res) {
  const { id } = req.params

  const result = await db.Project.findOne({where: { id }})
  if (!result) {
    res.status(404).json({error: "project not found"})
  }

  res.status(200).send(result)


}


async function getAll(req, res) {
  const projects = await db.Project.findAll();
  
  res.send(projects);
}

module.exports = {
  index,
  getAll,
  destroy,
  getOne
};
