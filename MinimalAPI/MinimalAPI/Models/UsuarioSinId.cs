using System.Text.Json.Serialization;

namespace MinimalAPI.Models
{
    // Clase usuario sin ID
    public class UsuarioSinId
    {
        public string usuario { get; set; }
        public string password { get; set; }

    }
}
