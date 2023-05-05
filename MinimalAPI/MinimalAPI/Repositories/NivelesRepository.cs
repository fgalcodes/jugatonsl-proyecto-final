using Dapper;
using MinimalAPI.Models;
using Npgsql;
using System.Text.Json.Nodes;

namespace MinimalAPI.Repositories
{
    // Repositorio de Sentencias SQL de la tabla Nivel.
    public class NivelesRepository
    {
        private PosgreSQLConfig connectionString;
        public NivelesRepository(PosgreSQLConfig connectionString)
        {
            this.connectionString = connectionString;
        }
        // Método de conexión predeterminado.
        protected NpgsqlConnection dbConnection()
        {
            return new NpgsqlConnection(connectionString.ConnectionString);
        }

        // Método para recuperar todos los usuarios de la tabla.
        public async Task<IEnumerable<Nivel>> GetAllNiveles()
        {
            var db = dbConnection();

            var sql = @"
                        SELECT ""idNivel"", puntos, dificultad, tipo
                            FROM public.niveles
                            
                        ";

            return await db.QueryAsync<Nivel>(sql, new { });
        }

        // Método para recuperar un usuario concreto mediante una ID parametrizada.
        public async Task<Nivel> GetNivel(int id)
        {
            var db = dbConnection();

            var sql = @"
                        SELECT ""idNivel"", puntos, dificultad, tipo
                            FROM public.niveles
                            WHERE ""idNivel"" = @Id
                        ";

            return await db.QueryFirstOrDefaultAsync<Nivel>(sql, new { Id = id });
        }

        // Método para insertar un usuario mediante un objeto parametrizado.
        public async Task<bool> InsertNivel(Nivel nivel)
        {
            var db = dbConnection();

            var sql = @"
                        INSERT INTO public.niveles (""idNivel"", puntos, dificultad, tipo)
                        VALUES (@idNivel, @puntos, @dificultad, @tipo)
                        ";

            var result = await db.ExecuteAsync(sql, new { nivel.idNivel, nivel.puntos, nivel.dificultad, nivel.tipo });
            return result > 0;
        }

        // Método para actualizar un usuario mediante un objeto parametrizado.
        public async Task<bool> UpdateNivel(Nivel nivel)
        {
            var db = dbConnection();

            var sql = @"
                        UPDATE  public.niveles
                        SET puntos = @puntos, dificultad = @dificultad, tipo = @tipo
                        WHERE ""idNivel"" = @idNivel;
                        ";

            var result = await db.ExecuteAsync(sql, new { nivel.puntos, nivel.dificultad, nivel.tipo, nivel.idNivel });
            return result > 0;
        }

        // Método para eliminar un usuario mediante un objeto parametrizado.
        public async Task<bool> DeleteNivel(Nivel nivel)
        {
            var db = dbConnection();

            var sql = @"
                        DELETE FROM public.niveles
                        WHERE ""idNivel"" = @Id;
                        ";

            var result = await db.ExecuteAsync(sql, new { Id = nivel.idNivel });
            return result > 0;
        }
    }

}
