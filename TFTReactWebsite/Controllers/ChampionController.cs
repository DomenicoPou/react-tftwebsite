using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TFTReactWebsite.Handlers;

namespace TFTReactWebsite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChampionController : Controller
    {

        public ChampionController()
        {

        }


        [HttpGet("Perfects")]
        public List<List<string>> GetPerfectChampionList()
        {
            List<List<string>> str = DataReaderHandler<List<List<string>>>.ReadConfig("Fates Festival of Beasts", "PerfectConfiguration");
            return str.Where(x => x != null).ToList();
        }
    }
}
