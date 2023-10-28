import MahasiswaModel from "../models/mahasiswa-model.js";

export const Read = async (req, res) => {
  try {
    const mahasiswa = await MahasiswaModel.findAll({
      attributes: ["id", "name", "nim", "picture_path", "major", "createdAt", "updatedAt"],
      order: [["createdAt", "DESC"]]
    });
    res.json(mahasiswa);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const ReadById = async (req, res) => {
  const id = req.params.id
  try {
    const mahasiswa = await MahasiswaModel.findOne({
      attributes: ["id", "name", "nim", "picture_path", "major"],
      where: {
        id: id
      }
    })
    res.json(mahasiswa);

  } catch (error) {
    res.json({ message: error.message });
  }
};

export const Create = async (req, res) => {
  const min = 10000;
  const max = 99999;

  const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

  const id = randomInt;
  const name = req.body.name;
  const nim = req.body.nim;
  const picture = req.body.picture;
  const major = req.body.major;

  var error = {};

  if (!name) {
    error['name'] = "Nama mahasiswa tidak boleh kosong";
  }

  if (!nim) {
    error['nim'] = "nim mahasiswa tidak boleh kosong";
  }

  if (!picture) {
    error['image'] = "Foto mahasiswa tidak boleh kosong ya";
  }

  if (!major) {
    error['major'] = "major tidak boleh kosong";
  }

  if (Object.keys(error).length > 0) {
    return res
      .status(400)
      .json({ msg: error });
  }

  try {
    await MahasiswaModel.create({
      id: id,
      name: name,
      nim: nim,
      picture_path: picture,
      major: major,
    });

    const data = await MahasiswaModel.findOne({ where: { id: id } })

    res.status(200).json({ status: 200, msg: "Success Insert Data Mahasiswa", data: data });
  } catch (error) {
    console.log(error);
  }
};


export const Update = async (req, res) => {

  const id = req.body.id;
  const name = req.body.name;
  const nim = req.body.nim;
  const picture = req.body.picture;
  const major = req.body.major;

  var error = {};

  if (!name) {
    error['name'] = "Nama mahasiswa tidak boleh kosong";
  }

  if (!nim) {
    error['nim'] = "nim mahasiswa tidak boleh kosong";
  }

  if (!picture) {
    error['image'] = "Foto mahasiswa tidak boleh kosong ya";
  }

  if (!major) {
    error['major'] = "major tidak boleh kosong";
  }

  if (Object.keys(error).length > 0) {
    return res
      .status(400)
      .json({ msg: error });
  }

  try {
    await MahasiswaModel.update({
      name: name,
      nim: nim,
      picture_path: picture,
      major: major,
    }, {
      where: {
        id: id
      }
    });

    const result = await MahasiswaModel.findOne(
      {
        where: {
          id: id
        }
      });

    res.status(200).json({ msg: "Success Update Mahasiswa", result });
  } catch (error) {
    console.log(error);
  }
};

export const Delete = async (req, res) => {
  const id = req.body.id;

  try {
    await MahasiswaModel.destroy({ where: { id: id } });
    res.status(200).json({ msg: "Success Delete Mahasiswa" });

  } catch (error) {
    res.json({ message: error.message });
  }
};
