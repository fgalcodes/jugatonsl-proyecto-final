using Dapper;
using MinimalAPI.Models;
using Npgsql;

namespace MinimalAPI.Repositories
{
    public class UsuariosRepository
    {
        private PosgreSQLConfig connectionString;
        public UsuariosRepository(PosgreSQLConfig connectionString)
        {
            this.connectionString = connectionString;
        }

        protected NpgsqlConnection dbConnection()
        {
            return new NpgsqlConnection(connectionString.ConnectionString);
        }
        public async Task<IEnumerable<Usuario>> GetAllUsuarios()
        {
            var db = dbConnection();

            var sql = @"
                        SELECT id, usuario, password
                            FROM public.usuario
                            
                        ";

            return await db.QueryAsync<Usuario>(sql, new { });
        }
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
        public async Task<bool> InsertUsuario(UsuarioSinId usuario)
        {
            var db = dbConnection();

            var sql = @"
                        INSERT INTO public.usuario (usuario, password)
                        VALUES (@usuario, @password)
                        ";

            var result = await db.ExecuteAsync(sql, new { usuario.usuario, usuario.password});
            return result > 0;
        }

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
