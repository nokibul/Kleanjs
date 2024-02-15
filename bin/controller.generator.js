

let content = '';

let capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function generateControllers(moduleName) {
  let methods = ['createOne', 'getOne', 'getMany', 'update', 'deleteOne', 'deleteMany'];
  for (const method of methods) {
    const controllerName = `${method}${capitalizeFirstLetter(moduleName)}Ctrl`;
    console.log(controllerName)
    const serviceName = `${method}${capitalizeFirstLetter(moduleName)}`;
    const err = 'err.stack'
    const controller = `const ${controllerName} = async (req, res, next) => {
        try {
          const response = await ${serviceName}({
            userId: req.user._id,
            companyId: req.headers.companyId,
            projectId: req.query.pid,
          });
          if (!response.success) {
            return sendErrorResponse(res, response.status, response.type, {
              message: response.message,
            });
          }
      
          return sendJSONresponse(res, 200, response.data);
        } catch (err) {
          errorLog('${capitalizeFirstLetter(method)} ${capitalizeFirstLetter(moduleName)} template error');
          next(err);
        }
      };
      \n\n
    `
    content += controller;
  }
  return content;
}

  
module.exports = {
  generateControllers,
}