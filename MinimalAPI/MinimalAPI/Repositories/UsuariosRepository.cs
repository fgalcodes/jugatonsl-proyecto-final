using Dapper;
using MinimalAPI.Models;
using Npgsql;
using System.Text.Json.Nodes;

namespace MinimalAPI.Repositories
{
    // Repositorio de Sentencias SQL de la tabla Usuario.
    public class UsuariosRepository
    {
        private PosgreSQLConfig connectionString;
        public UsuariosRepository(PosgreSQLConfig connectionString)
        {
            this.connectionString = connectionString;
        }

        // Método de conexión predeterminado.
        protected NpgsqlConnection dbConnection()
        {
            return new NpgsqlConnection(connectionString.ConnectionString);
        }

        // Método para recuperar todos los usuarios de la tabla.
        public async Task<IEnumerable<Usuario>> GetAllUsuarios()
        {
            var db = dbConnection();

            var sql = @"
                        SELECT id, usuario, password
                            FROM public.usuario
                            
                        ";

            return await db.QueryAsync<Usuario>(sql, new { });
        }

        // Método para recuperar un usuario concreto mediante una ID parametrizada.
        public async Task<Usuario> GetUsuario(int id)
        {
            var db = dbConnection();

            var sql = @"
                        SELECT id, usuario, password
                            FROM public.usuario
                            WHERE id = @Id
                        ";

            return await db.QueryFirstOrDefaultAsync<Usuario>(sql, new { Id = id });
        }

        // Método para insertar un usuario mediante un objeto parametrizado.
        public async Task<bool> InsertUsuario(UsuarioSinId usuario)
        {
            var db = dbConnection();

            var sql = @"
                        INSERT INTO public.usuario (usuario, password)
                        VALUES (@usuario, @password)
                        ";

            var result = await db.ExecuteAsync(sql, new { usuario.usuario, usuario.password });
            return result > 0;
        }

        // Método para actualizar un usuario mediante un objeto parametrizado.
        public async Task<bool> UpdateUsuario(Usuario usuario)
        {
            var db = dbConnection();

            var sql = @"
                        UPDATE  public.usuario
                        SET usuario = @usuario,
                            password  =  @password
                        WHERE id = @id;
                        ";

            var result = await db.ExecuteAsync(sql, new { usuario.usuario, usuario.password, usuario.id });
            return result > 0;
        }

        // Método para eliminar un usuario mediante un objeto parametrizado.
        public async Task<bool> DeleteUsuario(Usuario usuario)
        {
            var db = dbConnection();

            var sql = @"
                        DELETE FROM public.usuario
                        WHERE id = @Id;
                        ";

            var result = await db.ExecuteAsync(sql, new { Id = usuario.id });
            return result > 0;
        }

    }

}
