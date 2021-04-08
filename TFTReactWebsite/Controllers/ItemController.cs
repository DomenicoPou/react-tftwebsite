using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using TFTReactWebsite.Handlers;
using TFTReactWebsite.Models;

namespace TFTReactWebsite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemController : Controller
    {
        public ItemController()
        {

        }

        [HttpGet("all/{set}")]
        public Dictionary<string, ItemDataConfiguration> GetPerfectChampionList(string set)
        {
            // TODO: Do exactly what you did for champions for images....
            try
            {
                Dictionary<string, ItemDataConfiguration> itemDataConfig
                    = DataReaderHandler<List<ItemDataConfiguration>>.ReadSetConfig(set, "ItemConfiguration").ToDictionary(x => x.name);

                Dictionary<string, ItemDragonConfiguration> itemDragonConfig
                    = DataReaderHandler<List<ItemDragonConfiguration>>.ReadSetConfig(set, "ItemConfiguration").ToDictionary(x => x.name);

                foreach (string key in itemDataConfig.Keys)
                {
                    var baseUrl = "https://" + Request.Host.Value;
                    if (itemDragonConfig.ContainsKey(key))
                    {
                        itemDataConfig[key].image = $"{baseUrl}/image/items/{set}/{itemDragonConfig[key].id}";
                    }
                }
                return itemDataConfig;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
