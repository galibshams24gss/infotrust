//trim all the keys of an json object and return back the object
exports.trimJsonObjectKeys = (obj) => {
  return JSON.parse(JSON.stringify(obj).replace(/"\s+|\s+"/g,'"'))
};
