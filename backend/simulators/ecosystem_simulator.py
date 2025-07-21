import json

class EcosystemSimulator:
    """
    Simula o crescimento de um ecossistema de árvores e calcula seu impacto ambiental ao longo do tempo.
    """

    def __init__(self, species_name: str, num_trees: int):
        """
        Inicializa o simulador de ecossistema.

        Args:
            species_name (str): O nome da espécie da árvore.
            num_trees (int): O número de árvores a serem simuladas.
        """
        self.species_name = species_name
        self.num_trees = num_trees
        
        # Parâmetros baseados na espécie. Em uma versão futura, isso pode vir de um banco de dados.
        # As fórmulas de impacto são simplificações lineares para fins de projeção inicial.
        self.params = {
            "Ipê Amarelo": {
                "growth_rate_m_per_year": 0.8,
                "max_height_m": 15.0,
                # Estimativa base: uma árvore madura (~15m) sequestra ~82.5kg de CO2/ano.
                "co2_sequestration_factor_kg_per_m_height_per_year": 5.5,
                # Estimativa base: uma árvore madura produz ~60kg de O2/ano.
                "o2_production_factor_kg_per_m_height_per_year": 4.0,
                # Fator para calcular o diâmetro da copa com base na altura.
                "crown_diameter_factor": 0.4 
            }
        }.get(species_name, { # Valores padrão para espécies não catalogadas
            "growth_rate_m_per_year": 0.5,
            "max_height_m": 20.0,
            "co2_sequestration_factor_kg_per_m_height_per_year": 5.0,
            "o2_production_factor_kg_per_m_height_per_year": 3.6,
            "crown_diameter_factor": 0.3
        })
        
        # Estado inicial das árvores
        self.trees = [{'age': 0, 'height_m': 0.2, 'total_co2_sequestered_kg': 0.0} for _ in range(num_trees)]

    def _calculate_cumulative_impact(self):
        """Calcula o impacto cumulativo total do ecossistema para o estado atual."""
        total_height_m = sum(tree['height_m'] for tree in self.trees)
        total_co2_sequestered_kg = sum(tree['total_co2_sequestered_kg'] for tree in self.trees)
        
        # O oxigênio é produzido anualmente, então calculamos a produção do último ano.
        yearly_o2_production_kg = sum(
            (tree['height_m'] * self.params["o2_production_factor_kg_per_m_height_per_year"])
            for tree in self.trees
        )

        # A área de sombra é baseada na altura média atual.
        avg_height_m = total_height_m / self.num_trees if self.num_trees > 0 else 0
        avg_crown_diameter_m = avg_height_m * self.params["crown_diameter_factor"]
        avg_shade_area_m2 = 3.14159 * ((avg_crown_diameter_m / 2) ** 2)
        total_shade_area_m2 = avg_shade_area_m2 * self.num_trees
        
        return {
            "carbon_sequestered_tonnes": round(total_co2_sequestered_kg / 1000, 4),
            "oxygen_produced_tonnes_per_year": round(yearly_o2_production_kg / 1000, 4),
            "total_shade_area_m2": round(total_shade_area_m2, 2)
        }

    def run_simulation(self, years_to_report: list[int]):
        """
        Executa a simulação por um número máximo de anos e retorna um relatório para os anos especificados.
        
        Args:
            years_to_report (list[int]): Uma lista de anos para os quais gerar um relatório.
        
        Returns:
            dict: Um dicionário com os relatórios para cada ano especificado.
        """
        if not years_to_report:
            return {}
            
        max_year = max(years_to_report)
        simulation_report = {}
        
        for year in range(1, max_year + 1):
            for tree in self.trees:
                if tree['height_m'] < self.params["max_height_m"]:
                    growth = self.params["growth_rate_m_per_year"]
                    tree['height_m'] += growth
                    tree['height_m'] = min(tree['height_m'], self.params["max_height_m"])
                
                yearly_co2_sequestration = tree['height_m'] * self.params["co2_sequestration_factor_kg_per_m_height_per_year"]
                tree['total_co2_sequestered_kg'] += yearly_co2_sequestration
                tree['age'] += 1
            
            if year in years_to_report:
                avg_age = sum(tree['age'] for tree in self.trees) / self.num_trees if self.num_trees > 0 else 0
                avg_height = sum(tree['height_m'] for tree in self.trees) / self.num_trees if self.num_trees > 0 else 0

                yearly_data = {
                    "year": year,
                    "project_summary": { "species": self.species_name, "tree_count": self.num_trees, "average_age_years": round(avg_age, 2), "average_height_m": round(avg_height, 2) },
                    "cumulative_impact": self._calculate_cumulative_impact()
                }
                simulation_report[f"year_{year}"] = yearly_data
                
        return simulation_report