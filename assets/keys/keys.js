module.exports = function(status)  {
  if (!status) {
    status = "development";
  }

  return {
          status:status
        }
}
