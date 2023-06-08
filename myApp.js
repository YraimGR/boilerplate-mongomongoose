require('dotenv').config();
const mongoose = require('mongoose');

const mySecret = process.env['MONGO_URI'];
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);;

const createAndSavePerson = (done) => {
  var billGates = new Person({ name: "Bill Gates", age: 56, favoriteFoods: ["eggs", "fish", "fresh fruit"] });

  billGates.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

var arrayOfPeople = [
  { name: "Alejandro", age: 54, favoriteFoods: ["Tacos"] },
  { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
  { name: "Robert", age: 48, favoriteFoods: ["cheese"] }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) console.error(err);
    done(null, data)
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) console.error(err);
    done(null, data)
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) console.error(err);
    done(null, data)
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson)
    })
  })
}

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOne({ name: personName }, (err, person) => {
    if (err) console.error(err);

    person.age = ageToSet;
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson)
    })
  }, { new: true });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => {
    if (err) return console.log(err);
    done(null, person)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({ name: nameToRemove }, (err, people) => {
    if (err) console.error(err);
    done(null, people);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  var people = Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec(function(error, people) {
      if (error) done(error);
      done(null, people)
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
