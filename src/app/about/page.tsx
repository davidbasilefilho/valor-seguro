import { BarChart, Target, TrendingDown } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

export default function About() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold text-left md:text-left mb-8 text-primary">
				Sobre o Valor Seguro
			</h1>

			<section className="mb-10">
				<h2 className="text-2xl font-semibold mb-4 text-accent-foreground text-left">
					Assuma o Controle de Suas Finanças
				</h2>
				<p className="text-lg text-muted-foreground leading-relaxed">
					O Valor Seguro é uma ferramenta de gestão financeira pessoal projetada
					para capacitá-lo a entender e gerenciar seu dinheiro de forma eficaz.
					Nós acreditamos que com as ferramentas certas, qualquer pessoa pode
					alcançar seus objetivos financeiros. Nossa plataforma oferece uma
					maneira clara e simples de acompanhar sua saúde financeira, para que
					você possa tomar decisões informadas e construir um futuro financeiro
					seguro.
				</p>
			</section>

			<section className="mb-10">
				<h2 className="text-2xl font-semibold mb-4 text-accent-foreground text-left">
					Como o Valor Seguro Ajuda Você
				</h2>
				<BentoGrid className="gap-8">
					<BentoCard
						name="Registre Despesas e Ganhos"
						description="Registre facilmente todas as suas transações, sejam despesas diárias ou receitas. Mantenha um histórico detalhado de onde seu dinheiro vem e para onde vai."
						background={<div className="absolute inset-0" />}
						className="col-span-3 lg:col-span-1 bg-card border-border"
						Icon={TrendingDown}
					/>

					<BentoCard
						name="Acompanhe Seus Orçamentos"
						description="Configure orçamentos personalizados para diferentes categorias de gastos. O Valor Seguro ajuda você a monitorar seus gastos em relação a esses orçamentos."
						background={<div className="absolute inset-0" />}
						className="col-span-3 lg:col-span-1 bg-card border-border"
						Icon={Target}
					/>

					<BentoCard
						name="Monitore Sua Situação Financeira"
						description="Obtenha uma visão abrangente de sua saúde financeira com gráficos e relatórios intuitivos. Entenda seu patrimônio líquido e fluxo de caixa."
						background={<div className="absolute inset-0" />}
						className="col-span-3 lg:col-span-1 bg-card border-border"
						Icon={BarChart}
					/>
				</BentoGrid>
			</section>

			<section className="mt-auto">
				<h2 className="text-2xl font-semibold mb-4 text-accent-foreground">
					Comece Sua Jornada para a Clareza Financeira Hoje!
				</h2>
				<p className="text-lg text-muted-foreground">
					Junte-se ao Valor Seguro e dê o primeiro passo em direção a uma vida
					financeira mais organizada e segura.
				</p>
			</section>
		</div>
	);
}
