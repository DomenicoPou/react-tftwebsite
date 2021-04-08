using Microsoft.AspNetCore.Mvc;
using System;

namespace TFTReactWebsite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImageController : Controller
    {
        [HttpGet("{type}/{set}/{id}/{extensions}")]
        public IActionResult Get(string type, string set, string id, string extensions)
        {
            Byte[] b = System.IO.File.ReadAllBytes(@$"{AppDomain.CurrentDomain.BaseDirectory}/Data/{set}/{type}/{id}.{extensions}");   // You can use your own method over here.         
            return File(b, $"image/{extensions}");
        }
    }
}
