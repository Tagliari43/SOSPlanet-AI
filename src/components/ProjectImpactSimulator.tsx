import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { BarChart, Droplets, Sun, Thermometer, TreePine } from 'lucide-react';

interface SimulationParams {
  temperatura: number;
  umidade: number;
  luzSolar: number;
  chuva: number;
  dias: number;
}

interface SimulationResult {
  alturaFinal: number;
  saudeFinal: number;
}

const ProjectImpactSimulator: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>({
    temperatura: 26,
    umidade: 80,
    luzSolar: 6,
    chuva: 5,
    dias: 90,
  });

  const handleParamChange = (param: keyof SimulationParams) => (value: number[]) => {
    setParams(prev => ({ ...prev, [param]: value[0] }));
  };

  const simulationResult = useMemo<SimulationResult>(() => {
    // Lógica do BioSimulator traduzida para TypeScript
    const fatorTemp = 1 + (params.temperatura - 25) * 0.005;
    const fatorUmidade = 1 + (params.umidade - 70) * 0.002;
    const fatorLuz = 1 + (params.luzSolar - 5) * 0.01;
    const fatorChuva = 1 + (params.chuva - 5) * 0.015;

    // Simulação simplificada do crescimento
    const alturaInicial = 10; // cm
    let crescimentoDiario = 0.1 * fatorTemp * fatorUmidade * fatorLuz * fatorChuva;
    crescimentoDiario = Math.max(0, crescimentoDiario); // Garante que não haja crescimento negativo

    const alturaFinal = alturaInicial + (crescimentoDiario * params.dias);
    const saudeFinal = 100 * fatorTemp * fatorUmidade; // Saúde é afetada por extremos

    return {
      alturaFinal: parseFloat(alturaFinal.toFixed(2)),
      saudeFinal: Math.min(100, Math.max(0, parseFloat(saudeFinal.toFixed(2)))),
    };
  }, [params]);

  return (
    <div className="p-4 bg-slate-50 dark:bg-gray-900/50 rounded-lg border dark:border-gray-700">
      <div className="space-y-6">
        <div>
          <Label htmlFor="dias" className="flex items-center gap-2 mb-2">
            <BarChart className="h-4 w-4" /> Período da Simulação: <strong>{params.dias} dias</strong>
          </Label>
          <Slider id="dias" defaultValue={[90]} min={30} max={365} step={1} onValueChange={handleParamChange('dias')} />
        </div>
        <div>
          <Label htmlFor="temperatura" className="flex items-center gap-2 mb-2">
            <Thermometer className="h-4 w-4" /> Temperatura Média: <strong>{params.temperatura}°C</strong>
          </Label>
          <Slider id="temperatura" defaultValue={[26]} min={15} max={40} step={1} onValueChange={handleParamChange('temperatura')} />
        </div>
        <div>
          <Label htmlFor="umidade" className="flex items-center gap-2 mb-2">
            <Droplets className="h-4 w-4" /> Umidade Relativa: <strong>{params.umidade}%</strong>
          </Label>
          <Slider id="umidade" defaultValue={[80]} min={40} max={100} step={1} onValueChange={handleParamChange('umidade')} />
        </div>
        <div>
          <Label htmlFor="luzSolar" className="flex items-center gap-2 mb-2">
            <Sun className="h-4 w-4" /> Horas de Sol/dia: <strong>{params.luzSolar}h</strong>
          </Label>
          <Slider id="luzSolar" defaultValue={[6]} min={2} max={12} step={0.5} onValueChange={handleParamChange('luzSolar')} />
        </div>
        <div>
          <Label htmlFor="chuva" className="flex items-center gap-2 mb-2">
            <TreePine className="h-4 w-4" /> Média de Chuva/dia: <strong>{params.chuva}mm</strong>
          </Label>
          <Slider id="chuva" defaultValue={[5]} min={0} max={20} step={0.5} onValueChange={handleParamChange('chuva')} />
        </div>
      </div>

      <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-inner">
        <h4 className="font-semibold text-lg text-center mb-4 text-forest-700 dark:text-forest-300">Resultado da Simulação</h4>
        <div className="flex justify-around text-center">
          <div>
            <p className="text-sm text-muted-foreground">Altura Estimada</p>
            <p className="text-2xl font-bold text-sos-600 dark:text-sos-400">{simulationResult.alturaFinal} cm</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Saúde da Muda</p>
            <p className="text-2xl font-bold text-sos-600 dark:text-sos-400">{simulationResult.saudeFinal}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectImpactSimulator;