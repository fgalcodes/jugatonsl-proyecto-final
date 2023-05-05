using System.Text.Json.Serialization;

namespace MinimalAPI.Models
{
    // Clase usuario
    public class Usuario
    {
        public int id { get; set; }
        public string usuario { get; set; }
        public string password { get; set; }

    }
}
