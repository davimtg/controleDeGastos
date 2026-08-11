namespace ControleDeGastos.Models
{
    
    public class Pessoa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; }


        public List<Transacao> Transacoes { get; set; } = new List<Transacao>();
    }
}