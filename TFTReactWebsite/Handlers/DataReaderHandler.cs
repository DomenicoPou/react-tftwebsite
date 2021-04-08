using Newtonsoft.Json;
using System;
using System.IO;

namespace TFTReactWebsite.Handlers
{
    public class DataReaderHandler<T>
    {

        /// <summary>
        /// Gets the configuration file full path depending on the configures type
        /// </summary>
        /// <returns>{ApplicationLocation}/Config/{TypeName}.json</returns>
        private static string GetSetConfigFile(string set, string type)
        {
            // Return the configuration file
            return $@"{AppDomain.CurrentDomain.BaseDirectory}/Data/{set}/{type}.json";
        }

        /// <summary>
        /// Read the created configuration file.
        /// </summary>
        /// <returns>The object of the configuration type</returns>
        public static T ReadSetConfig(string set, string type)
        {
            // Get the congfiguration File
            string configFile = GetSetConfigFile(set, type);

            // Deserialize Json to Object and Return It
            using (var fileStream = new FileStream(configFile, FileMode.Open, FileAccess.Read, FileShare.Read))
            using (var textReader = new StreamReader(fileStream))
            {
                string content = textReader.ReadToEnd();
                return JsonConvert.DeserializeObject<T>(content);
            }
        }


        /// <summary>
        /// Gets the configuration file full path depending on the configures type
        /// </summary>
        /// <returns>{ApplicationLocation}/Config/{TypeName}.json</returns>
        private static string GetConfigFile(string type)
        {
            // Return the configuration file
            return $@"{AppDomain.CurrentDomain.BaseDirectory}/Data/{type}.json";
        }

        /// <summary>
        /// Read the created configuration file.
        /// </summary>
        /// <returns>The object of the configuration type</returns>
        public static T ReadConfig(string type)
        {
            // Get the congfiguration File
            string configFile = GetConfigFile(type);

            // Deserialize Json to Object and Return It
            using (var fileStream = new FileStream(configFile, FileMode.Open, FileAccess.Read, FileShare.Read))
            using (var textReader = new StreamReader(fileStream))
            {
                string content = textReader.ReadToEnd();
                return JsonConvert.DeserializeObject<T>(content);
            }
        }
    }
}
