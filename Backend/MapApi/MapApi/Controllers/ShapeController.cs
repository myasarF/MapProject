using Map.Core.Interfaces;
using Map.Core.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace MapApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShapeController : ControllerBase
    {
        private readonly IGenericRepository<Shapes> _shapeRepository;
        
        public ShapeController(IGenericRepository<Shapes> shapeRepository)
        {
            _shapeRepository = shapeRepository;
        }


        [HttpPost]
        public async Task<IActionResult> Post(Shapes obj)
        {
          
            var shapeObj = new Shapes();
            shapeObj.shapesData = obj.shapesData;
            shapeObj = await _shapeRepository.AddAsync(shapeObj);
       
         
            return Ok(shapeObj);
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
       
            var shapeObj = new Shapes();
            var jeoData="";
            shapeObj = await _shapeRepository.GetAsync();
           
            if (shapeObj != null)
            {
                 jeoData = shapeObj.shapesData;
            }
          //Root lst2 = System.Text.Json.JsonSerializer.Deserialize<Root>(shapeObj.shapesData);
          
            return Ok(jeoData) ;
        }
    }
}
