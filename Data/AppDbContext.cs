using Microsoft.EntityFrameworkCore;
using ControleDeGastos.Models;
    
namespace ControleDeGastos.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Transacao> Transacoes { get; set; }
        public DbSet<Pessoa> Pessoas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Transacao>()
            .HasOne(t => t.Pessoa)
            .WithMany(p => p.Transacoes) 
            .HasForeignKey(t => t.PessoaId) //chave estrangeira 
            .OnDelete(DeleteBehavior.Cascade); // garante que vai deletar os registros ao deletar uma pessoa
        }
    }
}