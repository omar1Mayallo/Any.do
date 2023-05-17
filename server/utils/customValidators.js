//__CHECK(By FieldName)_Field_isUnique__//
export const isUnique = async (val, Model, fieldName) => {
  const fieldExist = await Model.findOne({[fieldName]: val});
  if (fieldExist) {
    throw new Error(`${fieldName} is already exist`);
  }
};

//__CHECK_PASSWORDS_MATCHING__//
export const isPasswordsMatches = (val, req) => {
  if (val !== req.body.password) {
    throw new Error(`Password confirmation does not match password`);
  }
  // Indicates the success of this synchronous custom validator
  return true;
};

//__CHECK(By ID)_Field_ExistInDatabase__//
export const isExistInDB = async (val, Model) => {
  const fieldExist = await Model.findById(val);
  if (!fieldExist) {
    throw new Error(`No item matching this value ${val} in database`);
  }
};
