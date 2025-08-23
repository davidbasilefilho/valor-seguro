import {
	Activity,
	BarChart,
	Target,
	TrendingDown,
	TrendingUp,
} from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { cn } from "@/lib/utils";

export default function Home() {
	const features = [
		{
			name: "Controle de Despesas",
			description: "Registre e categorize suas despesas facilmente.",
			href: "/about",
			cta: "Saiba Mais",
			className: "col-span-3 lg:col-span-1",
			background: (
				<div className="absolute -top-12 left-0 w-full h-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 opacity-20 blur-2xl" />
			),
		},
		{
			name: "Visualização de Ganhos",
			description: "Acompanhe seus ganhos e fontes de renda.",
			href: "/about",
			cta: "Saiba Mais",
			className: "col-span-3 lg:col-span-1",
			background: (
				<div className="absolute -top-12 left-0 w-full h-full bg-gradient-to-br from-green-500 via-teal-500 to-cyan-500 opacity-20 blur-2xl" />
			),
		},
		{
			name: "Orçamentos Inteligentes",
			description: "Crie orçamentos para diferentes categorias e metas.",
			href: "/about",
			cta: "Saiba Mais",
			className: "col-span-3 lg:col-span-1",
			background: (
				<div className="absolute -top-12 left-0 w-full h-full bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 opacity-20 blur-2xl" />
			),
		},
		{
			name: "Relatórios Gráficos",
			description: "Visualize seus dados financeiros com gráficos interativos.",
			href: "/about",
			cta: "Saiba Mais",
			className: "col-span-3 lg:col-span-3",
			background: (
				<div className="absolute -top-12 left-0 w-full h-full bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 opacity-20 blur-2xl" />
			),
		},
	];

	const cardBackground = (
		<div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-75 blur-lg transition-all duration-500 group-hover:opacity-100 group-hover:blur-md" />
	);

	const commonCardClassName =
		"bg-card border border-border rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group";

	return (
		<div className="flex flex-col h-full">
			{/* Blurry gradient background blobs (Home only) - top-focused, uniform spacing */}
			<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
				{/* center-top blob (smaller and less opaque on small screens) */}
				<div className="absolute left-1/2 -top-36 translate-x-[-50%] w-[28rem] h-[28rem] sm:w-[36rem] sm:h-[36rem] md:w-[44rem] md:h-[44rem] lg:w-[56rem] lg:h-[56rem] rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 opacity-6 sm:opacity-10 md:opacity-12 dark:opacity-6 blur-[80px] sm:blur-[120px] md:blur-[160px] lg:blur-[200px] dark:blur-[800px] transform-gpu" />
				{/* left-top blob (smaller and less opaque on small screens) */}
				<div className="absolute -left-16 -top-28 w-[22rem] h-[22rem] sm:w-[32rem] sm:h-[32rem] md:w-[40rem] md:h-[40rem] lg:w-[48rem] lg:h-[48rem] rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 opacity-6 sm:opacity-10 md:opacity-12 dark:opacity-6 blur-[80px] sm:blur-[120px] md:blur-[160px] lg:blur-[200px] dark:blur-[800px] transform-gpu rotate-12" />
				{/* right-top blob (smaller and less opaque on small screens) */}
				<div className="absolute -right-16 -top-24 w-[20rem] h-[20rem] sm:w-[30rem] sm:h-[30rem] md:w-[36rem] md:h-[36rem] lg:w-[44rem] lg:h-[44rem] rounded-full bg-gradient-to-tr from-cyan-400 via-teal-500 to-green-600 opacity-6 sm:opacity-10 md:opacity-12 dark:opacity-6 blur-[80px] sm:blur-[120px] md:blur-[160px] lg:blur-[200px] dark:blur-[800px] transform-gpu -rotate-6" />
			</div>
			<main className="relative flex-1 flex flex-col items-center justify-center p-4 md:p-4 pt-4 sm:pt-6 md:pt-8 lg:pt-10">
				<div className="z-10 items-center justify-center">
					<AnimatedGradientText
						className="text-4xl md:text-6xl font-bold leading-7 text-center"
						colorFrom="var(--color-foreground)"
						colorTo="var(--color-primary)"
					>
						Tome controle da sua vida
					</AnimatedGradientText>
				</div>

				<p className="text-lg md:text-xl text-left md:text-center mt-4 md:mt-6 lg:mt-8 mb-8 md:mb-12 lg:mb-16 max-w-2xl text-muted-foreground">
					Gerencie suas finanças pessoais de forma inteligente e visual com o
					Valor Seguro. Acompanhe despesas, ganhos e orçamentos com tabelas
					detalhadas e mantenha o controle total do seu dinheiro.
				</p>

				<BentoGrid className="max-w-5xl mx-auto w-full">
					{features.map((feature, idx) => (
						<BentoCard
							key={feature.name}
							name={feature.name}
							description={feature.description}
							href={feature.href}
							cta={feature.cta}
							background={cardBackground}
							className={cn(feature.className, commonCardClassName)}
							Icon={() => {
								if (idx === 0)
									return <TrendingDown className="h-6 w-6 text-primary" />;
								if (idx === 1)
									return <TrendingUp className="h-6 w-6 text-primary" />;
								if (idx === 2)
									return <Target className="h-6 w-6 text-primary" />;
								if (idx === 3)
									return <BarChart className="h-6 w-6 text-primary" />;
								return <Activity className="h-6 w-6 text-primary" />;
							}}
						/>
					))}
				</BentoGrid>
			</main>
		</div>
	);
}
