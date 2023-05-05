using Dapper;
using MinimalAPI.Models;
using Npgsql;

namespace MinimalAPI.Repositories
{
    // Repositorio de sentencias SQL de la tabla Perfil
    public class PerfilesRepository
    {
        private PosgreSQLConfig connectionString;
        public PerfilesRepository(PosgreSQLConfig connectionString)
        {
            this.connectionString = connectionString;
        }

        // Método de conexión prederterminado.
        protected NpgsqlConnection dbConnection()
        {
            return new NpgsqlConnection(connectionString.ConnectionString);
        }

        // Método para recuperar todos los Perfiles de la tabla.
        public async Task<IEnumerable<Perfil>> GetAllPerfiles()
        {
            var db = dbConnection();

            var sql = @"
                        SELECT id_usuario, ""nombrePerfil"", ubicacion, puntuacion, intentos, nivel
                            FROM public.perfil
                            
                        ";

            return await db.QueryAsync<Perfil>(sql, new { });
        }

        // Método para recuperar un perfil concreto mediante una ID parametrizada.
        public async Task<Perfil> GetPerfil(int id)
        {
            var db = dbConnection();

            var sql = @"
                        SELECT id_usuario, ""nombrePerfil"", ubicacion, puntuacion, intentos, nivel
                            FROM public.perfil
                            WHERE id_usuario = @Id
                        ";

            return await db.QueryFirstOrDefaultAsync<Perfil>(sql, new { Id = id });
        }

        // Método para actualizar un perfil mediante un objeto parametrizado.
        public async Task<bool> UpdatePerfil(Perfil perfil)
        {
            var db = dbConnection();

            var sql = @"
                        UPDATE  public.perfil
                        SET ""nombrePerfil"" = @nombrePerfil,
                            ubicacion  =  @ubicacion,
                            puntuacion = @puntuacion,
                            intentos = @intentos,
                            nivel = @nivel
                        WHERE id_usuario = @id_usuario;
                        ";

            var result = await db.ExecuteAsync(sql, new { perfil.id_usuario, perfil.nombrePerfil, perfil.ubicacion, perfil.puntuacion, perfil.intentos, perfil.nivel });
            return result > 0;
        }

    }
}
