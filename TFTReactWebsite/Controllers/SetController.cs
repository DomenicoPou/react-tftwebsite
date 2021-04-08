using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TFTReactWebsite.Handlers;
using TFTReactWebsite.Models;

namespace TFTReactWebsite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SetController : Controller
    {
        [HttpGet("all")]
        public List<SetConfiguration> GetAllSetList()
        {
            List<SetConfiguration> retObject = DataReaderHandler<List<SetConfiguration>>.ReadConfig("setConfiguration");
            return retObject;
        }

        [HttpGet("current")]
        public SetConfiguration GetCurrentSet()
        {
            List<SetConfiguration> retObject = DataReaderHandler<List<SetConfiguration>>.ReadConfig("setConfiguration");
            return retObject.FirstOrDefault(x => x.isCurrent);
        }
    }
}
