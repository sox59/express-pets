
const { ObjectId } = require("mongodb")
const sanitizeHtml = require("sanitize-html")
const petsCollection = require("../db").db().collection("pets")


const sanitizeOptions = {
  allowedTags: [],
  allowedAttributes: {}
}


exports.submitContact = async function (req, res) {


  if (req.body.secret.toUpperCase() !== "PUPPY") {

    console.log("Spam Detected")
    return res.json({ message: "Sorry!" })
  }

  if (!ObjectId.isValid(req.body.petId)) {

    console.log("Invalid ID Detected")
    return res.json({ message: "Sorry!" })

  }

  const doesPetExist = await petsCollection.findOne({ _id: new ObjectId(req.body.petId) })

  if (!doesPetExist) {

    console.log("Pet does not exist")
    return res.json({ message: "Sorry!" })

  }


  const ourObject = {

    name: sanitizeHtml(req.body.name, sanitizeOptions),
    email: sanitizeHtml(req.body.email, sanitizeOptions),
    comment: sanitizeHtml(req.body.comment, sanitizeOptions)

  }

  console.log(ourObject)
  res.send("Thanks for the data")


}