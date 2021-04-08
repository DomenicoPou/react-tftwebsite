using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TFTReactWebsite.Handlers;
using TFTReactWebsite.Models;

namespace TFTReactWebsite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TraitController : Controller
    {
        public TraitController()
        {

        }


        [HttpGet("{set}")]
        public List<TraitDragonConfiguration> GetPerfectChampionList(string set)
        {
            List<TraitDragonConfiguration> config = DataReaderHandler<List<TraitDragonConfiguration>>.ReadSetConfig(set, "traits");
            return config;
        }
    }
}
