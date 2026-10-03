import { useState } from 'react';
import estilos from './App.module.css';

const faixas = [
  { classificacao: 'Abaixo do peso', faixa: 'Menor que 18,5', min: 0, max: 18.5 },
  { classificacao: 'Peso normal', faixa: '18,5 a 24,9', min: 18.5, max: 25 },
  { classificacao: 'Sobrepeso', faixa: '25 a 29,9', min: 25, max: 30 },
  { classificacao: 'Obesidade grau I', faixa: '30 a 34,9', min: 30, max: 35 },
  { classificacao: 'Obesidade grau II', faixa: '35 a 39,9', min: 35, max: 40 },
  { classificacao: 'Obesidade grau III', faixa: '40 ou mais', min: 40, max: Infinity },
];

function App() {
  const [altura, setAltura] = useState(0);
  const [peso, setPeso] = useState(0);

  const imc = altura > 0 && peso > 0 ? peso / (altura * altura) : 0;
  const faixaAtual = faixas.find(f => imc >= f.min && imc < f.max);

  return (
    <div className={estilos.container}>
      <h1 className={estilos.titulo}>Calculadora de IMC</h1>

      <form className={estilos.formulario} onSubmit={evento => evento.preventDefault()}>
        <label>
          Altura (m)
          <input
            type="number"
            step="0.01"
            placeholder="Ex: 1.65"
            onChange={evento => setAltura(Number(evento.target.value))}
          />
        </label>

        <label>
          Peso (kg)
          <input
            type="number"
            step="0.1"
            placeholder="Ex: 60"
            onChange={evento => setPeso(Number(evento.target.value))}
          />
        </label>
      </form>

      {imc > 0 && (
        <p className={estilos.resultado}>
          Seu IMC é <strong>{imc.toFixed(1)}</strong> — {faixaAtual.classificacao}
        </p>
      )}

      <table className={estilos.tabela}>
        <thead>
          <tr>
            <th>IMC</th>
            <th>Classificação</th>
          </tr>
        </thead>
        <tbody>
          {faixas.map(f => (
            <tr
              key={f.classificacao}
              className={imc > 0 && f === faixaAtual ? estilos.destaque : ''}
            >
              <td>{f.faixa}</td>
              <td>{f.classificacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;