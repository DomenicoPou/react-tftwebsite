using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TFTReactWebsite.Models
{
    public class TraitDragonConfiguration
    {
        public string key { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string type { get; set; }
        public Set[] sets { get; set; }
        public string innate { get; set; }
    }

    public class Set
    {
        public string style { get; set; }
        public int min { get; set; }
        public int max { get; set; }
    }

}
