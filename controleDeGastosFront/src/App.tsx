import { useEffect, useState, type FormEvent } from 'react'
import axios from 'axios'
import './App.css'

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: string | number; 
  pessoaId: number;
  pessoa?: Pessoa; 
}

interface PessoaTotal {
  pessoaId: number;
  nome: string;
  idade: number;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

interface ResumoTotais {
  pessoas: PessoaTotal[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoGeral: number;
}

function App() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [resumoTotais, setResumoTotais] = useState<ResumoTotais | null>(null);
  
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  const [transacaoDescricao, setTransacaoDescricao] = useState('');
  const [transacaoValor, setTransacaoValor] = useState('');
  const [transacaoTipo, setTransacaoTipo] = useState('Despesa');
  const [transacaoPessoaId, setTransacaoPessoaId] = useState('');

  const buscarPessoas = () => {
    axios.get('/api/Pessoas')
      .then(res => setPessoas(res.data))
      .catch(err => console.error(err));
  };

  const buscarTransacoes = () => {
    axios.get('/api/Transacao')
      .then(res => setTransacoes(res.data))
      .catch(err => console.error(err));
  };

  // busca o resumo de totais (por pessoa + geral) calculado no back-end
  const buscarTotais = () => {
    axios.get('/api/Pessoas/totais')
      .then(res => setResumoTotais(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    buscarPessoas();
    buscarTransacoes();
    buscarTotais();
  }, []);

  const cadastrarPessoa = (e: FormEvent) => {
    e.preventDefault();
    axios.post('/api/Pessoas', {
      nome: nome,
      idade: Number(idade)
    })
    .then(() => {
      setNome(''); 
      setIdade(''); 
      buscarPessoas(); 
      buscarTotais();
    })
    .catch(err => console.error(err));
  };

  const deletarPessoa = (id: number) => {
    axios.delete(`/api/Pessoas/${id}`)
      .then(() => {
        buscarPessoas();
        // cascade no bd ja apaga as transacoes, so preciso atualizar a tela
        buscarTransacoes(); 
        buscarTotais();
      }) 
      .catch(err => console.error(err));
  };

  const cadastrarTransacao = (e: FormEvent) => {
    e.preventDefault();
    
    if (!transacaoPessoaId) {
      alert("Selecione uma pessoa pra transação.");
      return;
    }

    axios.post('/api/Transacao', {
      descricao: transacaoDescricao,
      valor: parseFloat(transacaoValor),
      tipo: transacaoTipo === 'Despesa' ? 1 : 0, 
      pessoaId: Number(transacaoPessoaId)
    })
    .then(() => {
      setTransacaoDescricao('');
      setTransacaoValor('');
      setTransacaoTipo('Despesa');
      setTransacaoPessoaId('');
      buscarTransacoes();
      buscarTotais();
    })
    .catch(erro => {
      if (erro.response && erro.response.status === 400) {
        // pega a string direta de erro ou trata o json
        const msg = typeof erro.response.data === 'string' 
          ? erro.response.data 
          : JSON.stringify(erro.response.data.errors || erro.response.data, null, 2);
          
        alert(`Erro: ${msg}`);
      } else {
        console.error(erro);
        alert("Falha ao salvar transação.");
      }
    });
  };

  // consolidado geral vem do back-end (GET /api/Pessoas/totais), que soma os totais de todas as pessoas
  const totalReceitas = resumoTotais?.totalGeralReceitas ?? 0;
  const totalDespesas = resumoTotais?.totalGeralDespesas ?? 0;
  const saldoLiquido = resumoTotais?.saldoGeral ?? 0;

  return (
    <div className="container">
      <h1 className="titulo">💸 Controle de Gastos</h1>
      
      {/* PAINEL DE TOTAIS GERAIS */}
      <div className="painel-totais">
        <div className="card-total">
          <h3>Total de Receitas</h3>
          <p className="cor-positiva">R$ {totalReceitas.toFixed(2)}</p>
        </div>
        <div className="card-total">
          <h3>Total de Despesas</h3>
          <p className="cor-negativa">R$ {totalDespesas.toFixed(2)}</p>
        </div>
        <div className="card-total">
          <h3>Saldo Líquido</h3>
          <p className={saldoLiquido >= 0 ? 'cor-positiva' : 'cor-negativa'}>
            R$ {saldoLiquido.toFixed(2)}
          </p>
        </div>
      </div>

      {/* RESUMO DE TOTAIS POR PESSOA */}
      <div className="card">
        <h2>Resumo de Totais por Pessoa</h2>
        {!resumoTotais || resumoTotais.pessoas.length === 0 ? (
          <p className="lista-vazia">Nenhuma pessoa cadastrada.</p>
        ) : (
          <table className="tabela-resumo">
            <thead>
              <tr>
                <th>Pessoa</th>
                <th>Receitas</th>
                <th>Despesas</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {resumoTotais.pessoas.map(p => (
                <tr key={p.pessoaId}>
                  <td>{p.nome}</td>
                  <td className="cor-positiva">R$ {p.totalReceitas.toFixed(2)}</td>
                  <td className="cor-negativa">R$ {p.totalDespesas.toFixed(2)}</td>
                  <td className={p.saldo >= 0 ? 'cor-positiva' : 'cor-negativa'}>R$ {p.saldo.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Total Geral</strong></td>
                <td className="cor-positiva"><strong>R$ {totalReceitas.toFixed(2)}</strong></td>
                <td className="cor-negativa"><strong>R$ {totalDespesas.toFixed(2)}</strong></td>
                <td className={saldoLiquido >= 0 ? 'cor-positiva' : 'cor-negativa'}><strong>R$ {saldoLiquido.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
      
      <div className="grid-layout">
        
        {/* LADO ESQUERDO: PESSOAS */}
        <div className="coluna">
          <div className="card">
            <h2>Cadastrar Pessoa</h2>
            <form onSubmit={cadastrarPessoa} className="form-group">
              <input type="text" placeholder="Nome completo" className="input-padrao" value={nome} onChange={e => setNome(e.target.value)} required />
              <input type="number" placeholder="Idade" className="input-padrao" value={idade} onChange={e => setIdade(e.target.value)} required />
              <button type="submit" className="btn-sucesso">Cadastrar Pessoa</button>
            </form>
          </div>

          <h2>Pessoas Cadastradas</h2>
          {pessoas.length === 0 ? <p className="lista-vazia">Nenhuma pessoa cadastrada.</p> : (
            <ul className="lista">
              {pessoas.map(pessoa => (
                <li key={pessoa.id} className="item-pessoa">
                  <span><strong>{pessoa.nome}</strong> ({pessoa.idade} anos)</span>
                  <button onClick={() => deletarPessoa(pessoa.id)} className="btn-perigo">Excluir</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* LADO DIREITO: TRANSAÇÕES */}
        <div className="coluna">
          <div className="card">
            <h2>Cadastrar Transação</h2>
            <form onSubmit={cadastrarTransacao} className="form-group">
              <select className="input-padrao" value={transacaoPessoaId} onChange={e => setTransacaoPessoaId(e.target.value)} required>
                <option value="">-- Selecione a Pessoa --</option>
                {pessoas.map(pessoa => (
                  <option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>
                ))}
              </select>

              <input type="text" placeholder="Descrição" className="input-padrao" value={transacaoDescricao} onChange={e => setTransacaoDescricao(e.target.value)} required />
              <input type="number" step="0.01" placeholder="Valor (R$)" className="input-padrao" value={transacaoValor} onChange={e => setTransacaoValor(e.target.value)} required />
              
              <select className="input-padrao" value={transacaoTipo} onChange={e => setTransacaoTipo(e.target.value)}>
                <option value="Despesa">Despesa</option>
                <option value="Receita">Receita</option>
              </select>

              <button type="submit" className="btn-primario">Gravar Transação</button>
            </form>
          </div>

          <h2>Lista de Transações</h2>
          {transacoes.length === 0 ? <p className="lista-vazia">Nenhuma transação cadastrada.</p> : (
            <ul className="lista">
              {transacoes.map(t => {
                const dono = pessoas.find(p => p.id === t.pessoaId);
                const isReceita = t.tipo === "Receita" || t.tipo === 0;
                
                return (
                  <li key={t.id} className={`item-transacao ${isReceita ? 'borda-receita' : 'borda-despesa'}`}>
                    <div className="transacao-header">
                      <strong>{t.descricao}</strong>
                      <span className={isReceita ? 'texto-receita' : 'texto-despesa'}>R$ {t.valor.toFixed(2)}</span>
                    </div>
                    <div className="transacao-detalhes">
                      Pessoa: {dono?.nome || 'Desconhecida'} | Tipo: {isReceita ? 'Receita' : 'Despesa'}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}

export default App