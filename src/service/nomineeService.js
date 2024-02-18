const Nominee = require('../models/Nominee');
const NomineeRepository = require('../repository/NomineeRepository');
const { v4: uuidv4 } = require('uuid');

async function addNominees (userId, nominees) {
  const nomineeDocuments = nominees.map(nominee => ({ _id: uuidv4(), userId: userId, name: nominee.name, phone: nominee.phone, address: nominee.address, email: nominee.email, relation: nominee.relation }));
  return NomineeRepository.addNominees(nomineeDocuments);
};

async function updateNominees(nominees) {
  return Promise.all(nominees.map(nominee =>
    NomineeRepository.updateNominee(nominee._id, nominee)
  ));
};

async function deleteNominees (nomineeIds) {
  return NomineeRepository.deleteNominees(nomineeIds);
};

async function getNomineesByUserId(userId) {
    try {
        const nominees = await NomineeRepository.getNomineesByUserId(userId);
        return nominees;
    } catch (error) {
        throw error;
    }
}

module.exports = {
  addNominees,
  updateNominees,
  deleteNominees,
  getNomineesByUserId
};
