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
    public class ChampionController : Controller
    {

        public ChampionController()
        {

        }


        [HttpGet("perfects/{set}")]
        public List<List<string>> GetPerfectChampionList(string set)
        {
            List<List<string>> str = DataReaderHandler<List<List<string>>>.ReadSetConfig(set, "PerfectConfiguration");
            return str.Where(x => x != null).ToList();
        }

        [HttpGet("all/{set}")]
        public Dictionary<string, ChampionDataConfiguration> GetChampionList(string set)
        {
            try
            {
                Dictionary<string, ChampionDataConfiguration> champData
                    = DataReaderHandler<List<ChampionDataConfiguration>>.ReadSetConfig(set, "ChampConfiguration").ToDictionary(x => x.name);

                Dictionary<string, ChampionDragonConfiguration> champDragon
                    = DataReaderHandler<List<ChampionDragonConfiguration>>.ReadSetConfig(set, "champions").ToDictionary(x => x.name);

                List<TraitTier> traitTierList
                    = DataReaderHandler<List<TraitTier>>.ReadSetConfig(set, "TraitTierList");

                List<ChampionTier> championTierList
                    = DataReaderHandler<List<ChampionTier>>.ReadSetConfig(set, "ChampTierList");

                foreach (string key in champData.Keys)
                {
                    var baseUrl = "https://" + Request.Host.Value;
                    if (MatchChampion(champDragon, key, out string match))
                    {
                        champData[key].image = $"{baseUrl}/image/champions/{set}/{champDragon[match].championId}/png";
                    }

                    var imagesList = new List<string>();
                    foreach (string trait in champData[key].traits)
                    {
                        imagesList.Add($"{baseUrl}/image/traits/{set}/{trait.Replace(" ", "")}/png");
                    }
                    champData[key].traitImages = imagesList.ToArray();
                    champData[key].value = CalculateValue(champData[key], championTierList);
                }
                return champData;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private int CalculateValue(ChampionDataConfiguration championDataConfiguration, List<ChampionTier> championTierList)
        {
            int retVal = 0;
            foreach (ChampionTier champTier in championTierList)
            {
                foreach (string champ in champTier.champions)
                {
                    if (championDataConfiguration.name.ToLower().Contains(champ.ToLower()))
                    {
                        retVal += champTier.value;
                        break;
                    }
                }
            }

            return retVal;
        }


        // KEY         = DRAGON 
        // TwistedFate = Twisted Fate
        // Nunu        = Nunu & Willump
        private bool MatchChampion(Dictionary<string, ChampionDragonConfiguration> champDragon, string key, out string match)
        {
            match = "";
            foreach (string dragonKey in champDragon.Keys)
            {
                if (dragonKey.ToLower().Replace(" ", "").Contains(key.Replace(" ", "").ToLower()))
                {
                    match = dragonKey;
                    return true;
                }
            }
            return false;
        }
    }
}
