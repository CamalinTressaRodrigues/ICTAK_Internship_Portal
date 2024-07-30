const Reference = require('../model/reference');

exports.getReferences = async (req, res) => {
  // const { topic } = req.params;
  // const materials = await Reference.find({ topic });
  const materials = await Reference.find();
  res.json(materials);
  console.log('reference:',materials)
}

exports.addReference = async (req, res) => {
      const { topic, referenceMaterial,postedDate,status,url } = req.body;
      const newMaterial = new Reference({ topic, referenceMaterial,postedDate,status,url });
      await newMaterial.save();
      console.log(newMaterial)
      res.status(201).json(newMaterial);
    }

  exports.deleteReference = async (req, res) => {
      try {
        const { id } = req.params;
        console.log(`Attempting to delete reference with ID: ${id}`);
        if (!id) {
          return res.status(400).json({ error: 'ID is required' });
        }
        const deletereference = await Reference.findByIdAndDelete(id);
        if (!deletereference) {
          return res.status(404).json({ error: 'Reference material not found' });
        }
        console.log(`Reference with ID: ${id} deleted successfully`);
        res.json({ message: 'Reference Material deleted' });
      } catch (error) {
        console.error(`Error deleting Reference with ID: ${id}`, error);
        res.status(500).json({ error: 'Error deleting reference material' });
      }
    };
    