const AppError=require("../utils/AppError");
const CatchAsync=require("../utils/CatchAsync");
const APIFeatures=require("../utils/APIFeature");
exports.CreateDoc=(Model)=>{
return CatchAsync(async (req,res,next)=>{
  
const doc=await Model.create(req.body)

res.status(200).json({
    status:"success",
    message:"doc created successfully",
   doc
})
})
}
exports.UpdateDoc=(Model)=>{
    return CatchAsync(async (req,res,next)=>{
    const doc=await Model.findByIdAndUpdate(req.params.id,req.body,{runValidators:true,new:true})
    res.status(200).json({
        status:"success",
        message:"doc updated successfully",
       doc
    })
    })
    }
    exports.GetDoc=(Model,popOptions)=>{
        return CatchAsync(async (req,res,next)=>{
            let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
        const doc=await query;
        if (!doc) {
            return next(new AppError(404,'No document found with that ID'));
          }
        res.status(200).json({
            status:"success",
            message:"doc extracted successfully",
           doc
        })
        })
        }
        exports.GetAllDoc = (Model) => {
          return CatchAsync(async (req, res, next) => {
            let filter = {};
            if (req.params.pizzaId) filter = { Pizza: req.params.pizzaId };
        
            // Get the total count of documents
            const totalCount = await Model.countDocuments(filter);
        
            // Apply query features (filter, sort, limit fields, paginate)
            const features = new APIFeatures(Model.find(filter), req.query)
              .filter()
              .sort()
              .limitFeilds()
              .paginate();
            const doc = await features.query;
        
            // SEND RESPONSE
            res.status(200).json({
              status: 'success',
              results: doc.length,
              totalCount, // Include the total count in the response
              data: {
                data: doc
              }
            });
          });
        };
        
        exports.DeleteDoc=(Model)=>{
            return CatchAsync(async (req,res,next)=>{
            const doc=await Model.findByIdAndDelete(req.params.id)
            if (!doc) {
                return next(new AppError(404,'No document found with that ID'));
              }
            res.status(204).json({
                status:"success",
                message:"doc deleted successfully",
               doc
            })
            })
            }