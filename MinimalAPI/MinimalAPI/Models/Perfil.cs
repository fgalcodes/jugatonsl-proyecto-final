namespace MinimalAPI.Models
{
    public class Perfil
    {
        // Clase perfil
        public int id_usuario { get; set; }
        public string nombrePerfil { get; set; }
        public string ubicacion { get; set; }
        public int puntuacion { get; set; }
        public int intentos { get; set; }
        public int nivel { get; set; }

    }
}
